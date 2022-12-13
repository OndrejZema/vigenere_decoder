from flask import Blueprint, request, make_response
from service.decoder_service import keys_length_service, decode_service

decoder_api = Blueprint('decoder_api', __name__)

@decoder_api.route("/api/decode", methods=["POST"])
def decode_route():
    data = request.get_json(force=True)
    if not("cryptogram" in data.keys() and "keyLength" in data.keys() and "language" in data.keys()):
        print(data.keys())
        return "500", 500
    return decode_service(data["cryptogram"], data["language"], data["keyLength"])

@decoder_api.route("/api/key/length", methods=["POST"])
def keys_length_route():
    data = request.get_json(force=True)
    if not ("cryptogram" in data.keys() and "language" in data.keys()):
        return "500", 500 
    return keys_length_service(data["cryptogram"], data["language"])
