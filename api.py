import openai
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv(".env")

openai.api_key = os.environ["GPT4_API_KEY"]
openai.organization = os.environ["GPT4_ORG_ID"]

def get_main_text(query: str) -> str:
    """
    Description:
        Make query to OpenAI GPT4
    Args:
        query (str): Query to be made to GPT4
    Returns:
        str: Response from GPT4
    """
    response = openai.ChatCompletion.create( model="gpt-3.5-turbo", messages=[
        {"role": "system", "content": ""},
        {"role": "user", "content": query}
    ])
    return response['choices'][0]['message']['content']

def text_to_SD(text: str) -> str:
    url = "https://stablediffusionapi.com/api/v3/text2img"

    payload = json.dumps({
    "key": os.environ["SD_API_KEY"],
    "prompt": text,
    "negative_prompt": None,
    "width": "512",
    "height": "512",
    "samples": "1",
    "num_inference_steps": "32",
    "seed": None,
    "guidance_scale": 15,
    "safety_checker": "yes",
    "multi_lingual": "no",
    "panorama": "no",
    "self_attention": "no",
    "upscale": "no",
    "embeddings_model": "embeddings_model_id",
    "webhook": None,
    "track_id": None
    })

    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    if response.json()['output'][0]:
        return response.json()['output'][0]
    
    return 

