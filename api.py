import flask
import gpt4

@app.route('/', methods=['GET', 'POST'])
def main():
    if flask.request.method == 'GET':
        return(flask.render_template('index.html'))
    if flask.request.method == 'POST':
        query = flask.request.form['query']
        response = gpt4(query)
        return flask.render_template('index.html', query=query, response=response)
    
if __name__ == '__main__':
    app.run(debug=True)