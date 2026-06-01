from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import json

from datetime import datetime
from database import get_db
from models.call import CallAnalysis
from services.gemini_services import process_audio_analysis
from models.sales_schema import SalesCallOutputSchema, AnalyzeRequest

router=APIRouter(prefix="/analytics",tags=["Sales Intelligence"])

@router.post("/analyze",response_model=SalesCallOutputSchema)
def analyse_call_endpoint(request: AnalyzeRequest,db: Session=Depends(get_db)):
    """
    Accepts any raw audio tracking URL string directly, hands it off to 
    Gemini 3.5 Flash for processing, and commits the output back to MySQL.
    """
    try:
        import uuid
        call_id=f"call_{uuid.uuid4().hex[:6]}"
        analysis_data=process_audio_analysis(call_id=call_id, cloudinary_url=request.cloudinary_url)

        analysis_data["file_name"]=request.file_name
        analysis_data["timestamp"]=datetime.now().isoformat()+"Z"
        new_record=CallAnalysis(
            file_name=request.file_name,
            cloudinary_url=request.cloudinary_url,
            analysis_result=json.dumps(analysis_data)
        )
        db.add(new_record)
        db.flush()

        analysis_data["id"]=f"call_{new_record.id}"
        new_record.analysis_result=json.dumps(analysis_data)
        return analysis_data
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Analysis Failure: {str(e)}")
    

@router.get("/calls",response_model=list[SalesCallOutputSchema])
def get_all_calls(db: Session=Depends(get_db)):
    """
    Fetches all historical logs from the database and returns a raw un-wrapped array.
    """
    records=db.query(CallAnalysis).order_by(CallAnalysis.id.desc()).all()

    response_list=[]
    for record in records:
        #Decode the database JSON string back to Python dictionary
        call_data=json.loads(record.analysis_result)
        response_list.append(call_data)
    
    return response_list


@router.get("/calls/{call_id}",response_model=SalesCallOutputSchema)
def get_single_call(call_id: str,db:Session=Depends(get_db)):
    """
    Fetches a specific call tracking instance using its unique parsed ID string string.
    """
    try:
        internal_id=int(call_id.replace("call_",""))
    except ValueError:
        raise HTTPException(status_code=400,detail="Invalid Call ID structure format.")
    
    record=db.query(CallAnalysis).filter(CallAnalysis.id==internal_id).first()
    if not record:
        raise HTTPException(status_code=404,detail="Call analysis log record not found.")
    
    return json.loads(record.analysis_result)