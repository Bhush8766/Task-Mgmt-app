import React, { useEffect, useState } from "react";
import {
  getProfileAPI,
  updateProfileAPI,
  changePasswordAPI,
} from "../api/userAPI";

import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [passwordMode, setPasswordMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    imgPath: null,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await getProfileAPI();

      setUser(res.loggedUser);

      setFormData({
        name: res.loggedUser.name,
        email: res.loggedUser.email,
        contactNumber: res.loggedUser.contactNumber,
        imgPath: null,
      });
    } catch (err) {
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imgPath") {
      setFormData({
        ...formData,
        imgPath: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("contactNumber", formData.contactNumber);

      if (formData.imgPath) {
        data.append("imgPath", formData.imgPath);
      }

      const res = await updateProfileAPI(data);

      toast.success(res.msg);

      setEditMode(false);

      fetchProfile();

    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Update Failed"
      );
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await changePasswordAPI({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success(res.msg);

      setPasswordMode(false);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Password Change Failed"
      );
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-body">

          <div className="text-center">

            <img
  src={
    user.imgPath
      ? user.imgPath.startsWith("http")
        ? user.imgPath
        : `http://localhost:7005${user.imgPath}`
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  alt="Profile"
  className="rounded-circle"
  width={150}
  height={150}
/>

            <h3 className="mt-3">{user.name}</h3>

            <p>{user.email}</p>

          </div>

          <hr />

          <table className="table">

            <tbody>

              <tr>

                <th>Name</th>

                <td>{user.name}</td>

              </tr>

              <tr>

                <th>Email</th>

                <td>{user.email}</td>

              </tr>

              <tr>

                <th>Contact</th>

                <td>{user.contactNumber}</td>

              </tr>

              <tr>

                <th>Role</th>

                <td>{user.role}</td>

              </tr>

            </tbody>

          </table>

          <div className="d-flex gap-3">

            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>

            <button
              className="btn btn-warning"
              onClick={() => setPasswordMode(true)}
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}

      {editMode && (

        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(0,0,0,.5)",
          }}
        >
          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">

                <h5>Edit Profile</h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setEditMode(false)
                  }
                ></button>

              </div>

              <form onSubmit={handleUpdateProfile}>

                <div className="modal-body">

                  <input
                    className="form-control mb-3"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />

                  <input
                    className="form-control mb-3"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />

                  <input
                    className="form-control mb-3"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Contact"
                  />

                  <input
                    type="file"
                    className="form-control"
                    name="imgPath"
                    onChange={handleChange}
                  />

                </div>

                <div className="modal-footer">

                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() =>
                      setEditMode(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-success"
                    type="submit"
                  >
                    Save
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

      {/* Password Modal */}

      {passwordMode && (

        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(0,0,0,.5)",
          }}
        >
          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">

                <h5>Change Password</h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setPasswordMode(false)
                  }
                ></button>

              </div>

              <form onSubmit={handlePassword}>

                <div className="modal-body">

                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Old Password"
                    value={
                      passwordData.oldPassword
                    }
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="New Password"
                    value={
                      passwordData.newPassword
                    }
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={
                      passwordData.confirmPassword
                    }
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="modal-footer">

                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() =>
                      setPasswordMode(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-success"
                    type="submit"
                  >
                    Update Password
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Profile;