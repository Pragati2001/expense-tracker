from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal

class ExpenseCreate(BaseModel):
    request_id: str
    amount: Decimal = Field(gt=0)
    category: str
    description: str
    date: date
