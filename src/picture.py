import requests
import os
import datetime
from dateutil.relativedelta import relativedelta


# # # set Unsplash_Key="BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA&"
# splash= "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"
# a = datetime.datetime.now()
# print(a)
# no = f"{a.year}-{a.strftime('%m')}-{a.strftime('%d')}"
# print(no)
# six_months = a + relativedelta(months=-3)
# six_months_data = f"{six_months.year}-{six_months.strftime('%m')}-{six_months.strftime('%d')}"
# print(six_months_data)


# url = f"https://api.apilayer.com/exchangerates_data/fluctuation?start_date={six_months_data}&end_date={no}&base=JPY"
# countries_info = []
# payload = {}
# headers= {
# "apikey": "PyPZOB4LbjtqDiYMG6RmhWBKG76X5rH6"
# }
splash = "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"

# response = requests.request("GET", url, headers=headers, data = payload)

# status_code = response.status_code
# result = response.json()
# print(result)
# print(splash)
url = f"https://api.unsplash.com/photos/random/?client_id={splash}&query=Japan&order_by=popular&orientation=landscape&count=1&content_filter=high"
# url = f"https://www.travel-advisory.info/api?countrycode=JPN"

r_2 = requests.get(url)
print(r_2)
# print(r_2)
url = f"https://restcountries.com/v2/currency/JPY"
r = requests.get(url).json()
print(r)
url = f"https://api.apilayer.com/exchangerates_data/fluctuation?start_date=2020-03-03&end_date=2021-02-03&base=JPY"
countries_info = []
payload = {}
headers= {
"apikey": "YW9YYuJleCkcnDXY4hLUGspYSZI3HZ9J"
}
unsplash_key = "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"

response = requests.request("GET", url, headers=headers, data = payload)

status_code = response.status_code
result = response.json()

# print(r.json())



