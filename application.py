from flask import Flask, render_template, request, jsonify
from api import get_main_text, text_to_SD

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/generate-image', methods=['POST'])
def generate_image():
    return jsonify({'image_url': text_to_SD(get_main_text(request.json['prompt']))})

if __name__ == '__main__':
    app.run()