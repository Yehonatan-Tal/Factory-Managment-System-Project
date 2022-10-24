import requests
from flask.json import jsonify

class UserWSDal :
     def __init__(self):
         pass
     
     def get_all_users(self):
         resp = requests.get("https://jsonplaceholder.typicode.com/users")
         return  resp.json()

     def add_user(self, obj):
         resp = requests.post("https://jsonplaceholder.typicode.com/users", obj)
         return  resp.json()
