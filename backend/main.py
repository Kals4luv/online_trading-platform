
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import httpx
import asyncio

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Crypto Trading Platform API is running"}

async def fetch_prices():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        return resp.json()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            prices = await fetch_prices()
            await websocket.send_json(prices)
            await asyncio.sleep(5)  # update every 5 seconds
    except Exception:
        await websocket.close()
