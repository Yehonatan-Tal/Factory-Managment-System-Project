import jwt
from bson import ObjectId
from flask import make_response
from DAL.user_WS_dal import *
from DAL.user_FILE_dal import *
from DAL.db_dal import *

class DB_BL:
    def __init__(self):
        self.__DB_dal = DB_Dal()

    def get_data(self, dataType):
        data = self.__DB_dal.get_data(dataType)
        return  data
