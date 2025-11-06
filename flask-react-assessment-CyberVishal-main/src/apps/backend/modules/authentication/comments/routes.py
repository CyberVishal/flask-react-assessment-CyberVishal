from flask import Blueprint, jsonify, request
from .models import db, Comment

comments_bp = Blueprint("comments", __name__)

@comments_bp.route("/", methods=["POST"])
def create_comment():
    data = request.get_json() or {}
    if "task_id" not in data or "content" not in data:
        return jsonify({"error": "task_id and content required"}), 400
    comment = Comment(task_id=data["task_id"], content=data["content"])
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@comments_bp.route("/task/<int:task_id>", methods=["GET"])
def get_comments(task_id):
    comments = Comment.query.filter_by(task_id=task_id).order_by(Comment.created_at).all()
    return jsonify([c.to_dict() for c in comments]), 200

@comments_bp.route("/<int:comment_id>", methods=["PUT"])
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.get_json() or {}
    if "content" not in data:
        return jsonify({"error": "content required"}), 400
    comment.content = data["content"]
    db.session.commit()
    return jsonify(comment.to_dict()), 200

@comments_bp.route("/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"}), 200

