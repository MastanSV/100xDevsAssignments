/*## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.
For example, if the file input was
```
hello     world    my    name   is       raman
```
After the program runs, the output should be
```
hello world my name is raman
```*/

const fs = require("fs");
fs.readFile("file-cleaner.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  //   console.log(data.split(" ").filter((x) => !x.includes(" ")));
  const initialValue = "";
  const updatedData = data.split(" ").reduce((acc, cur) => {
    console.log(`acc : ${acc}`);
    console.log(`cur : ${cur}`);
    console.log(cur && !cur.includes(" "));
    if (cur && !cur.includes(" ")) {
      acc += ` ${cur}`;
      console.log(acc);
      return acc;
    }
    return acc;
  }, initialValue);
  fs.writeFile("file-cleaner.txt", updatedData.trim(), (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file saved successfully...");
  });
});
