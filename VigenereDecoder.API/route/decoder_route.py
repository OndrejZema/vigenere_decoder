from flask import Blueprint, request
from service.decoder_service import friedman_service, kasiski_service, decode_service

decoder_api = Blueprint('decoder_api', __name__)

@decoder_api.route("/api/decode", methods=["GET"])
def decode_route():
    print(request.json)
    return decode_service()

@decoder_api.route("/api/kasiski", methods=["POST"])
def kasiski_route():
    return kasiski_service()

@decoder_api.route("/api/friedman", methods=["POST"])
def friedman_route():
    return friedman_service()