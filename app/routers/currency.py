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
        if change_pct >= 19:
          # Get basic country`s info
          print(n)
          url = f"https://restcountries.com/v2/currency/{n}" 
          r = requests.get(url)
          if r.status_code == 404:
            pass
          else:
            currency_places = r.json()

            # if len(currency_places) > 1:
            print(currency_places)
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
                print(country_data[place])
                capital = country_info["capital"] = country_data[place]["capital"]
                country_info["region"] = country_data[place]["subregion"]

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

                #get cost of living
                url ="https://cost-of-living-and-prices.p.rapidapi.com/prices"
                querystring = {"city_name":capital,"country_name":country}

                headers = {
                  "X-RapidAPI-Key": "996ae8ab49msh8c991b4e71c0891p14d285jsn295dad829477",
                  "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com"
                }
                r_4 = requests.request("GET", url, headers=headers, params=querystring)
                cost_of_living = r_4.json()
                print(cost_of_living)
                if r_4.status_code == 404 or r_4.status_code == 403:
                  country_info["coke_price"] = "Date not available..."
                  country_info["beer_price"] = "Date not available..."
                else:
                  if cost_of_living =={"error":"Couldn't find a city with a given name or id"} or cost_of_living=={'message': 'You have exceeded the rate limit per hour for your plan, BASIC, by the API provider'}:
                    country_info["coke_price"] = "Date not available..."
                    country_info["beer_price"] = "Date not available..."
                  else:
                    print(cost_of_living["prices"][32])
                    coke_price = cost_of_living["prices"][32]["usd"]["avg"]
                    beer_price = cost_of_living["prices"][33]["usd"]["avg"]
                    country_info["coke_price"] = f"{coke_price}$"
                    country_info["beer_price"] = f"{beer_price}$"
                
                countries_info.append(country_info)
        else:
          pass

      return [{'country': 'Ghana', 'alpha2Code': 'GH', 'currency': 'GHS', 'currecy_rate': 7.516203, 'capital': 'Accra', 'region': 'Western Africa', 'picture': 'https://images.unsplash.com/photo-1508861736614-6800103b49b9?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYxMDIyMzYz&ixlib=rb-1.2.1', 'safe_level': {'score': 3.4, 'sources_active': 5, 'message': 'Ghana has a current risk level of 3.4 (out of 5). We advise: Use some caution when travelling Ghana.', 'updated': '2022-08-20 08:22:40', 'source': 'https://www.travel-advisory.info/ghana'}, 'coke_price': '1.46$', 'beer_price': '5.84$'}, {'country': 'Malawi', 'alpha2Code': 'MW', 'currency': 'MWK', 'currecy_rate': 791.272281, 'capital': 'Lilongwe', 'region': 'Eastern Africa', 'picture': 'https://images.unsplash.com/photo-1622781129124-dcbab501cbe9?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYxMDIyMzY0&ixlib=rb-1.2.1', 'safe_level': {'score': 3, 'sources_active': 5, 'message': 'Malawi has a current risk level of 3 (out of 5). We advise: Use some caution when travelling Malawi.', 'updated': '2022-08-20 08:22:40', 'source': 'https://www.travel-advisory.info/malawi'}, 'coke_price': '30.90$', 'beer_price': '4.63$'}, {'country': 'Sudan', 'alpha2Code': 'SD', 'currency': 'SDG', 'currecy_rate': 438.332494, 'capital': 'Khartoum', 'region': 'Northern Africa', 'picture': 'https://images.unsplash.com/photo-1591801058986-9e28e68670f7?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYxMDIyMzY1&ixlib=rb-1.2.1', 'safe_level': {'score': 4.3, 'sources_active': 8, 'message': 'Sudan has a current risk level of 4.3 (out of 5). We advise: Please reconsider your need to travel to Sudan.', 'updated': '2022-08-20 08:22:40', 'source': 'https://www.travel-advisory.info/sudan'}, 'coke_price': '96.90$', 'beer_price': '1.33$'}, {'country': 'Ukraine', 'alpha2Code': 'UA', 'currency': 'UAH', 'currecy_rate': 28.318934, 'capital': 'Kyiv', 'region': 'Eastern Europe', 'picture': 'https://images.unsplash.com/photo-1606237627723-1a30caff1c9e?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYxMDIyMzY2&ixlib=rb-1.2.1', 'safe_level': {'score': 4.7, 'sources_active': 9, 'message': 'Ukraine has a current risk level of 4.7 (out of 5). We advise: It is not safe to travel Ukraine.', 'updated': '2022-08-20 08:22:40', 'source': 'https://www.travel-advisory.info/ukraine'}, 'coke_price': '1.45$', 'beer_price': '3.55$'}]
      

c = CurrencyFinder("JPY", "2022-05-13", "2022-08-15")
c.find_countries()