from flask import Flask, request, jsonify
import mysql.connector
import requests

app = Flask(__name__)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="yourpassword",
    database="healthmate"
)
cursor = db.cursor()

PAYSTACK_SECRET_KEY = "sk_test_xxxxxxxxxxxxxxxxxxxxxx"

@app.route('/verify-payment', methods=['POST'])
def verify_payment():
    data = request.get_json()
    reference = data.get("reference")

    # Verify payment with Paystack API
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {"Authorization": f"Bearer {PAYSTACK_SECRET_KEY}"}
    r = requests.get(url, headers=headers)
    result = r.json()

    if result["status"] and result["data"]["status"] == "success":
        amount = result["data"]["amount"] / 100
        email = result["data"]["customer"]["email"]

        # Store in MySQL
        cursor.execute(
            "INSERT INTO transactions (reference, email, amount, status) VALUES (%s, %s, %s, %s)",
            (reference, email, amount, "success")
        )
        db.commit()
        return jsonify({"message": "Payment successful and recorded."})
    else:
        return jsonify({"message": "Payment verification failed."}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)
