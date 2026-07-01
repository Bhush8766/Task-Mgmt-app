import { useEffect, useState } from "react";
import {
  getTasksByUSer,
  updateTaskStatus,
} from "../../api/taskAPI";
import { toast } from "react-toastify";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  //for srch
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  //feth function=================
  const fetchTasks = async () => {
    try {
      const res = await getTasksByUSer()
      setTasks(res.getTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Dashboard Loaded");
    fetchTasks();
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  //handle status
  const handleUpdateStatus = async () => {
    try {
      await updateTaskStatus(
        selectedTask.taskID,
        selectedStatus
      );

      toast.success("Status Updated Successfully");

      fetchTasks();

      setShowModal(false);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.msg ||
        "Failed to Update Status"
      );
    }
  };

  //for srch to filter tasks
  const filteredTasks = [...tasks]
    .filter((task) => {
      const matchesSearch =
        task.Task?.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.Task?.description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.Task?.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return new Date(b.Task.createdAt) - new Date(a.Task.createdAt);

        case "Oldest":
          return new Date(a.Task.createdAt) - new Date(b.Task.createdAt);

        case "A-Z":
          return a.Task.title.localeCompare(b.Task.title);

        case "Z-A":
          return b.Task.title.localeCompare(a.Task.title);

        case "Start Date":
          return new Date(a.Task.startDate) - new Date(b.Task.startDate);

        case "End Date":
          return new Date(a.Task.endDate) - new Date(b.Task.endDate);

        default:
          return 0;
      }
    });
  //pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;

  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <div>
            <h1 className="fw-bold mb-1">My Tasks</h1>
            <p className="text-muted mb-0">View all tasks assigned to you</p>
          </div>

          <div className="card shadow-sm border-0 px-4 py-2">
            <h6 className="text-muted mb-1">Total Tasks</h6>
            <h3 className="mb-0">{filteredTasks.length}</h3>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-6">
            {/* Search */}
            <div className="col-lg-8">
              <div
                className="input-group shadow-sm"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <span className="input-group-text bg-white border-end-0">
                  🔍
                </span>

                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by Task Title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            {/* Status */}

            <div className="col-lg-4">
              <div
                className="shadow-sm"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <select
                  className="form-select border-0 p-0"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    height: "35px",
                  }}
                >
                  <option value="All">📌 All Status</option>

                  <option value="Pending">⏳ Pending</option>

                  <option value="Inprogress">🚧 In Progress</option>

                  <option value="Completed">✅ Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div
              className="shadow-sm"
              style={{
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <select
                className="form-select border-0"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  height: "54px",
                }}
              >
                <option value="Newest">🆕 Newest First</option>

                <option value="Oldest">📜 Oldest First</option>

                <option value="A-Z">🔤 Title (A-Z)</option>

                <option value="Z-A">🔠 Title (Z-A)</option>

                <option value="Start Date">📅 Start Date</option>

                <option value="End Date">📆 End Date</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 ">
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.length > 0 ? (
                  currentTasks.map((task) => (
                    <tr
                      key={task.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedTask(task);
                        setSelectedStatus(task.Task?.status);
                        setShowModal(true);
                      }}
                    >
                      <td>{task.id}</td>

                      <td className="fw-semibold ">{task.Task.title}</td>

                      <td>{task.Task.description}</td>

                      <td>
                        <span
                          className={`badge ${task.Task?.status === "Completed"
                              ? "bg-success"
                              : task.Task?.status === "Inprogress"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                        >
                          {task.Task?.status}
                        </span>
                      </td>

                      <td>{task.Task.startDate}</td>

                      <td>{task.Task.endDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <>
                        <h5 className="text-muted">No Tasks Found</h5>

                        <p className="mb-0 text-secondary">
                          Try another search or status filter.
                        </p>
                      </>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {showModal && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update Task Status</h5>

                      <button
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>

                    <div className="modal-body text-center">
                      <div className="mb-4">
                        <h4 className="fw-bold">
                          {selectedTask?.Task?.title}
                        </h4>

                        <p className="text-muted">
                          {selectedTask?.Task?.description}
                        </p>
                      </div>

                      <div className="card border-0 bg-light p-3">
                        <h6 className="mb-3">Change Task Status</h6>

                        <select
                          className="form-select form-select-lg"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Inprogress">Inprogress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>

                      <button
                        className="btn btn-warning"
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* pagination=============================================================== */}
            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
              <small className="text-muted">
                Showing {filteredTasks.length === 0 ? 0 : indexOfFirstTask + 1}
                {" - "}
                {Math.min(indexOfLastTask, filteredTasks.length)}
                {" of "}
                {filteredTasks.length} Tasks
              </small>

              <nav>
                <ul className="pagination mb-0">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""
                        }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${currentPage === totalPages || totalPages === 0
                        ? "disabled"
                        : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTasks;