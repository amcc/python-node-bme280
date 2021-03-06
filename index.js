const { exec } = require('child_process');
const FirebaseUpdate = require('./firebase.js');



// check the bme280 with a delay
let timeDelay = 4000;
let timer = setInterval(getEnv, timeDelay);

// spawn the python to do the hard work
var spawn = require("child_process").spawn;

// get the latest environment variables
function getEnv(){
  // to debug use python.py below
  var spawner = spawn("python", ["bme280.py"]);
  spawner.stdout.on("data", function(chunk) {
    var textChunk = chunk.toString("utf8"); // buffer to string
    // preserve newlines, etc - use valid JSON
    s = textChunk
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g, "");
    // make JSON
    var json = JSON.parse(s);
  
    // console.log(json);
    FirebaseUpdate.updateDatabase(json, timeDelay);

    // kill the process
    spawner.kill();
  });
}

// if (process.platform === 'linux') {
  exec('chromium-browser --kiosk --incognito https://plant.suprasystems.studio/')
// }
