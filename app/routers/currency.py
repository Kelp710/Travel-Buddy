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
        "apikey": "YW9YYuJleCkcnDXY4hLUGspYSZI3HZ9J"
      }
      unsplash_key = "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"

      response = requests.request("GET", url, headers=headers, data = payload)

      status_code = response.status_code
      result = response.json()
      for n in result["rates"]:
        change_pct = result["rates"][n]["change_pct"]
        current_price = result["rates"][n]["end_rate"]
        if change_pct >= 14:
          # Get basic country`s info
          print(n)
          url = f"https://restcountries.com/v2/currency/{n}" 
          r = requests.get(url)
          if r.status_code == 404:
            pass
          else:
            currency_places = r.json()

            if len(currency_places) > 1:
              print(currency_places)
              for place in currency_places:
                  country_info = {}
                  country_data = place

                  country = country_data["name"]
                  country_info["country"]=country
                  country_info["alpha2Code"] = country_data['alpha2Code']
                  country_info["currency"]=n
                  country_info["currecy_rate"] = current_price
                  capital, country_info["capital"] = country_data["capital"]
                  country_info["region"] = country_data["subregion"]
                  
                  # Get picture url of the country
                  url = f"https://api.unsplash.com/photos/random/?client_id={unsplash_key}&query={country}&per_page=4&order_by=popular&orientation=landscape&count=1&content_filter=high"
                  r_2 = requests.get(url) 
                  pic_data = r_2.json()[0]["urls"]["raw"]
                  country_info["picture"]=pic_data

                  # get safe level by country code
                  country_code = country_data['alpha2Code']
                  url_safe = f"https://www.travel-advisory.info/api?countrycode={country_code}"
                  r_3 = requests.get(url_safe)
                  safe_data = r_3.json()['data'][country_code]['advisory']

                  country_info["safe_level"]=safe_data

                  # #get cost of living
                  # url = "https://cities-cost-of-living1.p.rapidapi.com/get_cities_details_by_name"

                  # payload = f"cities=%5B%7B%22name%22%3A%22{capital}%22%2C%22{country}%22%3A%22Japan%22%7D%5D&currencies=%5B%22USD%22%5D"
                  # headers = {
                  #   "content-type": "application/x-www-form-urlencoded",
                  #   "X-RapidAPI-Key": "03bc48fe04mshafeb94884761a7dp135680jsn66224dffa769",
                  #   "X-RapidAPI-Host": "cities-cost-of-living1.p.rapidapi.com"
                  # }
                  # r_4 = requests.request("POST", url, data=payload, headers=headers)
                  # cost_of_living = r_4.json()

                  # if r_4.status_code == 404 or r_4.status_code == 403:
                  #   country_info["coke_price"] = "Date not available..."
                  #   country_info["beer_price"] = "Date not available..."
                  # else:
                  #   country_info["coke_price"] = cost_of_living["data"]["cost_of_living_details"][7]["value"]
                  #   country_info["beer_price"] = cost_of_living["data"]["cost_of_living_details"][4]["value"]


                  countries_info.append(country_info)
            elif len(currency_places) == 1:
                  country_info = {}
                  country_data = currency_places
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

                  # url = "https://cities-cost-of-living1.p.rapidapi.com/get_cities_details_by_name"

                  # payload = f"cities=%5B%7B%22name%22%3A%22{capital}%22%2C%22{country}%22%3A%22Japan%22%7D%5D&currencies=%5B%22USD%22%5D"
                  # headers = {
                  #   "content-type": "application/x-www-form-urlencoded",
                  #   "X-RapidAPI-Key": "03bc48fe04mshafeb94884761a7dp135680jsn66224dffa769",
                  #   "X-RapidAPI-Host": "cities-cost-of-living1.p.rapidapi.com"
                  # }
                  # r_4 = requests.request("POST", url, data=payload, headers=headers)
                  # cost_of_living = r_4.json()

                  # if r_4.status_code == 404 or r_4.status_code == 403:
                  #   country_info["coke_price"] = "Date not available..."
                  #   country_info["beer_price"] = "Date not available..."
                  # else:
                  #   country_info["coke_price"] = cost_of_living["data"]["cost_of_living_details"][7]["value"]
                  #   country_info["beer_price"] = cost_of_living["data"]["cost_of_living_details"][4]["value"]

                  countries_info.append(country_info)
            
        else:
          pass
        
      return countries_info
      

c = CurrencyFinder("JPY", "2022-05-13", "2022-08-15")
c.find_countries()