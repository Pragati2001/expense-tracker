from .models import Expense
from .database import db

def get_by_request_id(request_id):
    return Expense.query.filter_by(request_id=request_id).first()

def create_expense(data):
    expense = Expense(**data)
    db.session.add(expense)
    db.session.commit()
    return expense

def list_expenses(category=None, sort_desc=False):
    query = Expense.query

    if category:
        query = query.filter_by(category=category)

    if sort_desc:
        query = query.order_by(Expense.date.desc())

    return query.all()
