from pickle import FALSE
from tkinter import TRUE
import jwt
from bson import ObjectId
from flask import make_response
from DAL.user_WS_dal import *
from DAL.user_FILE_dal import *
from DAL.db_dal import *

class EMPLOYEES_BL:
    def __init__(self):
        self.__DB_dal = DB_Dal()

    def allocate_new_shift(self,id,obj):
        list = []
        list = self.__get_shiftList(id)
        if (self.__duplication_shifts_check(list, obj) == False):
            list.append(obj)
            return  self.__DB_dal.update_shifts_list(id, list) 
        else: return 'Duplication'

    def __get_shiftList(self, id):
        data = self.__DB_dal.get_shiftList(id)
        return data['Shifts']

    def __duplication_shifts_check(self, shiftsList, obj):
            check = False
            for shift in shiftsList :
                if shift['_id'] == obj['_id']:
                    check = True
            return check

    def post_employee(self, obj):
        self.__DB_dal.post_employee(obj)
        return 'New employee created !'        
        
    def update_employee(self, id, obj):
        self.__DB_dal.update_employee_data(id, obj)
        return "Updating with ID : " + str(id)
    
    def delete_employee(self, id):
        self.__DB_dal.delete_employee(id)
        return 'delete successfully done !'    
