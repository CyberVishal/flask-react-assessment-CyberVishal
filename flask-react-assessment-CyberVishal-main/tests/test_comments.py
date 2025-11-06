import json

def test_add_comment(client):
    response = client.post("/api/comments/", json={"text": "Test comment"})
    assert response.status_code == 201
    data = response.get_json()
    assert data["text"] == "Test comment"

def test_get_comments(client):
    response = client.get("/api/comments/")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)

def test_update_comment(client):
    client.post("/api/comments/", json={"text": "Old"})
    response = client.put("/api/comments/1", json={"text": "New"})
    assert response.status_code == 200
    data = response.get_json()
    assert data["text"] == "New"

def test_delete_comment(client):
    client.post("/api/comments/", json={"text": "To delete"})
    response = client.delete("/api/comments/1")
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Deleted"
