require('dotenv').config()
var firebaseAdmin = require("firebase-admin");

var serviceAccount = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zvqgh%40piwatering-80e6c.iam.gserviceaccount.com"
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://piwatering-80e6c.firebaseio.com"
});

// setup firebase refs
const rootRef = firebaseAdmin.database().ref('wateringStatus');
const envRef = rootRef.child('wellEnvironment');
const envHistoryRef = rootRef.child('wellEnvironmentHistory');

function updateDatabase(data) {
  // console.log(pin, data);
  var timestamp = Date.now();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
        console.log(key + " -> " + data[key]);
        envRef.child(key).set(data[key]);
        envHistoryRef.child(timestamp).child(key).set(data[key]);
    }
}
}

module.exports = {
  updateDatabase,
};