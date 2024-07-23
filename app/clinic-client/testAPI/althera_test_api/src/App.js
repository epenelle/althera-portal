import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [patients, setPatients] = useState(null);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [errorPatients, setErrorPatients] = useState(null);
  const [newPatient, setNewPatient] = useState({ firstName: '', lastName: '', healthInsuranceCard: '', clinicId: '' });
  const [deleteIdPatient, setDeleteIdPatient] = useState('');

  const [commandes, setCommandes] = useState(null);
  const [loadingCommandes, setLoadingCommandes] = useState(true);
  const [errorCommandes, setErrorCommandes] = useState(null);
  const [newCommande, setNewCommande] = useState({ IdPatient: '', dateCommande: '', orthesisModel: '', orthesisInfo: '', orthesisScan: '', orderState: '', orthesisComment: '' });
  const [deleteIdCommande, setDeleteIdCommande] = useState('');

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
        setErrorPatients(error);
      } finally {
        setLoadingPatients(false);
      }
    };

    const fetchCommandes = async () => {
      try {
        const response = await fetch('http://localhost:5125/commande', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setCommandes(json);
      } catch (error) {
        setErrorCommandes(error);
      } finally {
        setLoadingCommandes(false);
      }
    };

    fetchPatients();
    fetchCommandes();
  }, []);

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCommandeInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommande(prevState => ({ ...prevState, [name]: value }));
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
      setNewPatient({ firstName: '', lastName: '', healthInsuranceCard: '', clinicId: '' });
    } catch (error) {
      setErrorPatients(error);
    }
  };

  const createCommande = async () => {
    try {
      const response = await fetch('http://localhost:5125/commande', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCommande)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const createdCommande = await response.json();
      setCommandes(prevState => [...prevState, createdCommande]);
      setNewCommande({ IdPatient: '', dateCommande: '', orthesisModel: '', orthesisInfo: '', orthesisScan: '', orderState: '', orthesisComment: '' });
    } catch (error) {
      setErrorCommandes(error);
    }
  };

  const handleDeletePatientChange = (e) => {
    setDeleteIdPatient(e.target.value);
  };

  const handleDeleteCommandeChange = (e) => {
    setDeleteIdCommande(e.target.value);
  };

  const deletePatient = async () => {
    try {
      const response = await fetch(`http://localhost:5125/patient/${deleteIdPatient}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPatients(prevState => prevState.filter(patient => patient.id !== parseInt(deleteIdPatient, 10)));
      setDeleteIdPatient('');
    } catch (error) {
      setErrorPatients(error);
    }
  };

  const deleteCommande = async () => {
    try {
      const response = await fetch(`http://localhost:5125/commande/${deleteIdCommande}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCommandes(prevState => prevState.filter(commande => commande.id !== parseInt(deleteIdCommande, 10)));
      setDeleteIdCommande('');
    } catch (error) {
      setErrorCommandes(error);
    }
  };

  if (loadingPatients || loadingCommandes) return <p>Loading...</p>;
  if (errorPatients) return <p>Error: {errorPatients.message}</p>;
  if (errorCommandes) return <p>Error: {errorCommandes.message}</p>;

  return (
    <div className="App">
      <div className="patient">
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
            <input type="text" name="firstName" value={newPatient.firstName} onChange={handlePatientInputChange} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={newPatient.lastName} onChange={handlePatientInputChange} />
          </div>
          <div>
            <label>Health Insurance Card:</label>
            <input type="text" name="healthInsuranceCard" value={newPatient.healthInsuranceCard} onChange={handlePatientInputChange} />
          </div>
          <div>
            <label>Clinic ID:</label>
            <input type="text" name="clinicId" value={newPatient.clinicId} onChange={handlePatientInputChange} />
          </div>
          <button type="submit">Add Patient</button>
        </form>
        <h2>Delete Patient</h2>
        <form onSubmit={(e) => { e.preventDefault(); deletePatient(); }}>
          <div>
            <label>ID:</label>
            <input type="text" value={deleteIdPatient} onChange={handleDeletePatientChange} />
          </div>
          <button type="submit">Delete Patient</button>
        </form>
      </div>
      
      <div className="commande">
        <h1>Commandes Data</h1>
        {commandes ? (
          <pre>{JSON.stringify(commandes, null, 2)}</pre>
        ) : (
          <p>No commande data available</p>
        )}
        <h2>Add New Commande</h2>
        <form onSubmit={(e) => { e.preventDefault(); createCommande(); }}>
          <div>
            <label>Id Patient:</label>
            <input type="text" name="IdPatient" value={newCommande.IdPatient} onChange={handleCommandeInputChange} />
          </div>
          <div>
            <label>Date Commande:</label>
            <input type="text" name="dateCommande" value={newCommande.dateCommande} onChange={handleCommandeInputChange} />
          </div>
          <div>
            <label>Orthesis Model:</label>
            <input type="text" name="orthesisModel" value={newCommande.orthesisModel} onChange={handleCommandeInputChange} />
          </div>
          <div>
            <label>Orthesis Info:</label>
            <input type="text" name="orthesisInfo" value={newCommande.orthesisInfo} onChange={handleCommandeInputChange} />
          </div>
          <div>
            <label>Orthesis Scan:</label>
            <input type="text" name="orthesisScan" value={newCommande.orthesisScan} onChange={handleCommandeInputChange} />
          </div>
          <div>
            <label>Order State:</label>
            <input type="text" name="orderState" value={newCommande.orderState} onChange={handleCommandeInputChange} />
          </div>
          <div>
            <label>Orthesis Comment:</label>
            <input type="text" name="orthesisComment" value={newCommande.orthesisComment} onChange={handleCommandeInputChange} />
          </div>
          <button type="submit">Add Commande</button>
        </form>
        <h2>Delete Commande</h2>
        <form onSubmit={(e) => { e.preventDefault(); deleteCommande(); }}>
          <div>
            <label>ID:</label>
            <input type="text" value={deleteIdCommande} onChange={handleDeleteCommandeChange} />
          </div>
          <button type="submit">Delete Commande</button>
        </form>
      </div>
    </div>
  );
}

export default App;
