import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaSearch,
  FaEye,
} from "react-icons/fa";

import { getAllUsersAPI } from "../api/userAPI";
import UserModal from "../components/UserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsersAPI();

      setUsers(res.allUsers || []);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter === "All" || user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLast = currentPage * usersPerPage;

  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalAdmins = users.filter(
    (u) => u.role === "admin"
  ).length;

  const totalNormalUsers = users.filter(
    (u) => u.role === "user"
  ).length;

  return (
    <div className="container-fluid">

      {/* Heading */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Users Management
          </h2>

          <p className="text-muted mb-0">
            Manage all registered users
          </p>
        </div>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6>Total Users</h6>

                  <h3>{users.length}</h3>

                </div>

                <FaUsers
                  size={40}
                  className="text-primary"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6>Admins</h6>

                  <h3>{totalAdmins}</h3>

                </div>

                <FaUserShield
                  size={40}
                  className="text-success"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6>Users</h6>

                  <h3>{totalNormalUsers}</h3>

                </div>

                <FaUser
                  size={40}
                  className="text-warning"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="row mb-4">

        <div className="col-md-6">

          <div className="input-group">

            <span className="input-group-text">

              <FaSearch />

            </span>

            <input
              className="form-control"
              placeholder="Search by name/email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        <div className="col-md-3">

          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
          >
            <option value="All">
              All Roles
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="user">
              User
            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>#</th>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Contact</th>

                  <th>Role</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      Loading...
                    </td>

                  </tr>

                ) : currentUsers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      No Users Found
                    </td>

                  </tr>

                ) : (

                  currentUsers.map((user, index) => (

                    <tr key={user.id}>

                      <td>
                        {indexOfFirst + index + 1}
                      </td>

                      <td>

                        <img
                          src={
                            user.imgPath
                              ? `http://localhost:7005${user.imgPath}`
                              : "https://via.placeholder.com/45"
                          }
                          alt=""
                          width="45"
                          height="45"
                          className="rounded-circle"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                        {user.contactNumber}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "bg-success"
                              : "bg-primary"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                        >
                          <FaEye />
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* Pagination */}

          {totalPages > 1 && (

            <nav>

              <ul className="pagination justify-content-end">

                <li
                  className={`page-item ${
                    currentPage === 1
                      ? "disabled"
                      : ""
                  }`}
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(
                        currentPage - 1
                      )
                    }
                  >
                    Previous
                  </button>

                </li>

                {Array.from(
                  { length: totalPages },
                  (_, i) => (

                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1
                          ? "active"
                          : ""
                      }`}
                    >

                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage(i + 1)
                        }
                      >
                        {i + 1}
                      </button>

                    </li>

                  )
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPages
                      ? "disabled"
                      : ""
                  }`}
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                  >
                    Next
                  </button>

                </li>

              </ul>

            </nav>

          )}

        </div>

      </div>

      <UserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        user={selectedUser}
      />

    </div>
  );
};

export default Users;