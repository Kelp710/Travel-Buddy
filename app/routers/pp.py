import requests
url = f"https://api.apilayer.com/exchangerates_data/fluctuation?start_date=2020-02-02&end_date=2021-02-03&base=CAD"
countries_info = []
payload = {}
headers= {
"apikey": "PyPZOB4LbjtqDiYMG6RmhWBKG76X5rH6"
}
unsplash_key = "BIWkxve6hsoQNq7zoauikNAOXOH03SEKh1futEFtnRA"

response = requests.request("GET", url, headers=headers, data = payload)

status_code = response.status_code
result = response.json()
print(result)