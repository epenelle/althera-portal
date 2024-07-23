import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [patients, setPatients] = useState(null);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [errorPatients, setErrorPatients] = useState(null);
  const [newPatient, setNewPatient] = useState({ patientFirstname: '', patientLastname: '', healthInsuranceCard: '', clinicId: '' });
  const [deleteIdPatient, setDeleteIdPatient] = useState('');

  const [orders, setOrders] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);
  const [newOrder, setNewOrder] = useState({ orthesisModel: '', orthesisInfo: '', orthesisScan: '', orderDate: '', orderState: '', orthesisComment: '', patientId: '' });
  const [deleteIdOrder, setDeleteIdOrder] = useState('');

  const [clinics, setClinics] = useState(null);
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [errorClinics, setErrorClinics] = useState(null);
  const [newClinic, setNewClinic] = useState({ clinicName: '', clinicPassword: '', clinicAddress: '' });
  const [deleteIdClinic, setDeleteIdClinic] = useState('');


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

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5125/order', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setOrders(json);
      } catch (error) {
        setErrorOrders(error);
      } finally {
        setLoadingOrders(false);
      }
    };

    const fetchClinic = async () => {
      try {
        const response = await fetch('http://localhost:5125/clinic', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setClinics(json);
      } catch (error) {
        setErrorClinics(error);
      } finally {
        setLoadingClinics(false);
      }
    };

    fetchPatients();
    fetchOrders();
    fetchClinic();
  }, []);

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClinicInputChange = (e) => {
    const { name, value } = e.target;
    setNewClinic(prevState => ({ ...prevState, [name]: value }));
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
      setNewPatient({ patientFirstname: '', patientLastname: '', healthInsuranceCard: '', clinicId: '' });
    } catch (error) {
      setErrorPatients(error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:5125/order', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const createdOrder = await response.json();
      setOrders(prevState => [...prevState, createdOrder]);
      setNewOrder({ orthesisModel: '', orthesisInfo: '', orthesisScan: '', orderDate: '', orderState: '', orthesisComment: '', patientId: '' });
    } catch (error) {
      setErrorOrders(error);
    }
  };

  const createClinic = async () => {
    console.log("Create Clinic")
    try {
      const response = await fetch('http://localhost:5125/clinic', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClinic)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const createdClinic = await response.json();
      setOrders(prevState => [...prevState, createdClinic]);
      setNewClinic({ clinicName: '', clinicPassword: '', clinicAddress: ''});
    } catch (error) {
      setErrorClinics(error);
    }
  };

  const handleDeletePatientChange = (e) => {
    setDeleteIdPatient(e.target.value);
  };

  const handleDeleteOrderChange = (e) => {
    setDeleteIdOrder(e.target.value);
  };

  const handleDeleteClinicChange = (e) => {
    setDeleteIdClinic(e.target.value);
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

  const deleteOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5125/order/${deleteIdOrder}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setOrders(prevState => prevState.filter(order => order.id !== parseInt(deleteIdOrder, 10)));
      setDeleteIdOrder('');
    } catch (error) {
      setErrorOrders(error);
    }
  };

  const deleteClinic = async () => {
    try {
      const response = await fetch(`http://localhost:5125/clinic/${deleteIdClinic}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setClinics(prevState => prevState.filter(clinic => clinic.id !== parseInt(deleteIdClinic, 10)));
      setDeleteIdClinic('');
    } catch (error) {
      setErrorClinics(error);
    }
  };

  if (loadingPatients || loadingOrders || loadingClinics) return <p>Loading...</p>;
  if (errorPatients) return <p>Error: {errorPatients.message}</p>;
  if (errorOrders) return <p>Error: {errorOrders.message}</p>;
  if (errorClinics) return <p>Error: {errorClinics.message}</p>;

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
            <input type="text" name="patientFirstname" value={newPatient.patientFirstname} onChange={handlePatientInputChange} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="patientLastname" value={newPatient.patientLastname} onChange={handlePatientInputChange} />
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
      
      <div className="order">
        <h1>Orders Data</h1>
        {orders ? (
          <pre>{JSON.stringify(orders, null, 2)}</pre>
        ) : (
          <p>No order data available</p>
        )}
        <h2>Add New Order</h2>
        <form onSubmit={(e) => { e.preventDefault(); createOrder(); }}>
          <div>
            <label>Id Patient:</label>
            <input type="text" name="orthesisModel" value={newOrder.orthesisModel} onChange={handleOrderInputChange} />
          </div>
          <div>
            <label>Date Order:</label>
            <input type="text" name="orthesisInfo" value={newOrder.orthesisInfo} onChange={handleOrderInputChange} />
          </div>
          <div>
            <label>Orthesis Model:</label>
            <input type="text" name="orthesisScan" value={newOrder.orthesisScan} onChange={handleOrderInputChange} />
          </div>
          <div>
            <label>Orthesis Info:</label>
            <input type="text" name="orderDate" value={newOrder.orderDate} onChange={handleOrderInputChange} />
          </div>
          <div>
            <label>Orthesis Scan:</label>
            <input type="text" name="orderState" value={newOrder.orderState} onChange={handleOrderInputChange} />
          </div>
          <div>
            <label>Order State:</label>
            <input type="text" name="orthesisComment" value={newOrder.orthesisComment} onChange={handleOrderInputChange} />
          </div>
          <div>
            <label>Orthesis Comment:</label>
            <input type="text" name="patientId" value={newOrder.patientId} onChange={handleOrderInputChange} />
          </div>
          <button type="submit">Add Order</button>
        </form>
        <h2>Delete Order</h2>
        <form onSubmit={(e) => { e.preventDefault(); deleteOrder(); }}>
          <div>
            <label>ID:</label>
            <input type="text" value={deleteIdOrder} onChange={handleDeleteOrderChange} />
          </div>
          <button type="submit">Delete Order</button>
        </form>
      </div>

      <div className="clinic">
        <h1>Clinics Data</h1>
        {clinics ? (
          <pre>{JSON.stringify(clinics, null, 2)}</pre>
        ) : (
          <p>No clinic data available</p>
        )}
        <h2>Add New Clinic</h2>
        <form onSubmit={(e) => { e.preventDefault(); createClinic(); }}>
          <div>
            <label>Clinic Name:</label>
            <input type="text" name="clinicName" value={newClinic.clinicName} onChange={handleClinicInputChange} />
          </div>
          <div>
            <label>Clinic Password:</label>
            <input type="text" name="clinicPassword" value={newClinic.clinicPassword} onChange={handleClinicInputChange} />
          </div>
          <div>
            <label>Clinic Address:</label>
            <input type="text" name="clinicAddress" value={newClinic.clinicAddress} onChange={handleClinicInputChange} />
          </div>
          <button type="submit">Add CLinic</button>
        </form>
        <h2>Delete Clinic</h2>
        <form onSubmit={(e) => { e.preventDefault(); deleteClinic(); }}>
          <div>
            <label>ID:</label>
            <input type="text" value={deleteClinic} onChange={handleDeleteClinicChange} />
          </div>
          <button type="submit">Delete clinic</button>
        </form>
      </div>
      

    </div>
  );
}

export default App;
