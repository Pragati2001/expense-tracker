from .database import db
from sqlalchemy.sql import func
from sqlalchemy import UniqueConstraint
import uuid

class Expense(db.Model):
    __tablename__ = "expenses"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    request_id = db.Column(db.String, nullable=False, unique=True)

    amount = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("request_id", name="uq_request_id"),
    )
