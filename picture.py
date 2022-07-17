
import requests
import os
from dotenv import load_dotenv, find_dotenv,dotenv_values
load_dotenv()
# set Unsplash_Key="BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA&"
splash= os.getenv("UNSPLASH_KEY")

print(splash)
url = f"https://api.unsplash.com/photos/random/?client_id={splash}&query=Gabon&order_by=popular&orientation=landscape&count=1&content_filter=high"
# url = f"https://www.travel-advisory.info/api?countrycode=JPN"

r_2 = requests.get(url)
print(r_2.json())