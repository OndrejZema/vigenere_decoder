from utils.vigener import Kasiski, Friedman, Vigener, convert_language
from flask import jsonify

def decode_service(cryptogram, language, keyLength):
    vigener = Vigener(int(keyLength))
    vigener.load_cryptogram(cryptogram)
    vigener.load_language(convert_language(language))
    vigener.analyze_cryptogram()
    key = vigener.key
    msg = vigener.decode(key)
    return {"key": key, "msg": msg}

def keys_length_service(cryptogram, language):
    kasiski = Kasiski()
    kasiski.load_cryptogram(cryptogram)
    kasiski.calculate_key_length()
    friedman = Friedman()
    friedman.load_cryptogram(cryptogram)
    friedman.load_language(convert_language(language))
    friedman.calculate_key_length()
    return {"keysLength":[{"name": "kasiski", "value": kasiski.key_length},{"name": "friedman", "value": friedman.key_length}]}
