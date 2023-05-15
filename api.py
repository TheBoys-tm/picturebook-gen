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
    response = openai.ChatCompletion.create( model="gpt-4", messages=[
        {"role": "system", "content": "You are a describer ai, you will take a whole page of text and take the most important part of it. Then in your own way describe the scene like you would a scene from a book, try to keep it to 1 sentence but you can go to 2 if needed."},
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
    "num_inference_steps": "20",
    "seed": None,
    "guidance_scale": 7.5,
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

    return response.json()['output'][0]