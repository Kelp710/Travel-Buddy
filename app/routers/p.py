import requests

url = "https://cost-of-living-and-prices.p.rapidapi.com/prices"

querystring = {"city_name":"Kathmandu","country_name":"napal"}

headers = {
	"X-RapidAPI-Key": "996ae8ab49msh8c991b4e71c0891p14d285jsn295dad829477",
	"X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)