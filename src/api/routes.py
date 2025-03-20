from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS  # ✅ Importa CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)
CORS(api)  # ✅ Habilita CORS en el Blueprint también

@api.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email y contraseña son requeridos"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "El usuario ya existe"}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        response = jsonify({"message": "Usuario registrado con éxito"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 201

    except Exception as e:
        response = jsonify({"error": f"Error en el servidor: {str(e)}"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 500

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email y contraseña son requeridos"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    # ✅ Generar token de acceso después de inicializar JWTManager en app.py
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "message": "Inicio de sesión exitoso"}), 200