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
 

# create our little application :)
app = Flask(__name__)
app.config['DEBUG'] = True

def create_hash(password):
    return ps.sha256(password.encode()).hexdigest()

@app.route('/signin', methods=['POST', 'GET']) 
def sign_in():
    email1 = request.args.get('email')
    password1 = request.args.get('password')
    password1 = create_hash(password1)
    length = 20
    generated_token = string.ascii_uppercase + string.digits +string.ascii_lowercase 
    token1 = ''.join(random.choice(generated_token) for i in range(length))
    t = dh.sign_in(email1,password1,token1)
    return t


@app.route('/signup', methods=['POST'])
def sign_up():
    firstname = request.args.get('firstname')
    familyname = request.args.get('familyname')
    gender = request.args.get('gender')
    city = request.args.get('city')
    country = request.args.get('country')
    email = request.args.get('email')
    password = request.args.get('password')
    password = create_hash(password)
    dh.sign_up(firstname,familyname,gender,city, country, email, password)
    return "You are now signed-up"
   
@app.route('/changepassword', methods=['POST'])
def change_password():
    token1 = request.args.get('token')
    oldPassword = request.args.get('oldPassword')
    newPassword = request.args.get('newPassword')
    oldPassword = create_hash(oldPassword)
    newPassword = create_hash(newPassword)
    err= dh.change_password(token1, oldPassword, newPassword)
    if err == "error":
        return "You wrote wrong old password"
    else:
        return "You have now changed password"
   
@app.route('/signout', methods=['POST'])
def sign_out():
    token1 = request.args.get('token')
    tokreset = 'null'
    dh.sign_out(tokreset,token1)
    return "You have now signed-out"
    

@app.route('/getuserdatabytoken', methods=['POST', 'GET'])
def get_user_data_by_token():
    token = request.args.get('token')
    user = dh.get_user_data_by_token(token)
    if user is None:
        return 'No such user'
    else:
        return ",".join(user)

@app.route('/getuserdatabyemail', methods=['POST', 'GET'])
def get_user_data_by_email():
    email = request.args.get('email') 
    user = dh.get_user_data_by_email(email)
    if user is None:
        return 'No such user'
    else:
        return ",".join(user)
    
@app.route('/postmessage', methods=['POST'])
def post_message():
    token = request.args.get('token')
    email = request.args.get('email')
    message = request.args.get('message')
    dh.post_message(token, email, message)
    return "You have posted a message"

@app.route('/getusermessagesbytoken', methods=['POST', 'GET'])
def get_user_messages_by_token():
    token = request.args.get('token')
    mes = dh.get_user_messages_by_token(token)
    if mes is None:
        return 'No messages'
    else:
        return mes    
        
        
@app.route('/getusermessagesbyemail', methods=['POST', 'GET'])
def get_user_messages_by_email():
    token = request.args.get('token')
    email = request.args.get('email')
    mes = dh.get_user_messages_by_email(email)
    if mes is None:
        return 'No messages'
    else:
        return mes  


if __name__ == '__main__':
    app.run()