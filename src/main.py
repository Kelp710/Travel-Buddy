from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from currency import CurrencyFinder

app = FastAPI()

origins = [
    "http://localhost",
    "http://10.10.1.10:3000",
]

hard_countries ={"About":[
# {'country': 'Haiti', 'alpha2Code': 'HT', 'currency': 'HTG', 'currecy_rate': 1.064025, 'capital': 'Port-au-Prince', 'region': 'Caribbean', 'picture': 'https://images.unsplash.com/photo-1580740240113-a5c3a287fe7e?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYwMTEyODY1&ixlib=rb-1.2.1', 'safe_level': {'score': 4.4, 'sources_active': 7, 'message': 'Haiti has a current risk level of 4.4 (out of 5). We advise: Please reconsider your need to travel to Haiti.', 'updated': '2022-08-09 08:03:13', 'source': 'https://www.travel-advisory.info/haiti'}},
# {'country': 'Seychelles', 'alpha2Code': 'SC', 'currency': 'SCR', 'currecy_rate': 0.168857, 'capital': 'Victoria', 'region': 'Eastern Africa', 'picture': 'https://images.unsplash.com/photo-1593427264099-20e0c3e7fdb2?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYwMTEyODY1&ixlib=rb-1.2.1', 'safe_level': {'score': 3, 'sources_active': 4, 'message': 'Seychelles has a current risk level of 3 (out of 5). We advise: Use some caution when travelling Seychelles.', 'updated': '2022-08-09 08:03:13', 'source': 'https://www.travel-advisory.info/seychelles'}},
{'country': 'Turkey', 'alpha2Code': 'TR', 'currency': 'TRY', 'currecy_rate': 0.069946, 'capital': 'Ankara', 'region': 'Western Asia', 'picture': 'https://images.unsplash.com/photo-1535916707207-35f97e715e1c?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYwMTEyODY2&ixlib=rb-1.2.1', 'safe_level': {'score': 3.5, 'sources_active': 8, 'message': 'Turkey has a current risk level of 3.5 (out of 5). We advise: Please reconsider your need to travel to Turkey.', 'updated': '2022-08-09 08:03:13', 'source': 'https://www.travel-advisory.info/turkey'}},
{'country': 'Zambia', 'alpha2Code': 'ZM', 'currency': 'ZMW', 'currecy_rate': 0.184511, 'capital': 'Lusaka', 'region': 'Eastern Africa', 'picture': 'https://images.unsplash.com/photo-1639736921908-4fc1e56370ca?ixid=MnwzNDU3NDN8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjYwMTEyODY2&ixlib=rb-1.2.1', 'safe_level': {'score': 3, 'sources_active': 4, 'message': 'Zambia has a current risk level of 3 (out of 5). We advise: Use some caution when travelling Zambia.', 'updated': '2022-08-09 08:03:13', 'source': 'https://www.travel-advisory.info/zambia'},"paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Why": [
      "Good food",
      "Tempor incididunt",
      "Lorem ipsum dolor",
      "Incididunt ut labore"
    ],
    "Why2": [
      "Aliquip ex ea commodo",
      "Lorem ipsum dolor",
      "Exercitation ullamco",
      "Lorem ipsum dolor"
    ]}
]}
# hard_json = json.dumps(hard_countries)
# print(hard_json)
# c = CurrencyFinder("JPY","2020-03-03","2020-09-06")
# countries = c.find_countries()
# countries_data = {"About":countries}
# print(countries_data)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# c = CurrencyFinder()
# coin = c.find_countries("JPY","2020-03-03","2020-09-06")
# print(coin)



@app.get("/")
def Hello():
    return hard_countries