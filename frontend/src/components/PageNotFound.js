import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const login = () => {
    navigate('/sign-in');
  };
  return (
    <>
      <div className="error-page">
        <button className="error-page__button" onClick={login}>
          Login
        </button>
      </div>
    </>
  );
}
export { PageNotFound };