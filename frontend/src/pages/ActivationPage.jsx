import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server.js";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          // Wrap the token in an object with the correct key
          const res = await axios.post(
            `${server}/user/activation`,
            { activation_Token: activation_token } // Correctly pass the token
          );
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response?.data?.message || "An error occurred");
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
