from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import json

from models.sales_schema import SalesCallOutputSchema

load_dotenv()

client=genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)
SYSTEM_INSTRUCTION="""You are an expert sales performance coach. Extract precise interaction metrics and behavioral 
insights from the provided audio call recording. Be highly objective and populate the requested schema completely."""


def process_audio_analysis(call_id:str, cloudinary_url:str)->dict:
    """Hands off the audio tracking file to Gemini 3.5 Flash 
    and returns a validated matching python dictionary payload."""

    prompt=f"""
    Analyze the provided audio call recording. 
    Map your analysis directly to the requested schema layout.
    Use '{call_id}' for the 'id' field and '{cloudinary_url}' for the 'cloudinaryUrl' field.
    """

    response=client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            types.Part.from_uri(file_uri=cloudinary_url,mime_type="audio/mpeg"),
            prompt
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=SalesCallOutputSchema,
            system_instruction=SYSTEM_INSTRUCTION,
            temperature=0.1,
        )
    )
    if not response.text:
        raise ValueError("Gemini failed to return an analysis payload.")
    
    return json.loads(response.text)