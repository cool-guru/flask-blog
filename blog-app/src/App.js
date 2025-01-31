import './App.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";

import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    setPosts(response.data);
  };

  const handleSave = async () => {
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { title, content });
      toast.success("Post updated successfully!");
    } else {
      await axios.post(API_URL, { title, content });
      toast.success("Post created successfully!");
    }
    setTitle("");
    setContent("");
    setEditId(null);
    setShowModal(false);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/${deleteId}`);
    toast.error("Post deleted successfully!");
    setShowDeleteModal(false);
    fetchPosts();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Simple Blogging Application</h1>

      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Create New Post
      </button>

      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(post)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(post.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? "Edit Post" : "Create Post"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this post?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(showModal || showDeleteModal) && <div className="modal-backdrop fade show"></div>}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
