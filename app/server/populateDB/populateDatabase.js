(async () => {
  //const https = require('https');
  const fetch = (await import('node-fetch')).default;
  const fs = require('fs');

  /*const httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });
*/
  const baseUrl = 'http://localhost:5125';

  async function createEntity(entityType, entityData) {
    var newUrl = `${baseUrl}/${entityType}`;
    console.log(newUrl);
    const response = await fetch(newUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entityData)
      });

    if (!response.ok) {
      throw new Error(`Failed to create ${entityType}: ${response.statusText}`);
    }

    return await response.json();
  }

  async function populateDatabase() {
    try {
      // Get if clinic 1 existe
      const response = await fetch(`${baseUrl}/clinics/1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        //agent: httpsAgent
      });

      if (response.ok) {
        const clinic = await response.json();
        console.log('Clinic exists:', clinic);
      } else if (response.status === 404) {
        console.log('Clinic not found, create clinic N°1');
        const clinics = [{
          name: 'althera',
          street: '1 rue principale',
          city: 'montreal',
          zip: 'j2j4p5'
        }];
        for (const clinic of clinics) {
          const createdClinic = await createEntity('clinics', clinic);
          console.log('Created clinic:', createdClinic);
        }
      } else {
        console.log('An error occurred:', response.statusText);
      }
      
      // Populate with Patients and orders
      const patients = JSON.parse(fs.readFileSync('patients.json'));
      const orders = JSON.parse(fs.readFileSync('orders.json'));
      
      for(const patient of patients){
        console.log('creating patient:', patient);
        const createdPatient = await createEntity('Patients', patient);
        console.log('Created patient:', createdPatient);
      }
      
      
      for (const order of orders) {
        console.log('Creating order:', order);
        const createdOrder = await createEntity('Orders', order);
        console.log('Created order:', createdOrder);
      }

      console.log('Database populated successfully!');
    } catch (error) {
      console.error('Error populating database:', error);
    }
  }

  populateDatabase();
})();