import { useState, useEffect } from "react";

export default function UserProfile({ showProfileModal, closeProfileModal }) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  
  // Fetch user details
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
      // console.log(data);

      // Try different ways to check for success
      if (data.success === true || data.user || data.name || data.email) {
        // If success is true OR if we have user data directly
        const userData = data.user || data;
        // console.log(userData);
        setUserDetails(userData);
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      // console.error("Error fetching user:", error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  

  // Fetch user data when modal opens
  useEffect(() => {
    if (showProfileModal && localStorage.getItem("token")) {
      // Always fetch fresh data when modal opens
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
      <div className="profile-modal-content">
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
          <button className="btn btn-secondary" onClick={closeProfileModal}>
            Close
          </button>
          {/* <button className="btn btn-danger">
            <i className="ri-delete-bin-fill" ></i>Delete Account
          </button> */}
        </div>
      </div>
    </div>
  );
}
