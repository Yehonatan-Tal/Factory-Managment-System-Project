from flask import Flask, jsonify, make_response
from flask import request
from flask_cors import CORS
from BL.auth_BL import AuthBL
from BL.DB_BL import DB_BL
from BL.Shifts_BL import SHIFTS_BL
from BL.Employees_BL import EMPLOYEES_BL
from bson import ObjectId
import json


app = Flask(__name__)
CORS(app)
auth_bl = AuthBL()
db_bl = DB_BL()
shifts_bl = SHIFTS_BL()
employees_bl = EMPLOYEES_BL()

class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)    

app.json_encoder = MyEncoder        

@app.route('/auth/users', methods = ["GET"])
def get_all_users() :
    return jsonify(auth_bl.get_all_authorized_users())


@app.route('/auth/login', methods = ['POST'])
def login():
    obj = request.json
    token = auth_bl.get_token(obj["username"], obj["email"])
    return token


@app.route('/employees', methods = ['GET'])
def get_employees():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            employees = db_bl.get_data("employees")
            return jsonify(employees)
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)

@app.route('/employees/<string:id>', methods = ['PUT'])
def update_employee(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            obj = request.json
            return jsonify(employees_bl.update_employee(id, obj))
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)   

@app.route('/employees/allocateShift/<string:id>', methods = ['PUT'])
def update_shift_list(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            obj = request.json
            return jsonify(employees_bl.allocate_new_shift(id, obj))
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)

@app.route('/employees', methods = ['POST'])
def post_employee():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            obj = request.json
            return jsonify(employees_bl.post_employee(obj))
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)        

@app.route('/employees/<string:id>', methods = ['DELETE'])
def delete_employee(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            return jsonify(employees_bl.delete_employee(id))
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)                        


@app.route('/departments', methods = ['GET'])
def get_departments():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            departments = db_bl.get_data("departments")
            return jsonify(departments)
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401) 

@app.route('/shifts', methods = ['GET'])
def get_shifts():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            shifts = db_bl.get_data("shifts")
            return jsonify(shifts)
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)


@app.route('/shifts', methods = ['POST'])
def post_shift():
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            obj = request.json
            return jsonify(shifts_bl.add_shift(obj))
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401) 

@app.route('/shifts/<string:id>', methods = ['PUT'])
def update_shift(id):
    if request.headers and request.headers.get("x-access-token"):
        token = request.headers.get("x-access-token")
        exist = auth_bl.verify_token(token)
        if exist == True :
            obj = request.json
            return jsonify(shifts_bl.update_shift(id, obj))
        else:
            return  make_response({"ERROR" : "Youre not authorized"}, 401)      
    else:
        return  make_response({"ERROR" : "Youre not authorized"}, 401)               
            

app.run()     