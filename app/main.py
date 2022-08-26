import datetime
from dateutil.relativedelta import relativedelta
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routers import currency

# Updating data to the web page, jsx file can access then

app = FastAPI()
app.include_router(currency.router)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

today = datetime.datetime.now()
today_data = f"{today.year}-{today.strftime('%m')}-{today.strftime('%d')}"
past = today + relativedelta(months=-3)
past_data = f"{past.year}-{past.strftime('%m')}-{past.strftime('%d')}"

c = currency.CurrencyFinder("CAD", past_data, today_data)
countries = c.find_countries()
countries_data = {"Countries":countries}

@app.get("/")
@staticmethod
def countries_dic():
    return countries_data