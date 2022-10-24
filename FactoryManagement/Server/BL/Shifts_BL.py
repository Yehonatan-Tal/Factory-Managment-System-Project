import jwt
from bson import ObjectId
from flask import make_response
from DAL.user_WS_dal import *
from DAL.user_FILE_dal import *
from DAL.db_dal import *

class SHIFTS_BL:
    def __init__(self):
        self.__DB_dal = DB_Dal()

    def add_shift(self, obj):
        self.__DB_dal.post_shifts_data(obj)
        return  "success"
    
    def update_shift(self, id, obj):
        self.__DB_dal.put_shifts_data(id, obj)
        return "Updating with ID : " + str(id)

