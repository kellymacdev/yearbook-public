## Overview

**Yearbook** is a full-stack Django project that functions as a digital yearbook platform.  
It showcases individual graduate information, including names, photos, and answers to other questions details stored in a SQL database, initialized directly from a local CSV file. Additionally, it features a summary page for stats on the graduate class and a In Memoriam page containing messages submitted by graduates in memory of a graduate who has passed. 
The app supports qualified user registration and authentication, an administrative backend, and deployment via Render. To access the current site, visit [Yearbook](https://yearbook-public.onrender.com/), register an account and use the invite code 0000. 

<img width="2812" height="1318" alt="image" src="https://github.com/user-attachments/assets/47760798-5923-420c-85a3-20c034986745" />
<img width="2788" height="1540" alt="image" src="https://github.com/user-attachments/assets/c89a1e21-4ca8-4215-bffc-760ab7cb1bd8" />



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


-----------------------

## Project Structure
```
Yearbook/
├── network/              # Core Django app
│   ├── models.py         # Data models (Graduates, Users)
│   ├── views.py          # Application logic
│   ├── templates/        # HTML templates
│   ├── management/       # python file 
│   └── static/           # CSS, images

├── data/
    ├── graduates.csv     # Data source for population        
├── manage.py
├── build.sh
├── render.yaml
├── requirements.txt
└── README.md
