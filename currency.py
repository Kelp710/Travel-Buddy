from pytz import country_names
import requests
import os
from datetime import date

class CurrencyFinder:
    def __init__(self, base, start_date, end_date) -> None:
      self.base = base
      self.start_date = start_date
      self.end_date = end_date
    
    def find_countries(self):
      Currency_API_Key=os.getenv("Currency_API_Key")
      unsplash_key= os.getenv("UNSPLASH_KEY")
      url = f"https://api.apilayer.com/exchangerates_data/fluctuation?start_date={self.start_date}&end_date={self.end_date}&base={self.base}"
      countries_info = []
      payload = {}
      headers= {
        "apikey": Currency_API_Key
      }
      response = requests.request("GET", url, headers=headers, data = payload)

      status_code = response.status_code
      result = response.json()
      print(result)
      for n in result["rates"]:
        country_info = {}
        change_pct = result["rates"][n]["change_pct"]
        current_price = result["rates"][n]["end_rate"]
        if change_pct <= 12:

          # Get basic country`s info
          url = f"https://restcountries.com/v2/currency/{n}"
          r = requests.get(url)
          country_data = r.json()
          country = country_data[0]["name"]
          country_info["country"]=country
          country_info["currency"]=n
          country_info["currecy_rate"] = current_price
          country_info["capital"] = country_data[0]["capital"]
          country_info["region"] = country_data[0]["subregion"]
          
          # Get picture url of the country
          url = f"https://api.unsplash.com/photos/random/?client_id={unsplash_key}&query={country}&order_by=popular&orientation=landscape&count=1&content_filter=high"
          r_2 = requests.get(url)
          pic_data = r_2.json()[0]["urls"]["raw"]
          country_info["picture"]=pic_data

          # get safe level
          url_safe = f"https://www.travel-advisory.info/api?countrycode={country}"
          r_3 = requests.get(url_safe)
          safe_data = r_3.json()
          country_info["safe_level"]=safe_data

          countries_info.append(country_info)
      print(countries_info)
      
      

    
    
# c = CurrencyFinder("JPY","2020-03-03","2020-09-06")
# c.find_countries()


# currency = CurrencyFinder("CAD", "2020-02-02", "2020-06-02")
