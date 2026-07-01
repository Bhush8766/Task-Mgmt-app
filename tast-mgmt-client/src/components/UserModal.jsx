import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

const UserModal = ({ show, handleClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          User Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div className="row">

          {/* Profile Image */}

          <div className="col-md-4 text-center">

            <img
              src={
                user.imgPath
                  ? `http://localhost:7005${user.imgPath}`
                  : "https://via.placeholder.com/180"
              }
              alt="Profile"
              className="rounded-circle shadow"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <h4 className="mt-3 fw-bold">
              {user.name}
            </h4>

            <Badge
              bg={
                user.role === "admin"
                  ? "success"
                  : "primary"
              }
              className="px-3 py-2 mt-2"
            >
              {user.role.toUpperCase()}
            </Badge>

          </div>

          {/* User Details */}

          <div className="col-md-8">

            <div className="card border-0 shadow-sm">

              <div className="card-body">

                <h5 className="mb-4">
                  Personal Information
                </h5>

                <div className="mb-3">

                  <FaUser
                    className="me-2 text-primary"
                  />

                  <strong>Name</strong>

                  <p className="mb-0 mt-1">
                    {user.name}
                  </p>

                </div>

                <hr />

                <div className="mb-3">

                  <FaEnvelope
                    className="me-2 text-danger"
                  />

                  <strong>Email</strong>

                  <p className="mb-0 mt-1">
                    {user.email}
                  </p>

                </div>

                <hr />

                <div className="mb-3">

                  <FaPhone
                    className="me-2 text-success"
                  />

                  <strong>Contact Number</strong>

                  <p className="mb-0 mt-1">
                    {user.contactNumber}
                  </p>

                </div>

                <hr />

                <div className="mb-3">

                  <FaUserShield
                    className="me-2 text-warning"
                  />

                  <strong>Role</strong>

                  <p className="mb-0 mt-1">
                    {user.role}
                  </p>

                </div>

                <hr />

                <div>

                  <FaCalendarAlt
                    className="me-2 text-secondary"
                  />

                  <strong>Registered On</strong>

                  <p className="mb-0 mt-1">
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;