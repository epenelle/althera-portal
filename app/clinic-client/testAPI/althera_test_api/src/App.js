import React, { useEffect, useState } from 'react';

function App() {
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPatient, setNewPatient] = useState({ firstName: '', lastName: '' });
  const [deleteId, setDeleteId] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({ ...prevState, [name]: value }));
  };

  const createPatient = async () => {
    try {
      const response = await fetch('http://localhost:5125/patient', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPatient)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const createdPatient = await response.json();
      setPatients(prevState => [...prevState, createdPatient]);
      setNewPatient({ firstName: '', lastName: '' });
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteChange = (e) => {
    setDeleteId(e.target.value);
  };

  const deletePatient = async () => {
    try {
      const response = await fetch(`http://localhost:5125/patient/${deleteId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPatients(prevState => prevState.filter(patient => patient.id !== parseInt(deleteId, 10)));
      setDeleteId('');
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Patients Data</h1>
      {patients ? (
        <pre>{JSON.stringify(patients, null, 2)}</pre>
      ) : (
        <p>No patient data available</p>
      )}
      <h2>Add New Patient</h2>
      <form onSubmit={(e) => { e.preventDefault(); createPatient(); }}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={newPatient.firstName} onChange={handleInputChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={newPatient.lastName} onChange={handleInputChange} />
        </div>
        <button type="submit">Add Patient</button>
      </form>
      <h2>Delete Patient</h2>
      <form onSubmit={(e) => { e.preventDefault(); deletePatient(); }}>
        <div>
          <label>ID:</label>
          <input type="text" value={deleteId} onChange={handleDeleteChange} />
        </div>
        <button type="submit">Delete Patient</button>
      </form>
    </div>
  );
}

export default App;
