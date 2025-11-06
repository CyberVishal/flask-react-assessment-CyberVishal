from flask import Blueprint, request, jsonify
from modules.comments.rest_api.comments_service import (
    get_all_comments,
    add_comment,
    update_comment,
    delete_comment,
)

class CommentRestApiServer:
    @staticmethod
    def create():
        comment_bp = Blueprint("comment_bp", __name__, url_prefix="/api/comments")

        @comment_bp.route("/", methods=["GET"])
        def get_comments():
            return jsonify(get_all_comments()), 200

        @comment_bp.route("/", methods=["POST"])
        def create_comment():
            data = request.json
            new_comment = add_comment(data)
            return jsonify(new_comment), 201

        @comment_bp.route("/<int:comment_id>", methods=["PUT"])
        def edit_comment(comment_id):
            data = request.json
            updated = update_comment(comment_id, data)
            if updated:
                return jsonify(updated), 200
            return jsonify({"message": "Not Found"}), 404

        @comment_bp.route("/<int:comment_id>", methods=["DELETE"])
        def remove_comment(comment_id):
            delete_comment(comment_id)
            return jsonify({"message": "Deleted"}), 200

        return comment_bp
