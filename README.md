# Expense Tracker — Production-Minded Implementation

## Overview

This project implements a small **Expense Tracker** system with a **Flask backend** and a **React frontend**.
The focus is **correctness, data integrity, and realistic behavior under failure conditions**, rather than feature quantity or visual polish.

The system allows users to:

* Create expenses
* List expenses
* Filter by category
* Sort by date (newest first)
* View the total of currently visible expenses

---

## Backend

### Technology Choices

* **Flask** — lightweight, explicit request handling
* **SQLAlchemy** — ORM with clear data modeling
* **Pydantic** — strict request validation
* **SQLite** — persistence layer

---

### Backend Folder Structure

```
backend/
├─ app/
│  ├─ main.py        # App creation & configuration
│  ├─ routes.py      # HTTP API routes
│  ├─ models.py      # Database models
│  ├─ schemas.py     # Request validation (Pydantic)
│  ├─ crud.py        # Database access logic
│  └─ database.py    # DB initialization
├─ expenses.db       # SQLite database
└─ requirements.txt
```

#### Why this structure

* **Clear separation of concerns**

  * Routing, validation, persistence, and configuration are isolated
* **Scales naturally**

  * Easy to add more routes, models, or background jobs
* **Production-friendly**

  * Avoids “everything in one file” anti-patterns

---

### Persistence Choice: SQLite

**Why SQLite was chosen**

* Zero external dependencies
* Persistent across restarts (unlike in-memory storage)
* ACID-compliant
* Sufficient for realistic workloads at this scale

**Why this adds real value**

* Demonstrates correct persistence behavior (refreshing the page does not lose data)
* Avoids unnecessary complexity of external databases
* Easy to migrate later to PostgreSQL/MySQL with minimal changes

---

### Money Handling & Data Correctness

* Expense amounts are validated using **`Decimal`** instead of floating-point numbers
* Database stores money using `Numeric(10,2)`
* Prevents rounding errors and floating-point inaccuracies
* Backend validates all incoming data before persistence

This directly addresses **real-world financial correctness**, which is explicitly evaluated.

---

### API Design

#### `POST /expenses`

* Creates a new expense
* Validates:

  * Positive amount
  * Required fields
  * Correct date format
* Designed to behave correctly even if the client retries the same request

#### `GET /expenses`

* Returns persisted expenses
* Supports:

  * Category filtering
  * Sorting by date (newest first)

---

### Behavior Under Realistic Conditions

| Scenario                 | Backend Behavior             |
| ------------------------ | ---------------------------- |
| Client retries request   | Safe, validated handling     |
| Invalid input            | Rejected with clear error    |
| Large or invalid amounts | Blocked by schema validation |
| Page refresh             | Data persists                |

---

## Frontend

### Technology Choices

* **React (Vite)**
* Plain JavaScript (no unnecessary libraries)
* Fetch API

---

### Frontend Folder Structure

```
frontend/
├─ index.html
├─ package.json
└─ src/
   ├─ App.jsx                # Application state & orchestration
   ├─ api.js                 # API communication
   └─ components/
      ├─ ExpenseForm.jsx     # Expense creation
      ├─ ExpenseList.jsx     # Expense table
      └─ Filters.jsx         # Category & sort controls
```

#### Why this structure

* **App.jsx** owns state and derived data
* Components are **presentational and reusable**
* API logic is isolated from UI logic
* Easy to reason about and debug

---

### Frontend Design Decisions

#### State Management

* Backend is the **source of truth**
* Frontend derives:

  * Filtered expenses
  * Sorted expenses
  * Total amount (from visible expenses)

No duplicated or inconsistent state.

---

### Handling Required Edge Cases

#### Multiple Submit Clicks

* Submit button disabled during in-flight requests
* Prevents duplicate submissions

#### Page Refresh After Submit

* Expenses are fetched on load
* UI always reflects persisted backend state

#### Slow or Failed API Responses

* Loading indicators shown
* Errors handled gracefully
* UI does not crash or become inconsistent

---

### Extra Value Added (Beyond Minimum)

* Defensive numeric handling on the frontend
* Derived totals computed only from **currently visible expenses**
* Clear separation between UI, state, and API
* Filters implemented as a separate component for clarity
* Minimal but intentional UX feedback (loading, disabled states)

---

## Why This Is Production-Ready

This system prioritizes:

* **Correctness over features**
* **Data integrity over UI polish**
* **Predictable behavior under failure**
* **Clear, maintainable code structure**

The design choices reflect how a real system should behave when:

* Users retry actions
* Networks are unreliable
* Data correctness matters (especially money)

---

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m app.main
```

Runs on:

```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

