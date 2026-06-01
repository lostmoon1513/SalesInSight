from fastapi import FastAPI
from database import Base, engine
from models.call import CallAnalysis

from routes.analytics import router as analytics_router

Base.metadata.create_all(bind=engine)

app=FastAPI(title="SalesInSight api call analyser")

app.include_router(analytics_router)

@app.get("/")
def read_root():
    return {
        "message": "SalesInSight backend running"
    }
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app",host="0.0.0.0",port=8000,reload=True)
