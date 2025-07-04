import React, { useState } from 'react';

function UserForm() {
  const [ism, setIsm] = useState('');
  const [familya, setFamilya] = useState('');
  const [telefon, setTelefon] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ism, familya, telefon }),
    });
    setIsm('');
    setFamilya('');
    setTelefon('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ism"
        value={ism}
        onChange={e => setIsm(e.target.value)}
      />
      <button type="button" onClick={() => setIsm('')}>Tozalash</button>
      <br />
      <input
        type="text"
        placeholder="Familya"
        value={familya}
        onChange={e => setFamilya(e.target.value)}
      />
      <button type="button" onClick={() => setFamilya('')}>Tozalash</button>
      <br />
      <input
        type="text"
        placeholder="Telefon"
        value={telefon}
        onChange={e => setTelefon(e.target.value)}
      />
      <button type="button" onClick={() => setTelefon('')}>Tozalash</button>
      <br />
      <button type="submit">Saqlash</button>
    </form>
  );
}

export default UserForm;