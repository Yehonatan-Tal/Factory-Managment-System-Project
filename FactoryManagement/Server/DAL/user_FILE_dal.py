import json
import os
import sys


class UserFileDal :

     def __init__(self):
        path = os.path.join(sys.path[0], "data/persons.json")
        f = open(path, "r")
        data = json.load(f)
        f.close()
        self.__persons = data
     
     def get_persons_info(self):
        return self.__persons["persons"]

     def add_user(self, obj):
        self.__persons["persons"].append(obj)
        path = os.path.join(sys.path[0], "data/persons.json")
        f = open(path, "w") 
        data = json.dump(self.__persons, f)
        f.close()          
        return("Appended !!! ")    