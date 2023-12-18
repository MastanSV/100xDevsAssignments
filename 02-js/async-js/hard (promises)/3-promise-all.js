/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
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
  const promise1 = waitOneSecond();
  const promise2 = waitTwoSecond();
  const promise3 = waitThreeSecond();

  const now = Date.now();
  const result = Promise.all([promise1, promise2, promise3]);
  result.then((res) => {
    console.log(res);
    const after = Date.now();
    console.log(`Time taken for completion ${now - after}`); //Time taken for completion approx. range(3029 to 3050)
  });
}
calculateTime();
