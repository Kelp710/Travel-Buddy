import imp


import requests
url = "https://cities-cost-of-living1.p.rapidapi.com/get_cities_details_by_name"

payload = "cities=%5B%7B%22name%22%3A%22Lisbon%22%2C%22country%22%3A%22Portugal%22%7D%5D&currencies=%5B%22USD%22%5D"
headers = {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "03bc48fe04mshafeb94884761a7dp135680jsn66224dffa769",
    "X-RapidAPI-Host": "cities-cost-of-living1.p.rapidapi.com"
}
r_4 = requests.request("POST", url, data=payload, headers=headers)
cost_of_living = r_4.json()
print(cost_of_living)