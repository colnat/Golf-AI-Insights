//import { useState } from 'react'

import './App.css'

function App() {
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "100px",
      border: "1px solid #ccc",
      borderRadius: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontSize: "14px",
      color: "#555",
      display: "block",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "100%",
      boxSizing: "border-box",
    },
    button: {
      padding: "10px 15px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#007BFF",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };
  return (
    <>
       <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input type="text" style={styles.input} placeholder="Enter your first name" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input type="text" style={styles.input} placeholder="Enter your last name" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" style={styles.input} placeholder="Enter your email" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" style={styles.input} placeholder="Enter your password" />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
    </>
  )
}

export default App
