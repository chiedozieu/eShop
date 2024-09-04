
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server.js";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${server}/shop/activation`,
            { activation_token } // Consistent key name
          );
          console.log(res.data.message);
        } catch (error) {
          console.log(error?.response?.data?.message || "An error occurred");
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {error ? (
        <p>Your token is expired or invalid!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default SellerActivationPage;




