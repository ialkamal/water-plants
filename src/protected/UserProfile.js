import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const initialCredentials = {
    username: "",
    phoneNumber: "",
    password: "",
    id: "",
  };
  const [userProfile, setUserProfile] = useState(initialCredentials);

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

export default UserProfile;
