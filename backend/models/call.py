from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import DateTime, String
from datetime import datetime, timezone
from database import Base

class CallAnalysis(Base):
    """
    SQLAlchemy table model tracking recorded sales call evaluations.
    """
    __tablename__="calls"

    id=Column(Integer,primary_key=True,index=True,autoincrement=True)
    file_name=Column(String(255),nullable=False)
    cloudinary_url=Column(Text,nullable=False)
    analysis_result=Column(Text,nullable=False)

    created_at=Column(DateTime,default=lambda:datetime.now(timezone.utc))