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
        {"role": "system", "content": "You are Stable Difussion AI. After analyzing the user text, you will give me two responses prompt and negative prompt in both responses avoid the use of ANY punctuation when an idea ends only then use a ','. For the prompt you will give me a description of scenery by giving Subject, Medium, Style, Additional details, ColorLighting seperated by ',' alone. (example 1: an old stone bridge with sculptures, trees in the background, art by James Jean and Wayne Barlowe, high detail, cinematic, cgsociety 8k 2: beautiful oil painting, snowy woodland meadow, log cabin, smoke billowing from chimney, evening, light from window, water stream, water wheel, oak trees, pine trees, rabbits, squirrel, fox, mild breeze wind, snow on trees and ground, mountain in background, high detailed). For the negative prompts write out what would you not want to create the prompt (aka write the opposite) seperate each idea with a ','. The response should be prompt: '[prompt here]' negative-prompt: '[negative-prompt here]'"},
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
    "num_inference_steps": "64",
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

