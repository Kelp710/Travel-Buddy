
import requests
import os
import datetime
from dateutil.relativedelta import relativedelta


# # set Unsplash_Key="BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA&"
splash= "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"
a = datetime.datetime.now()
print(a)
no = f"{a.year}-{a.month}-{a.day}"
print(no)
six_months = a + relativedelta(months=-3)
print(six_months)

print(splash)
url = f"https://api.unsplash.com/photos/random/?client_id={splash}&query=Japan&order_by=popular&orientation=landscape&count=1&content_filter=high"
# url = f"https://www.travel-advisory.info/api?countrycode=JPN"

r_2 = requests.get(url)
print(r_2)
# url = f"https://restcountries.com/v2/currency/JPY"
# r = requests.get(url)
# print(r.json()[0]['alpha2Code'])