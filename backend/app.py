users = []
import bcrypt
import flask
import flask_cors
import re
import json
import random
import datetime
app = flask.Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = flask_cors.CORS(app)

users = []

password1 = bcrypt.hashpw("IceCream!23".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
password2 = bcrypt.hashpw("IceCream!23".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

user1 = {
"id": 1,
"username": "sweet_alice",
"email": "alice@example.com",
"password_hash": password1, 
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
    "password_hash": password2,  
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
    if not re.search(r"[&*(!@#$%^),.?\":{}|<>]", password):
        return False
    return True


@app.route("/signup", methods=["POST"])
def registration():
    data = flask.request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not is_valid_username(username):
        return {"success": False, "message": "Invalid username format"}, 400
    if not is_valid_email(email):
        return {"success": False, "message": "Invalid email format"}, 400
    if not is_valid_password(password):
        return {"success": False, "message": "Invalid password format"}, 400
    if any(user['username'] == username for user in users):
        return {"success": False, "message": "Username already exists"}, 400
    if any(user['email'] == email for user in users):
        return {"success": False, "message": "Email already exists"}, 400
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

@app.route("/login", methods=["POST"])
def login():
    data = flask.request.get_json()
    username = data.get("username")
    password = data.get("password")

    currentUser = None
    for el in users:
        if el["username"] == username:
            currentUser = el
    if currentUser == None:
        return {
                "success": False,
                "message": "Invalid username or password."}, 400
    if bcrypt.checkpw(password.encode('utf-8'), currentUser["password_hash"].encode('utf-8')):

        return { "success": True, "message": "Login successful.", "userId": currentUser["id"], "username": currentUser["username"]}, 200
    else:
        return {
                "success": False,
                "message": "Invalid username or password."}, 400

@app.route("/reviews", methods=["GET"])
def reviews():
  try:
    with open ("reviews.json") as f:
        reviews = json.load(f)
        rv = random.sample(reviews, 2)
        return {
"success": True,
"message": "Reviews loaded.",
"reviews": rv}, 200
  except:
    return { "success": False}, 400
    
@app.route("/flavors", methods=["GET"])
def flavors():
  try:
    with open ("flavors.json") as f:
        flavors = json.load(f)
        return {
"success": True,
"message": "Flavors loaded.",
"flavors": flavors}, 200
  except:
    return { "success": False}, 400

def get_user(userId):
    for user in users:
        if user["id"] == userId:
            return user
    return None


@app.route("/cart", methods=["GET"])
def get_cart():
    userId = flask.request.args.get("userId") 
    user = get_user(int(userId))
    if not user:
        return {"success": False, "message": "User not found"}, 400

    return {
        "success": True,
        "message": "Cart loaded.",
        "cart": user["cart"]
    }, 200



@app.route("/cart", methods=["POST"])
def add_to_cart():
    data = flask.request.get_json()
    userId = data.get("userId")
    flavorId = data.get("flavorId")  
    user = get_user(userId)
    if not user:
        return {"success": False, "message": "User not found"}, 400

    with open("flavors.json") as f:
        all_flavors = json.load(f)
    flavor = None
    for fl in all_flavors:
        if fl["id"] == flavorId:
            flavor = fl
            break
    if not flavor:
        return {"success": False, "message": "Flavor not found"}, 400

    for item in user["cart"]:
        if item["flavorId"] == flavorId:  
            return {"success": False, "message": "Item already in cart"}, 400

    user["cart"].append({
        "flavorId": flavor["id"],
        "name": flavor["name"],
        "price": flavor["price"],
        "quantity": 1
    })

    return {
        "success": True,
        "message": "Flavor added to cart.",
        "cart": user["cart"]
    }, 200


@app.route("/cart", methods=["PUT"])
def update_cart():
    data = flask.request.get_json()
    userId = data.get("userId")
    flavorId = data.get("flavorId")
    quantity = data.get("quantity")  
    user = get_user(userId)
    if not user:
        return {"success": False, "message": "User not found"}, 400

    if quantity < 1:
        return {"success": False, "message": "Invalid quantity"}, 400

    for item in user["cart"]:
        if item["flavorId"] == flavorId:
            item["quantity"] = quantity
            return {
                "success": True,
                "message": "Cart updated successfully.",
                "cart": user["cart"]
            }, 200

    return {"success": False, "message": "Item not found in cart"}, 400

@app.route("/cart", methods=["DELETE"])
def delete_from_cart():
    data = flask.request.get_json()
    userId = data.get("userId")
    flavorId = data.get("flavorId")

    user = get_user(userId)
    if not user:
        return {"success": False, "message": "User not found"}, 400

    user["cart"] = [
        item for item in user["cart"]
        if item["flavorId"] != flavorId
    ]

    return {
        "success": True,
        "message": "Flavor removed from cart.",
        "cart": user["cart"]
    }, 200

@app.route("/orders", methods=["POST"])
def place_orders():  
    data = flask.request.get_json()  
    userId = data.get("userId")  
    user = get_user(userId)
    if not user:
        return {"success": False, "message": "User not found"}, 400
    if len(user["cart"]) == 0:
        return {"success": False, "message": "Cart is empty"} , 400
    total = 0
    for item in user["cart"]:
        price = item["price"]
        if isinstance(price, str):
            price = float(price.replace("$", ""))
        total += price * item["quantity"]
    new_order_id = 1
    if user["orders"]:
        new_order_id = max(el["orderId"] for el in user["orders"]) + 1
    order = {
        "orderId": new_order_id,
        "items": user["cart"].copy(),
        "total": round(total, 2),
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
    }
    user["orders"].append(order)

    user["cart"] = []
    return {
        "success": True,
        "message": "Order placed successfully.",
        "orderId": new_order_id
    }, 200

@app.route("/orders", methods=["GET"])
def order_history():
    userId = flask.request.args.get("userId")
    user = get_user(int(userId)) 
    if not user:
        return {"success": False, "message": "User not found"}, 400
    
    user_orders = []
    for el in user["orders"]:
        user_orders.append(el)
    return {
  "success": True,
  "message": "Order history loaded.",
  "orders": user_orders
}, 200

if __name__ == '__main__':
    app.run(debug=True)