import React, { useEffect, useState } from 'react';

function App() {
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5125/patient', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setPatients(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading patients: {error.message}</p>;

  return (
    <div className="App">
      <h1>Patients Data</h1>
      {patients ? (
        <pre>{JSON.stringify(patients, null, 2)}</pre>
      ) : (
        <p>No patient data available</p>
      )}
    </div>
  );
}

export default App;
