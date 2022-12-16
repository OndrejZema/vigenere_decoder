from utils.vigener import Kasiski, Friedman, Vigener, convert_language
import re

def decode_service(cryptogram, language, keyLength):
    if not type(keyLength) == int:
        return "Zadaný klíč není celé číslo", 400

    if not keyLength > 0:
        return "Zadaný klíč je menší nebo roven nule", 400
    cryptogram = cryptogram.upper()
    if not re.fullmatch("[A-Z]+", cryptogram):
        return "Zadaný kryptogram obsahuje zakázané znaky, povolené jsou jen velká a malá písmena", 400
    converted_language = None
    try:
        converted_language = convert_language(language)
    except Exception as e:
        return "Jakyková frenkvenční analýza není ve správném formátu", 400
    vigener = Vigener(keyLength)

    vigener.load_cryptogram(cryptogram)
    vigener.load_language(converted_language)
    vigener.analyze_cryptogram()
    key = vigener.key
    msg = vigener.decode(key)
    return {"key": key, "msg": msg}

def keys_length_service(cryptogram, language):

    cryptogram = cryptogram.upper()
    if not re.fullmatch("[A-Z]+", cryptogram):
        return "Zadaný kryptogram obsahuje zakázané znaky, povolené jsou jen velká a malá písmena", 400
    converted_language = None
    try:
        converted_language = convert_language(language)
    except:
        return "Jakyková frenkvenční analýza není ve správném formátu", 400


    kasiski = Kasiski()
    kasiski.load_cryptogram(cryptogram)
    kasiski.calculate_key_length()

    friedman = Friedman()
    friedman.load_cryptogram(cryptogram)
    friedman.load_language(converted_language)
    friedman.calculate_key_length()
    return {"keysLength":[{"name": "kasiski", "value": kasiski.key_length},{"name": "friedman", "value": friedman.key_length}]}
