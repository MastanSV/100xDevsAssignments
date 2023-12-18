/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("resolved after 1 sec"), 1000)
  );
}

function waitTwoSecond() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("resolved after 2 sec"), 2000)
  );
}

function waitThreeSecond() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("resolved after 3 sec"), 3000)
  );
}

function calculateTime() {
  const now = Date.now();

  waitOneSecond().then((res) => {
    console.log(res);
    waitTwoSecond().then((res) => {
      console.log(res);
      waitThreeSecond().then((res) => {
        console.log(res);
        const after = Date.now();
        console.log(`Time taken for completion ${now - after}`); //Time taken for completion approx. range (6030 - 6070)
      });
    });
  });
}

calculateTime();
