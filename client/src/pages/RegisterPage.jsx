import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <div className="regsiter">
        <div className="register__content">
          <form>
            <input placeholder="First Name" name="firstname" required />
            <input placeholder="Last Name" name="lastname" required />
            <input placeholder="Email" name="email" required />
            <input
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <input
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              required
            />
            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              required
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <img src="/assets/addImage.png" alt="add prfile photo" />
              <p>Upload profile photo</p>
            </label>
            <button type="submit">Register</button>
          </form>
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
