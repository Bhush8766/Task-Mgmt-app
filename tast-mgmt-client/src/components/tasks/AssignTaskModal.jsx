import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { assignTaskToUserAPI } from "../../api/assignTask";

const AssignTaskModal = ({
  show,
  handleClose,
  task,
  users,
  refreshTasks,
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      setSelectedUser("");
    }
  }, [show]);

  const handleAssignTask = async () => {
    if (!task) {
      return toast.error("Task not found");
    }

    if (!selectedUser) {
      return toast.error("Please select a user");
    }

    try {
      setLoading(true);

      const payload = {
        taskID: task.id,
        userID: Number(selectedUser),
      };

      const res = await assignTaskToUserAPI(payload);

      toast.success(res.msg);

      setSelectedUser("");

      if (refreshTasks) {
        refreshTasks();
      }

      handleClose();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.msg || "Failed to assign task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Assign Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Task
          </label>

          <input
            type="text"
            className="form-control"
            value={task?.title || ""}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Select User
          </label>

          <select
            className="form-select"
            value={selectedUser}
            onChange={(e) =>
              setSelectedUser(e.target.value)
            }
          >
            <option value="">Select User</option>

            {users &&
              users.length > 0 &&
              users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name} ({user.email})
                </option>
              ))}
          </select>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={loading}
        >
          Close
        </Button>

        <Button
          variant="primary"
          onClick={handleAssignTask}
          disabled={!selectedUser || loading}
        >
          {loading ? "Assigning..." : "Assign Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignTaskModal;