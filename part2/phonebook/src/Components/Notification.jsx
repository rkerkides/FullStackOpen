import React from "react";

const Notification = ({ message, isSuccessful }) => {
  const successfulStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const unsuccessfulStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  if (isSuccessful) {
    return (
      <div style={successfulStyle} className="notification">
        {message}
      </div>
    );
  } else {
    return (
      <div style={unsuccessfulStyle} className="error">
        {message}
      </div>
    );
  }
};

export default Notification;
