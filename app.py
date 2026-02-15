import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["portfolio"]

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/contact", methods=["POST"])
def contact():
    data = request.json
    db.contacts.insert_one(data)
    return jsonify({"message":"Saved"}), 200

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json["message"]

    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":user_msg}]
    )

    reply = response.choices[0].message.content
    db.chats.insert_one({"user":user_msg,"bot":reply})

    return jsonify({"reply":reply})

if __name__ == "__main__":
    app.run(debug=True)
