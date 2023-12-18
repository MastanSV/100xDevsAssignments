/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const dir = `D:\\100xDevs\\Assignements_Answers\\week-0\\100xDevsAssignments\\02-js\\nodejs\\files`;

app.get("/files", (req, res) => {
  readFiles()
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

function readFiles() {
  return new Promise((resolve, reject) => {
    let filesList = [];
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject("Error occured while getting files");
      } else {
        files.forEach((item) => filesList.push(item));
        resolve(filesList);
      }
    });
  });
}

app.get("/file/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(dir, fileName);

  readFileContent(filePath)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => res.status(404).json(error));
});

function readFileContent(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (data) {
        resolve(data);
      } else {
        reject("File not found");
      }
    });
  });
}

app.all(`*`, (req, res) => {
  res.status(404).json("Route not found");
});

// app.listen(port, () => console.log(`app is listening at port : ${port}`));
module.exports = app;
