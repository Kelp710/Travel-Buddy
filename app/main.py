from datetime import datetime
from dateutil.relativedelta import relativedelta
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routers import currency

# Updating data to the web page, jsx file can access then

app = FastAPI()
app.include_router(currency.router)

origins = [
    "http://10.10.1.10:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

today = datetime.datetime.now()
today_data = f"{today.year}-{today.month}-{today.day}"
past = today + relativedelta(months=-3)
past_data = f"{past.year}-{past.month}-{past.day}"

c = currency.CurrencyFinder("CAD", past, today_data)
countries = c.find_countries()
countries_data = {"About":countries}

@app.get("/")
@staticmethod
def Hello():
    return countries_data