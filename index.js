const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define the file path for form data storage
const filePath = path.join(__dirname, 'data.json');

// Endpoint to handle form submission
app.post('/join', (req, res) => {
  const { name, email, phone, plan, cardio, age, weight, height } = req.body;

  // Log the data to the console for debugging
  console.log('Received form data:', { name, email, phone, plan, cardio, age, weight, height });

  // Prepare the form data to be saved as a JSON object
  const formData = {
    name,
    email,
    phone,
    plan,
    cardio,
    age,
    weight,
    height,
    date: new Date().toISOString()
  };

  // Read the existing data from the JSON file if it exists
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      // If there's an error reading the file, return error
      console.error('Error reading data file:', err);
      return res.status(500).json({ success: false, message: 'Error reading data file' });
    }

    let jsonData = [];
    if (data) {
      // If the file contains data, parse it into a JSON array
      jsonData = JSON.parse(data);
    }

    // Push the new form data to the existing data array
    jsonData.push(formData);

    // Write the updated data back to the data.json file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error saving data to file:', err);
        return res.status(500).json({ success: false, message: 'Error saving data' });
      }
      // If successful, send a success response
      res.json({ success: true, message: 'Form data received and saved' });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
