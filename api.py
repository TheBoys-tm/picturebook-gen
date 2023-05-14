import openai
import os
from dotenv import load_dotenv

load_dotenv(".env")

openai.api_key = os.environ["GPT4_API_KEY"]
openai.organization = os.environ["GPT4_ORG_ID"]

def make_query(query: str):
    """
    Description:
        Make query to OpenAI GPT4
    Args:
        query (str): Query to be made to GPT4
    Returns:
        str: Response from GPT4
    """
    reso = openai.Completion.create(
        engine="davinci",
        prompt=query,
        temperature=0.9,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["\n", "Human:", "AI:"]
    )
    print(reso.choices[0])
    return reso.choices[0].text

