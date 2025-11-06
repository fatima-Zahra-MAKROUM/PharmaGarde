import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/test-db') // notre route backend
      .then((res) => {
        if (!res.ok) throw new Error('Erreur backend');
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test React + Node + PostgreSQL</h1>
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default App;
