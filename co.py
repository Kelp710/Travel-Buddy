# import requests

# url = "https://api.apilayer.com/exchangerates_data/fluctuation?start_date=2020-02-03&end_date=2020-02-08&base=CAD"

# payload = {}
# headers= {
#   "apikey": "PyPZOB4LbjtqDiYMG6RmhWBKG76X5rH6"
# }

# response = requests.request("GET", url, headers=headers, data = payload)

# status_code = response.status_code
# result = response.text
# print(result)
import requests

url = "https://api.apilayer.com/exchangerates_data/symbols"

payload = {}
headers= {
  "apikey": "PyPZOB4LbjtqDiYMG6RmhWBKG76X5rH6"
}

response = requests.request("GET", url, headers=headers, data = payload)

status_code = response.status_code
result = response.text
print(len(result))