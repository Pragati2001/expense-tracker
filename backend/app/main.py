from flask import Flask, send_from_directory
from .database import db
from .routes import bp
import os
from flask_cors import CORS

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# FRONTEND_DIR = os.path.join(, ", "frontend")
FRONTEND_DIR = 'D:/assignments/frontend/src/'
print(FRONTEND_DIR,'fromn main')

def create_app():
    # app = Flask(__name__)
    app = Flask(
        __name__,
        static_folder="static/dist",
        static_url_path=""
    )

    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///expenses.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    app.register_blueprint(bp)

    with app.app_context():
        db.create_all()

    # @app.route("/")
    # def serve_index():
    #     return send_from_directory(FRONTEND_DIR, "index.html")

    # @app.route("/<path:path>")
    # def serve_static(path):
    #     return send_from_directory(FRONTEND_DIR, path)
    @app.route("/")
    def index():
        return send_from_directory(app.static_folder, "index.html")

    @app.route("/<path:path>")
    def static_files(path):
        return send_from_directory(app.static_folder, path)

    return app

app = create_app()

# 🔥 THIS keeps server alive
if __name__ == "__main__":
    app.run(debug=True)
