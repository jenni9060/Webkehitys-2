import { useState } from 'react';

function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [thankYouMessage, setThankYouMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name) {
            setThankYouMessage(`Kiitos ilmoittautumisesta, ${name}!`);
        } else {
            setThankYouMessage("Kiitos ilmoittautumisesta!");
        }

        setName('');
        setEmail('');
        setMessage('');
    };

  return (
    <section id="signUp">
      <h2>Ilmoittaudu</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nimi:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Sähköposti:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="message">Viesti:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit">Lähetä</button>
      </form>
      {thankYouMessage && <p style={{ color: 'green' }}>{thankYouMessage}</p>}
    </section>
  );
}

export default SignUp;