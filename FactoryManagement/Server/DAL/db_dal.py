import requests
from bson import ObjectId
from pymongo import MongoClient

class DB_Dal :
     def __init__(self):
        self.__mongo_client = MongoClient(port = 27017)
        self.__db = self.__mongo_client["factoryDB"]
     
     def get_data(self, dataType):
        arr = []
        data = self.__db[dataType].find()
        for obj in data:
         arr.append(obj)
        return arr

     def post_shifts_data(self, obj):
        shift = {}
        shift = obj
        self.__db["shifts"].insert_one(shift)
        return

     def post_employee(self, obj):
        employee = {}
        employee = obj
        self.__db["employees"].insert_one(employee)
        return  
        
     def update_employee_data(self, id, obj):
         employee = {}
         obj.pop('_id')
         employee = obj 
         self.__db["employees"].update_one({"_id" : ObjectId(id)}, {"$set" : employee})
         return     

     def put_shifts_data(self, id, obj):
         shift = {}
         shift = obj 
         self.__db["shifts"].update_one({"_id" : ObjectId(id)}, {"$set" : shift})
         return

     def update_shifts_list(self, id ,obj):
         shiftList = []
         shiftList = obj 
         self.__db["employees"].update_one({"_id" : ObjectId(id)}, {"$set" : {'Shifts' : shiftList}})
         return  'Updated successfully'

     def delete_employee(self, id):
         self.__db["employees"].delete_one({"_id" : ObjectId(id)})
         return  


     def get_shiftList(self, id):
         employee =  self.__db["employees"].find_one({'_id' :  ObjectId(id)})
         return  employee     

    