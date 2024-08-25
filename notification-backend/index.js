const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

// Conditionally load dotenv only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Check if the environment variable exists
if (!process.env.GOOGLE_CLOUD_CREDENTIALS) {
  throw new Error("GOOGLE_CLOUD_CREDENTIALS environment variable is missing!");
}

// Parse the environment variable (it should be a JSON string)
const serviceAccount = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://car-driver-bc91f-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    res.status(200).send("Notification sent successfully!");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Error sending notification");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
