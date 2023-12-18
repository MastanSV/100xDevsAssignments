// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

console.log("start");

function writeFile() {
  fs.writeFile(
    "testAuto.txt",
    "Hi, am automatically written by writeFile fs library",
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("File saved successfully");
    }
  );
}

writeFile();

for (let i = 0; i < 10000000000; i++) {}

console.log("end");
