from flask import Flask
from flask_cors import CORS
from route.decoder_route import decoder_api

def main():
    app = Flask(__name__)

    app.register_blueprint(decoder_api)
    CORS(app, expose_headers=["Content-Disposition"])
    app.run(host='0.0.0.0', port=5000)



if __name__ == "__main__":
    main()
