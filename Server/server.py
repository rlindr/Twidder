from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import sqlite3
import os
import random
import string
import sys
import database_helper as dh
import uuid
import hashlib as ps
import json
from gevent.wsgi import WSGIServer


try:
  from flask_cors import cross_origin # support local usage without installed package
except:
  from flask.ext.cors import cross_origin # this is how you would normally import

 


# create our little application :)
app = Flask(__name__)
app.config['DEBUG'] = True





def create_hash(password):
    return ps.sha256(password.encode()).hexdigest()

@app.route('/signin', methods=['POST', 'GET']) 
@cross_origin()
def sign_in():
    email1 = request.form.get('email')
    password1 = request.form.get('password')
    password1 = create_hash(password1)
    length = 20
    generated_token = string.ascii_uppercase + string.digits +string.ascii_lowercase 
    token1 = ''.join(random.choice(generated_token) for i in range(length))
    t = dh.sign_in(email1,password1,token1)
    if t == 'error':
        return json.dumps({"success": "false", "message": "Wrong username or password."})
    else:
        return json.dumps({"success": "true", "message": "Successfully signed in.", "data": t})



@app.route('/signup', methods=['POST', 'GET'])
@cross_origin()
def sign_up():
    firstname = request.form.get('firstname')
    familyname = request.form.get('familyname')
    gender = request.form.get('gender')
    city = request.form.get('city')
    country = request.form.get('country')
    email = request.form.get('email')
    password = request.form.get('password')
    password = create_hash(password)
    signup = dh.sign_up(firstname,familyname,gender,city, country, email, password)
    if signup == 'success':
        return json.dumps({"success": "true", "message": "Successfully created a new user."})
    else:
        return json.dumps({"success": "false", "message": "User already exists."})


   
@app.route('/changepassword', methods=['POST', 'GET'])
@cross_origin()
def change_password():
    token1 = request.form.get('token')
    oldPassword = request.form.get('oldPassword')
    newPassword = request.form.get('newPassword')
    print token1
    print oldPassword
    print newPassword
    oldPassword = create_hash(oldPassword)
    newPassword = create_hash(newPassword)
    err= dh.change_password(token1, oldPassword, newPassword)
    print err
    if err == "passwchanged":
        return json.dumps({"success": "true", "message":"Password changed."})
    else:
        return json.dumps({"success": "false", "message":"Wrong password."})
       
   
@app.route('/signout', methods=['POST', 'GET'])
@cross_origin()
def sign_out():
    token1 = request.form.get('token')
    tokreset = 'null'
    signed = dh.sign_out(tokreset,token1)
    if signed == "signout":
        return json.dumps({"success": "true", "message":"Successfully signed out."})
    else:
        return json.dumps({"success": "false", "message":"You are not signed in."})
   

@app.route('/getuserdatabytoken', methods=['POST', 'GET'])
@cross_origin()
def get_user_data_by_token():
    token = request.form.get('token')
    user = dh.get_user_data_by_token(token)
    if user is None:
        error = 'error'
        return json.dumps({"success": "false", "message":"No such user."})
    else:
        u = ",".join(user)
        return json.dumps({"success": "true", "message": "User data retrieved.", "data": u})
      
    
@app.route('/getuserdatabyemail', methods=['POST', 'GET'])
@cross_origin()
def get_user_data_by_email():
    email = request.form.get('email')
    user = dh.get_user_data_by_email(email)
    firstname =  user[1]
    familyname =  user[2]
    gender =  user[3]
    city =  user[4]
    country = user[5]
    if user is None:
        return json.dumps({"success": "false", "message":"No such user."})
    else:
        u2 = ",".join(user)
        return json.dumps({"success": "true", "message": "User data retrieved.", "email": email, "firstname": firstname, "familyname": familyname, "gender": gender, "city": city, "country": country})

    
@app.route('/postmessage', methods=['POST', 'GET'])
@cross_origin()
def post_message():
    token = request.form.get('token')
    email = request.form.get('email')
    message = request.form.get('message')
    print message
    post = dh.post_message(token, email, message)
    if post is None:
      return json.dumps({"success": "false", "message":"No such user."})
    else: 
      return json.dumps({"success": "true", "message": "Message posted"})
  

@app.route('/getusermessagesbytoken', methods=['POST', 'GET'])
@cross_origin()
def get_user_messages_by_token():
    token = request.args.get('token')
    mes = dh.get_user_messages_by_token(token)
    if mes is None:
        e2 = 'error'
        return json.dumps({"success": "false", "message":"No such user."})
    else:
        return json.dumps({"success": "true", "message": "User messages retrieved.", "data": mes}) 
        
        
@app.route('/getusermessagesbyemail', methods=['POST', 'GET'])
@cross_origin()
def get_user_messages_by_email():
    #token = request.form.get('token') i serverstub tas token in vet inte om vi borde gora det har
    email = request.form.get('email')
    mes2 = dh.get_user_messages_by_email(email)
    if mes2 is None:
        e3 = 'error'
        return json.dumps({"success": "false", "message":"No such user."})
    else:
        return json.dumps({"success": "true", "message": "User messages retrieved.", "data": mes2})

if __name__ == '__main__':
  http_server = WSGIServer(('', 5000), app)
  http_server.serve_forever()