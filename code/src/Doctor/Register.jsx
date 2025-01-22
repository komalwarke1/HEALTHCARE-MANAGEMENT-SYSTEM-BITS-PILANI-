import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    specialization: "",
    experience: "",
    clinic: "",
    email: "",
    password: "",
    contactNumber: "",
    qualification: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
    console.log("Form Data Submitted:", formData);
    setFormData({
      name: "",
      gender: "",
      specialization: "",
      experience: "",
      clinic: "",
      email: "",
      password: "",
      contactNumber: "",
      qualification: "",
      bio: "",
    });
    navigate('/Doctorlogin')

  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Doctor Registration</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            {/* Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter full name"
                required
              />
            </div>
            {/* Gender */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div style={styles.row}>
            {/* Specialization */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., Cardiologist"
                required
              />
            </div>
            {/* Experience */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                style={styles.input}
                placeholder="Years of experience"
                required
              />
            </div>
          </div>
          <div style={styles.row}>
            {/* Clinic */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nearby Clinic</label>
              <input
                type="text"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                style={styles.input}
                placeholder="Clinic or hospital name"
                required
              />
            </div>
            {/* Contact Number */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>
          <div style={styles.row}>
            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter email"
                required
              />
            </div>
            {/* Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <div style={styles.row}>
            {/* Qualification */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g., MBBS, MD"
              />
            </div>
          </div>
          <div style={styles.row}>
            {/* Bio */}
            <div style={styles.inputGroupFullWidth}>
              <label style={styles.label}>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#e3f2fd",
  },
  card: {
    width: "90%",
    maxWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "30px 20px",
  },
  heading: {
    textAlign: "center",
    color: "#1565c0",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: {
    display: "flex",
    gap: "20px",
  },
  inputGroup: {
    flex: "1",
  },
  inputGroupFullWidth: {
    width: "100%",
  },
  label: {
    fontSize: "14px",
    color: "#1565c0",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #90caf9",
    borderRadius: "8px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    border: "1px solid #90caf9",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#1e88e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
};

export default Register;
