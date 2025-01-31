from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    if not data.get('title') or not data.get('content'):
        return jsonify({"error": "Title and content are required"}), 400

    new_post = Post(title=data['title'], content=data['content'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created successfully"}), 201

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{"id": p.id, "title": p.title, "content": p.content} for p in posts])

@app.route('/api/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"id": post.id, "title": post.title, "content": post.content})

@app.route('/api/posts/<int:id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    
    data = request.json
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    
    return jsonify({"message": "Post updated successfully"})

@app.route('/api/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
