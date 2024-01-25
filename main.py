import pydantic
import flask


app = flask.Flask(__name__)

@app.route("/")
def index():
    return flask.render_template(
            "index.html", 
            title="Desktop",
            page_style="desktop.css",
            page_script="desktop.js"
    )

app.run(debug=True)