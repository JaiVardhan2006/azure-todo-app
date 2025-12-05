from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder="static", static_url_path="/")

todos = []

@app.route("/api/todos", methods=["GET", "POST"])
def todos_route():
    if request.method == "POST":
        data = request.json or {}
        todos.append(data)
        return jsonify({"status": "ok", "todo": data}), 201
    return jsonify(todos)

# Serve React's index.html for any other route (client-side routing)
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
