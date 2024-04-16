from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.route import decoder_route

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(decoder_route.router)

@app.get("/")
def index():
    return "OK"