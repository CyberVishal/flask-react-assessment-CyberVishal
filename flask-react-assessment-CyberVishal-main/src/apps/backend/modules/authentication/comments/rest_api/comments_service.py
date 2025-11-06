comments = []  # temporary list to store comments
comment_id = 1

def get_all_comments():
    return comments

def add_comment(data):
    global comment_id
    comment = {"id": comment_id, "text": data.get("text")}
    comments.append(comment)
    comment_id += 1
    return comment

def update_comment(comment_id, new_data):
    for c in comments:
        if c["id"] == comment_id:
            c["text"] = new_data.get("text", c["text"])
            return c
    return None

def delete_comment(comment_id):
    global comments
    comments = [c for c in comments if c["id"] != comment_id]
    return True
