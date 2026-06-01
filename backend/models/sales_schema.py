# models/sales_schemas.py
from pydantic import BaseModel, Field, ConfigDict
from typing import List

class AnalyzeRequest(BaseModel):
    cloudinary_url:str
    file_name:str

class CallMetrics(BaseModel):
    talkRatioRep: int = Field(description="Rep speech percentage (0-100).")
    talkRatioProspect: int = Field(description="Prospect speech percentage (0-100).")
    dealHealthScore: int = Field(description="Overall deal evaluation metric (0-100).", ge=0, le=100)

class CallInsights(BaseModel):
    objectionMoments: List[str] = Field(description="Objections raised by the customer.")
    competitorMentions: List[str] = Field(description="Competing platforms mentioned.")
    buyingSignals: List[str] = Field(description="Buying indicators or pricing queries.")
    coachingAdvice: str = Field(description="Coaching tips for the representative.")

class SalesCallOutputSchema(BaseModel):
    id: str = Field(description="Unique string matching the incoming call_id.")
    file_name: str=Field(alias="fileName")
    timestamp: str = Field(description="ISO 8601 generation timestamp.")
    metrics: CallMetrics
    insights: CallInsights

model_config=ConfigDict(populate_by_name=True)