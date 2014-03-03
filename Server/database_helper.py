from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import sqlite3
import os
import random
import string
import sys


# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

DATABASE = 'database.db'

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'database.db'),
    DEBUG=True,
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('database.schema', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def sign_up(firstname,familyname,gender,city,country,email,password):
    user = query_db('SELECT email FROM user_info WHERE email=?',[email])
    if user is None:
        return 'There is already an user registered with that username'
    else:
        db = get_db()
        db.execute('insert into user_info (firstname, familyname, gender, city, country, email, password) values (?,?,?,?,?,?,?)', [firstname, familyname, gender, city, country, email, password])
        db.commit()
        
def sign_in(email1,password1,token1):
    user = query_db('SELECT email,password FROM user_info WHERE email=? AND password=?',[email1,password1])
    if user == None:
        return 'No such user registered in the database'
    else:
        db = get_db()
        db.execute('UPDATE user_info SET token=? WHERE email=? AND password=? ' , [token1, email1, password1])
        db.commit()
        return token1
    
def change_password(token1, oldPassword, newPassword):
    pc = query_db('SELECT password FROM user_info WHERE token=?',[token1])
    #if "".join(pc) == "".join(oldPassword):
    db = get_db()
    db.execute('UPDATE user_info SET password=? WHERE token=?', [newPassword, token1])
    db.commit()
    #else:    
        #return "error"
   

def sign_out(tokreset,token1):
    db = get_db()
    db.execute('UPDATE user_info SET token=? WHERE token=?' , [tokreset, token1])
    db.commit()        
    return "You have now signed-out"

def get_user_data_by_token(token):
    user = query_db('SELECT email,firstname, familyname, gender, city, country FROM user_info WHERE token=?',[token])
    r = user[0]
    return r

def get_user_data_by_email(email):
    user = query_db('SELECT email,firstname, familyname, gender, city, country FROM user_info WHERE email=?',[email])
    r = user[0]
    return r

def post_message(token, email, message):
    #user = query_db('SELECT email FROM user_info WHERE email=?',[email])
    #if user is None:
    #    return 'The reciever of this message is not registered'
    #else:   
    au = query_db('SELECT email FROM user_info WHERE token=?',[token])
    ad = ",".join(au[0]) 
    db = get_db()
    db.execute('insert into messanges(author, receiver, message) values (?,?,?)', [ad, email, message])
    db.commit()


def get_user_messages_by_token(token):
    re = query_db('SELECT email FROM user_info WHERE token=?',[token])
    rt = ''.join(re[0])
    l = []
    for mes in query_db('SELECT message FROM messanges WHERE receiver=?',[rt]):
        if mes is None:
            return 'None'
        else:
            l.append(mes['message']) 
    st = '\n'.join(l)
    return st
    
def get_user_messages_by_email(email):
    ll = []
    for mes in query_db('SELECT message FROM messanges WHERE receiver=?',[email]):
        if mes is None:
            return 'None'
        else:
            ll.append(mes['message']) 
    st = '\n'.join(ll)
    return st

    