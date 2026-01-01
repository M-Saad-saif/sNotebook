import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile({
  showProfileModal,
  closeProfileModal,
  showAlert,
}) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // Separate loading for delete
  const navigate = useNavigate();

  // Fetch user details to show in profile
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setUserDetails(null);
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success === true || data.user || data.name || data.email) {
        const userData = data.user || data;
        setUserDetails(userData);
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAcc = async () => {
    // Get password from user
    const password = prompt("Enter your password to confirm account deletion:");

    if (!password) {
      if (showAlert) showAlert("Password is required", "warning");
      return;
    }

    // Confirm deletion
    const isConfirmed = window.confirm(
      "WARNING: This will permanently delete your account and all your notes!\n\nThis action cannot be undone. Are you sure?"
    );

    if (!isConfirmed) {
      if (showAlert) showAlert("Account deletion cancelled", "info");
      return;
    }

    setDeleteLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        if (showAlert) showAlert("You need to be logged in", "danger");
        setDeleteLoading(false);
        return;
      }

      console.log(
        "Sending DELETE request to:",
        `${API_URL}/api/auth/deleteuser`
      );
      console.log("Token exists:", !!token);
      console.log("Password entered:", password);

      const response = await fetch(`${API_URL}/api/auth/deleteuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ password }), // Send password in body
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // Get the response text first
      const responseText = await response.text();
      console.log("Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed response data:", data);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        console.log("Raw response:", responseText);
        throw new Error("Server returned invalid JSON");
      }
      // const data = await response.json();

      console.log("Delete response status:", response.status);
      console.log("Delete response data:", data);

      if (data.success) {
        if (showAlert) showAlert("Account deleted successfully", "success");

        // Clear localStorage
        localStorage.clear();

        // Close modal
        closeProfileModal();

        // Redirect to signup
        navigate("/signup");
      } else {
        if (showAlert)
          showAlert(data.error || "Failed to delete account", "danger");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      if (showAlert) showAlert("Network error. Please try again.", "danger");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Fetch user data when modal opens
  useEffect(() => {
    if (showProfileModal && localStorage.getItem("token")) {
      setUserDetails(null);
      fetchUserDetails();
    }
    // eslint-disable-next-line
  }, [showProfileModal]);

  // Don't render anything if modal is not open
  if (!showProfileModal) return null;

  return (
    <div
      className={`profile-modal-backdrop ${showProfileModal ? "show" : ""}`}
      onClick={closeProfileModal}
    >
      <div
        className="profile-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-modal-header">
          <h5>
            <i className="fa-solid fa-user-circle me-2"></i>
            User Profile
          </h5>
          <button className="profile-modal-close" onClick={closeProfileModal}>
            &times;
          </button>
        </div>

        <div className="profile-modal-body">
          {loading ? (
            <div className="profile-loading">
              <div className="spinner"></div>
              <p>Loading profile...</p>
            </div>
          ) : userDetails ? (
            <div className="user-details">
              <div className="user-avatar">
                <i className="fa-solid fa-user fa-3x"></i>
              </div>

              <div className="user-info">
                <div className="info-row">
                  <span className="info-label">Username:</span>
                  <span className="info-value">
                    {userDetails.name || "Not set"}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{userDetails.email}</span>
                </div>

                <div className="info-row">
                  <span className="info-label">User ID:</span>
                  <span className="info-value truncated-id">
                    {userDetails._id?.substring(0, 20)}...
                  </span>
                </div>

                {userDetails.date && (
                  <div className="info-row">
                    <span className="info-label">Joined:</span>
                    <span className="info-value">
                      {new Date(userDetails.date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="profile-error">
              <i className="fa-solid fa-exclamation-triangle"></i>
              <p>Failed to load user details</p>
            </div>
          )}
        </div>

        <div className="profile-modal-footer">
          <button
            className="btn btn-secondary"
            onClick={closeProfileModal}
            disabled={deleteLoading}
          >
            Close
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteAcc}
            disabled={deleteLoading || loading}
          >
            {deleteLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="ri-delete-bin-fill me-2"></i>
                Delete Account
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
