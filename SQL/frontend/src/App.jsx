import { useState, useEffect } from "react";
import CreateUser from "./components/CreateUser.jsx";
import ReadUsers from "./components/ReadUsers.jsx";
import axios from "axios";



function App() {
  const [users, setUsers] = useState([]); // Hallitaan käyttäjät täällä
  const [error, setError] = useState("");

  // Haetaan käyttäjät tietokannasta, kun komponentti ladataan
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users: " + (err.response?.data?.error || err.message));
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5">Rekisteröidy</h1>
      <CreateUser setUsers={setUsers} />
      <ReadUsers users={users} error={error} />
    </div>
  );
}

export default App;
