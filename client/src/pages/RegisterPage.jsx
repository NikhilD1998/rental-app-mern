import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  console.log(formData);

  const [passwordMatch, setPasswrodMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPasswrodMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div>
      <div className="register">
        <div className="register_content">
          <form className="register_content_form" onSubmit={handleSubmit}>
            <input
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {!passwordMatch && (
              <p style={{ color: "red" }}>
                Passwords do not match. Please try again.
              </p>
            )}
            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              required
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <img src="/assets/addImage.png" alt="add prfile photo" />
              <p>Upload profile photo</p>
            </label>

            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile photo"
                style={{ maxWidth: "80px", maxHeight: "80px" }}
              />
            )}
            <button type="submit" disabled={!passwordMatch}>
              Register
            </button>
          </form>
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
