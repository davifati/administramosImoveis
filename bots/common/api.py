from flask import Flask, send_from_directory
import os
import uuid

app = Flask(__name__)

BASE_DIR = os.getcwd()
PERMANENT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../permanent_files")
PERMANENT_FOLDER = os.path.abspath(PERMANENT_FOLDER)

@app.route('/files/<path:filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_from_directory(PERMANENT_FOLDER, filename, as_attachment=False)

    except FileNotFoundError:
        return {"error": "File not found"}, 404
 
@app.route('/')
def index():
    return {"message": "File server is running"}

def generate_file_link(filename):
    base_url = "http://212.56.42.99:5000/files"
    return f"{base_url}/{filename}"

def move_to_permanent_folder(src_file):
    if not os.path.exists(PERMANENT_FOLDER):
        os.makedirs(PERMANENT_FOLDER)

    original_filename = os.path.basename(src_file)
    name, ext = os.path.splitext(original_filename)

    unique_id = uuid.uuid4().hex

    unique_filename = f"{name}_{unique_id}{ext}"
    dest_file = os.path.join(PERMANENT_FOLDER, unique_filename)

    os.rename(src_file, dest_file)
    return dest_file

@app.route('/list_files', methods=['GET'])
def list_files():
    return {"files": os.listdir(PERMANENT_FOLDER)}

print(f"PERMANENT_FOLDER: {PERMANENT_FOLDER}")
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

