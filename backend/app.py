users = []
import bcrypt
import flask
import flask_cors
import re
import json
import random
app = flask.Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = flask_cors.CORS(app)

users = []

user1 = {
"id": 1,
"username": "sweet_alice",
"email": "alice@example.com",
"password_hash": "$2b$12$examplehashedvalue",
"cart": [
{
"flavorId": 2,
"name": "Chocolate Bliss",
"price": 5.49,
"quantity": 2
}
],
"orders": [
{
"orderId": 1,
"items": [
{
"flavorId": 1,
"name": "Vanilla Dream",
"price": 4.99,
"quantity": 1
}
],
"total": 4.99,
"timestamp": "2026-03-30 18:30:00"
}
]
}
user2 = {
    "id": 2,
    "username": "cool_ben",
    "email": "benjamin@example.com",
    "password_hash": "$2b$12$anotherexamplehashedvalue",
    "cart": [
        {
            "flavorId": 3,
            "name": "Strawberry Swirl",
            "price": 5.99,
            "quantity": 1
        },
        {
            "flavorId": 5,
            "name": "Minty Fresh",
            "price": 4.79,
            "quantity": 3
        }
    ],
    "orders": [
        {
            "orderId": 2,
            "items": [
                {
                    "flavorId": 4,
                    "name": "Cookie Crunch",
                    "price": 6.49,
                    "quantity": 2
                }
            ],
            "total": 12.98,
            "timestamp": "2026-04-01 14:15:00"
        }
    ]
}
users.append(user1)
users.append(user2)
def is_valid_username(username):
    pattern = r"^[A-Za-z][A-Za-z0-9_-]{2,19}$"
    return re.match(pattern, username) is not None


def is_valid_email(email):
    pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    
    return re.match(pattern, email) is not None
def is_valid_password(password):
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"[0-9]", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True
def registration(username, email, password):
    if not is_valid_username(username):
        return {"success": False, "error": "Invalid username format"}, 400
    if not is_valid_email(email):
        return {"success": False, "error": "Invalid email format"}, 400
    if not is_valid_password(password):
        return {"success": False, "error": "Invalid password format"}, 400
    if any(user['username'] == username for user in users):
        return {"success": False, "error": "Username already exists"}, 400
    if any(user['email'] == email for user in users):
        return {"success": False, "error": "Email already exists"}, 400
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = {
        "id": len(users) + 1,
        "username": username,
        "email": email,
        "password_hash": password_hash.decode('utf-8'),
        "cart": [],
        "orders": []
    }
    users.append(new_user)
    return {"success": True,"message": "Registration successful."}, 201


def login(username, password):
    currentUser = None
    for el in users:
        if el["username"] == username:
            currentUser = el
    if currentUser == None:
        return {
                "success": False,
                "message": "Invalid username or password."}, 400
    if currentUser["password_hash"] == bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()):
        { "success": True, "message": "Login successful.", "userId": currentUser["id"], "username": currentUser["username"]}, 201
def reviews():
  try:
    with open ("reviews.js") as f:
        reviews = json.load(f)
        rv = random.sample(reviews, 2)
        return {
"success": True,
"message": "Reviews loaded.",
"reviews": rv}, 201
  except:
    return { "success": False}, 400
    





