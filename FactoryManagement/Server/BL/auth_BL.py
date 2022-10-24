import jwt
from flask import make_response
from DAL.user_WS_dal import *
from DAL.user_FILE_dal import *

class AuthBL:
    def __init__(self):
        self.__key = "secret"
        self.__algorithm = "HS256"
        self.__user_ws_dal = UserWSDal()
        #fileData = self.__user_file_dal.get_persons_info()

    def get_all_authorized_users(self):
        WsData = self.__user_ws_dal.get_all_users()
        
        def func(x):
            arr = {"userId" : x["id"] ,"username" : x["username"], "email" : x["email"], "name" : x["name"]}
            return arr 

        persons = list(map(lambda x : func(x), WsData)) 
        
        return persons       


    def get_token(self, username, email):
        user = self.__check_user(username, email)
        if user is not None:
            token = jwt.encode({"userId" : user["userId"], "name" : user["name"]}, self.__key, self.__algorithm)
            return  make_response({"token" : token, "role" : "IT ADMIN"}, 200)
        else :  
            return  make_response({"ERROR" : "Youre anot authorized"}, 401)   

    def verify_token(self, token):
        data = jwt.decode(token, self.__key, self.__algorithm)
        userId = data["userId"]
        if(data is not None):
            bool = False
            #Check existance of that user id:
            auth_users = self.get_all_authorized_users()
            for user in auth_users:
                if(userId == user["userId"]):
                   bool = True
                   break
            if(bool == True): return True 
            else: return False           
        else: return False


    def __check_user(self, username, email):
        #Check existance of that user in data source and if exists - returns a unique value:
        auth_users = self.get_all_authorized_users()
        for user in  auth_users:
            if(username == user["username"] and email == user["email"]):
                return user
