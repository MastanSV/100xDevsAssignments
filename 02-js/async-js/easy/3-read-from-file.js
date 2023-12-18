// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console.
// You can use the fs library to as a black box, the goal is to understand async tasks.
// Try to do an expensive operation below the file read and see how it affects the output.
// Make the expensive operation more and more expensive and see how it affects the output.

const fs = require("fs");

console.log("Start");

function readFile() {
  fs.readFile("test.txt", "utf-8", (error, data) => {
    if (!error) {
      console.log("read file is sucessful");
      console.log(data);
    } else {
      console.log(error);
    }
  });
  console.log("inside readFile()");
}

readFile();

console.log("performing expensive operation");

let sum = 0;
for (let i = 0; i < 100000000000; i++) {
  sum += i;
}

console.log("free from expensive operation!!!");
console.log("End");