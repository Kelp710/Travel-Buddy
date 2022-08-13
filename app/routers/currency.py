from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from datetime import date
from fastapi import APIRouter, HTTPException
import datetime

router = APIRouter(
    prefix="/countries",
    tags=["countries"],
    responses={404: {"description": "Not found"}},
)


app = FastAPI()

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
        "apikey": "PyPZOB4LbjtqDiYMG6RmhWBKG76X5rH6"
      }
      unsplash_key = "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"

      response = requests.request("GET", url, headers=headers, data = payload)

      status_code = response.status_code
      result = response.json()

      for n in result["rates"]:
        country_info = {}
        change_pct = result["rates"][n]["change_pct"]
        current_price = result["rates"][n]["end_rate"]
        if change_pct >= 21:


          # Get basic country`s info
          url = f"https://restcountries.com/v2/currency/{n}"
          r = requests.get(url)
          if r.status_code == 404:
            pass
          else:
            country_data = r.json()
            country = country_data[0]["name"]
            country_info["country"]=country
            country_info["alpha2Code"] = country_data[0]['alpha2Code']
            country_info["currency"]=n
            country_info["currecy_rate"] = current_price
            country_info["capital"] = country_data[0]["capital"]
            country_info["region"] = country_data[0]["subregion"]
            
            # Get picture url of the country
            url = f"https://api.unsplash.com/photos/random/?client_id={unsplash_key}&query={country}&per_page=4&order_by=popular&orientation=landscape&count=1&content_filter=high"
            r_2 = requests.get(url) 
            pic_data = r_2.json()[0]["urls"]["raw"]
            country_info["picture"]=pic_data

            # get safe level by country code
            country_code = country_data[0]['alpha2Code']
            url_safe = f"https://www.travel-advisory.info/api?countrycode={country_code}"
            r_3 = requests.get(url_safe)
            safe_data = r_3.json()['data'][country_code]['advisory']

            country_info["safe_level"]=safe_data

            countries_info.append(country_info)
        else:
          pass
        
      return countries_info
      


@router.get("/")
@staticmethod
async def read_countries():
    return countries_data

# @router.get("/{country_id}")
# async def read_country(country_id: str):
#   countries_data = []
#   for country_info in countries_info:
#     if country_id not in country_info:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return {"name": countries_info["About"][country_id], "item_id": country_id}

# @router.put(
#     "/{country_id}",
#     tags=["custom"],
#     responses={403: {"description": "Operation forbidden"}},
# )
# async def update_item(country_id: str):
#     if country_id != "country":
#         raise HTTPException(
#             status_code=403, detail="You can only update the item: country"
#         )
#     return {"country_id": country_id, "name": "The cheap country"}

# # currency = CurrencyFinder("CAD", "2020-02-02", "2020-06-02")
