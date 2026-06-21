import React, { useState } from "react";
import { signup, login,logout  } from "../ApiManager/auth";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
        try {
            const data = await login(formData.email, formData.password);
            console.log("Login successful:", data);
            localStorage.setItem("token", data.token); // Store JWT token in localStorage
            navigate("/dashboard"); // Redirect to products page after successful login
        }
        catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
    }
    } else {
      console.log("SIGNUP DATA:", formData);
         try {
            const data = await signup(formData.name, formData.email, formData.password);
                localStorage.setItem("token", data.token); // Store JWT token in localStorage
            console.log("Signup successful:", data);
                navigate("/dashboard"); // Redirect to products page after successful signup
        }
        catch (error) {
            console.error("Signup failed:", error.response ? error.response.data : error.message);
        }

    }

    // Here you will call your backend API (JWT login/signup)
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={styles.toggleLink}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: "350px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggleText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  toggleLink: {
    color: "blue",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AuthForm;