# Simple Blog Application via Python/Flask and React.js

## Setting up a local build

### Clone Repository

Clone the repositry on local machine:

```bash
git clone https://github.com/cool-guru/flask-blog.git
```

### Run the backend project

Go to the backend project

```bash
cd cd flask-blog/blog-app/
```


Setup Flask and SQLite if you are not installed yet 

```bash
sudo apt install python3 python3-pip python3-venv sqlite3 -y
```

Setup Flask Project

```bash
python3 -m venv venv
source venv/bin/activate
```

Install Flask dependencies:
```bash
pip install flask flask-cors flask-sqlalchemy gunicorn
```
Run Flask API
```bash
python app.py
```
You can run using gunicorn(I recommend you to use gunicorn command instead of `python app.py` command:
```bash
gunicorn --bind 0.0.0.0:5000 app:app
```

Then you can check that Flask API is hosted on `http://localhost:5000`

### Run the React Blog Project

Make sure that you already installed Node.js.

Go to the React project:
```bash
cd blog-app
```

Install dependencies:
```bash
npm install
```

Run the project on local machine:
```bash
npm start
```

Now, visit the `http://localhost:3000` to check the result.

Thanks,

Carlo
