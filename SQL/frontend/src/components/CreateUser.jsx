import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateUser({ setUsers }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Käytetään viestin tyypille (onnistuminen / virhe)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        age,
        city,
        color,
      });

      setUsers((prevUsers) => [
        ...prevUsers,
        { id: response.data.id, name, age, city, color },
      ]);

      setMessage("Käyttäjä luotu onnistuneesti: " + response.data.name);
      setMessageType("success"); // Onnistumisen viesti
      setName("");
      setAge("");
      setCity("");
      setColor("");
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.error || error.message));
      setMessageType("error"); // Virheviesti
    }
  };

  return (
    <div className="container mt-5">
      <h2>Luo käyttäjä</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group mb-3">
          <label htmlFor="name">Nimi</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nimi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Ikä</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Ikä"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="city">Kaupunki</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Kaupunki"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="color">Lempiväri</label>
          <input
            type="text"
            className="form-control"
            id="color"
            placeholder="Lempiväri"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mb-3">Rekisteröidy</button>
      </form>
      {message && (
        <p className={`mt-3 ${messageType === 'success' ? 'text-success' : 'text-danger'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
