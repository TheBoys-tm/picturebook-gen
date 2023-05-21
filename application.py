from api import get_main_text, text_to_SD

filename = 'test/text.txt'
def read_file_as_string(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        data = file.read()
    return data

prompt = get_main_text(read_file_as_string(filename))
print(prompt)
image_link = text_to_SD(prompt)
print(image_link)