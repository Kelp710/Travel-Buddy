from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from datetime import date
from fastapi import APIRouter, HTTPException
import datetime
import os
from dotenv import load_dotenv
load_dotenv()


router = APIRouter(
    prefix="/countries",
    tags=["countries"],
    responses={404: {"description": "Not found"}},
)


app = FastAPI()

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


class CurrencyFinder:
    def __init__(self, base, start_date, end_date) -> None:
      self.base = base
      self.start_date = start_date
      self.end_date = end_date

    def find_countries(self):
      url = f"https://api.apilayer.com/exchangerates_data/fluctuation?start_date={self.start_date}&end_date={self.end_date}&base={self.base}"
      countries_info = []
      payload = {}
      headers= {
        "apikey": os.environ['Country_Api']
      }
      unsplash_key = os.environ['Unsplash_Key']

      response = requests.request("GET", url, headers=headers, data = payload)

      status_code = response.status_code
      result = response.json()
      for n in result["rates"]:
        change_pct = result["rates"][n]["change_pct"]
        current_price = result["rates"][n]["end_rate"]
        if change_pct >= 13 and n != "BTC":
          # Get basic country`s info
          url = f"https://restcountries.com/v2/currency/{n}" 
          r = requests.get(url)
          if r.status_code == 404:
            pass
          else:
            currency_places = r.json()

            # if len(currency_places) > 1:
            for place in range(len(currency_places)):
                country_info = {}
                country_data = currency_places

                country = country_data[place]["name"]
                if country == "Lao People's Democratic Republic":
                  country = "Laos"
                  country_info["country"]=country
                else:
                  country_info["country"]=country
                country_info["alpha2Code"] = country_data[place]['alpha2Code']
                country_info["currency"]=n
                country_info["currecy_rate"] = current_price
                capital = country_info["capital"] = country_data[place]["capital"]
                country_info["region"] = country_data[place]["subregion"]
                country_info["change_rate"] =round(result["rates"][n]["change_pct"],1)

                # Get picture url of the country
                url = f"https://api.unsplash.com/photos/random/?client_id={unsplash_key}&query={country}&per_page=4&order_by=popular&orientation=landscape&count=1&content_filter=high"
                r_2 = requests.get(url) 
                pic_data = r_2.json()[0]["urls"]["raw"]
                country_info["picture"]=pic_data

                # get safe level by country code
                country_code = country_data[place]['alpha2Code']
                url_safe = f"https://www.travel-advisory.info/api?countrycode={country_code}"
                r_3 = requests.get(url_safe)
                safe_data = r_3.json()['data'][country_code]['advisory']

                country_info["safe_level"]=safe_data

                
                countries_info.append(country_info)
        else:
          pass
      print(countries_info)
      return countries_info
      