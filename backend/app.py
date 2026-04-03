users = []
import bcrypt
import flask
import flask_cors

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