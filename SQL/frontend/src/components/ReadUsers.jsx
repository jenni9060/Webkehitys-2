import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ReadUsers({ users, error }) {
  return (
    <div className="container mt-5">
      <h2>Käyttäjälista</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Kaupunki</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
