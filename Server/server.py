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
    print t                                         # gör varje funktion så den ligger i linje med serverstub, se nedan
    if t == 'error':
        return json.dumps({"success": "false", "message": "Wrong username or password."})
    else:
        return json.dumps({"success": "true", "message": "Successfully signed in.", "data": t})


@app.route('/signup', methods=['POST', 'GET'])
@cross_origin()
def sign_up():
    firstname = request.args.get('firstname')
    familyname = request.args.get('familyname')
    gender = request.args.get('gender')
    city = request.args.get('city')
    country = request.args.get('country')
    email = request.args.get('email')
    password = request.args.get('password')
    password = create_hash(password)
    signup = dh.sign_up(firstname,familyname,gender,city, country, email, password)
    return json.dumps({"signup": signup}, sort_keys=True)
   
@app.route('/changepassword', methods=['POST', 'GET'])
@cross_origin()
def change_password():
    token1 = request.args.get('token')
    oldPassword = request.args.get('oldPassword')
    newPassword = request.args.get('newPassword')
    oldPassword = create_hash(oldPassword)
    newPassword = create_hash(newPassword)
    err= dh.change_password(token1, oldPassword, newPassword)
    if err == "error":
        passw = 'error'
        return json.dumps({"passw": passw}, sort_keys=True)
    else:
        passw = 'success'
        return json.dumps({"passw": passw}, sort_keys=True)
   
@app.route('/signout', methods=['POST', 'GET'])
@cross_origin()
def sign_out():
    token1 = request.args.get('token')
    tokreset = 'null'
    dh.sign_out(tokreset,token1)
    return json.dumps({"tokreset": tokreset}, sort_keys=True)
   

@app.route('/getuserdatabytoken', methods=['POST', 'GET'])
@cross_origin()
def get_user_data_by_token():
    token = request.args.get('token')
    user = dh.get_user_data_by_token(token)
    if user is None:
        error = 'error'
        return json.dumps({"e": error}, sort_keys=True)
    else:
        u = ",".join(user)
        return json.dumps({"u": u}, sort_keys=True)
    
@app.route('/getuserdatabyemail', methods=['POST', 'GET'])
@cross_origin()
def get_user_data_by_email():
    email = request.args.get('email') 
    user = dh.get_user_data_by_email(email)
    if user is None:
        error = 'error'
        return json.dumps({"e": error}, sort_keys=True)
    else:
        u2 = ",".join(user)
        return json.dumps({"u2": u2}, sort_keys=True)
    
@app.route('/postmessage', methods=['POST', 'GET'])
@cross_origin()
def post_message():
    token = request.args.get('token')
    email = request.args.get('email')
    message = request.args.get('message')
    dh.post_message(token, email, message)
    succ = 'posted'
    return json.dumps({"succ": succ}, sort_keys=True)

@app.route('/getusermessagesbytoken', methods=['POST', 'GET'])
@cross_origin()
def get_user_messages_by_token():
    token = request.args.get('token')
    mes = dh.get_user_messages_by_token(token)
    if mes is None:
        e2 = 'error'
        return json.dumps({"e2": e2}, sort_keys=True)
    else:
        return json.dumps({"mes": mes}, sort_keys=True)    
        
        
@app.route('/getusermessagesbyemail', methods=['POST', 'GET'])
@cross_origin()
def get_user_messages_by_email():
    token = request.args.get('token')
    email = request.args.get('email')
    mes2 = dh.get_user_messages_by_email(email)
    if mes2 is None:
        e3 = 'error'
        return json.dumps({"e3": e3}, sort_keys=True)
    else:
        return json.dumps({"mes2": mes2}, sort_keys=True) 


if __name__ == '__main__':
    app.run()