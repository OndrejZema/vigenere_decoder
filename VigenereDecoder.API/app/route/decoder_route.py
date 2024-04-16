from fastapi import APIRouter, Request
from app.service.decoder_service import keys_length_service, decode_service

router = APIRouter()

@router.post("/api/decode")
async def decode_route(request: Request):
    data = await request.json()
    if not("cryptogram" in data.keys() and "keyLength" in data.keys() and "language" in data.keys()):
        return "Chybí kryptogram, jazyková analýza nebo délka klíče", 400
    return decode_service(data["cryptogram"], data["language"], data["keyLength"])

@router.post("/api/key/length")
async def keys_length_route(request: Request):
    print("endpoint vole")
    data = await request.json()
    if not ("cryptogram" in data.keys() and "language" in data.keys()):
        return "Chybí kryptogram nebo jazyková analýza", 400
    return keys_length_service(data["cryptogram"], data["language"])
