from flask import Flask, render_template, request, jsonify
from api import get_main_text, text_to_SD

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/generate-image', methods=['POST'])
def generate_image():
    prompt = request.json['prompt']

    main_text = get_main_text(prompt)
    print(main_text)
    image = text_to_SD(main_text)
    print('Done image')

    return jsonify({'image_url': image})

if __name__ == '__main__':
    app.run()