// spawn_python.js
// var util = require("util");

var spawn = require("child_process").spawn;
var process = spawn("python", ["bme280.py"]);

// util.log("readingin");

process.stdout.on("data", function(chunk) {
  var textChunk = chunk.toString("utf8"); // buffer to string
  // console.log(textChunk);
  // js read this
  //var json = JSON.parse(textChunk);

  console.log(textChunk[temperature])
  // util.log(textChunk);
});
