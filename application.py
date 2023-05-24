from flask import Flask, render_template, request, jsonify
from api import get_main_text, text_to_SD
import re

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/generate-image', methods=['POST'])
def generate_image():
    prompt = request.json['prompt']
    # Call the functions from api.py to generate the image
    main_text = get_main_text(prompt)
    main_text = main_text.lower()
    list_text = re.split('(negative-prompt)', main_text)
    print(list_text[0][6:])
    #image = text_to_SD(main_text)

    # Return the image URL as a response
    #response = {'image_url': image}
    return #jsonify(response)

if __name__ == '__main__':
    app.run()