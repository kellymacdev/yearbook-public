## Overview

**Yearbook** is a full-stack Django project that functions as a digital yearbook platform.  
It showcases graduate information, including names, photos, and other details stored in a SQL database, initialized directly from a local CSV file. 
The app supports user authentication, an administrative backend, and deployment via Render.

![Screenshot 2025-10-20 at 15 21 47](https://github.com/user-attachments/assets/5623e046-df0f-44c8-9746-5df7cb459d81)



---

## Tech Stack

| Component | Technology |
|------------|-------------|
| **Backend** | Django 5.x (Python 3.11) |
| **Database** | PostgreSQL |
| **Frontend** | HTML, CSS (responsive layout) |
| **Deployment** | Render (Gunicorn + PostgreSQL) |

------------------
## Installation & Setup

### Run Locally
```bash
git clone https://github.com/kellymacdev/TWCYearbook.git
cd TWCYearbook

python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations, import data and start the server
python manage.py migrate
python manage.py import_google_sheet
python manage.py runserver
```

### Deployment

This repository includes Render configuration files (build.sh, render.yaml) for automated deployment.
Provision a PostgreSQL instance on Render, set the DATABASE_URL environment variable, and the app will deploy directly from the GitHub repository.

-----------------------

## Project Structure
```
Yearbook/
├── network/              # Core Django app
│   ├── models.py         # Data models (Graduates, Users)
│   ├── views.py          # Application logic
│   ├── templates/        # HTML templates
│   └── static/           # CSS, images
├── data/
    ├── graduates.csv     # Data source for population        
├── manage.py
├── build.sh
├── render.yaml
├── requirements.txt
└── README.md
