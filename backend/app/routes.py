from flask import Blueprint, request, jsonify
from . import crud
from .schemas import ExpenseCreate

bp = Blueprint("expenses", __name__)

@bp.route("/expenses", methods=["POST"])
def create_expense():
    payload = request.get_json()

    try:
        expense_data = ExpenseCreate(**payload).dict()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    existing = crud.get_by_request_id(expense_data["request_id"])
    if existing:
        return jsonify(serialize(existing)), 200

    expense = crud.create_expense(expense_data)
    return jsonify(serialize(expense)), 201

@bp.route("/expenses", methods=["GET"])
def get_expenses():
    category = request.args.get("category")
    sort = request.args.get("sort")

    expenses = crud.list_expenses(
        category=category,
        sort_desc=(sort == "date_desc")
    )

    return jsonify([serialize(e) for e in expenses])

def serialize(expense):
    return {
        "id": expense.id,
        "amount": str(expense.amount),
        "category": expense.category,
        "description": expense.description,
        "date": expense.date.isoformat(),
        "created_at": expense.created_at.isoformat()
    }
