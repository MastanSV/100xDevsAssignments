
class MastanPromise {
  state;
  constructor(executor) {
    this.state = "pending";

    this.result = undefined;

    this.fullfilledPromisesCallbacks = [];

    this.rejectedPromisesCallbacks = [];

    const resolve = (input) => {
      if (this.state === "pending") {
        this.state = "resolved";
        this.result = input;

        this.fullfilledPromisesCallbacks.forEach((cb) => cb(input));
      }
    };

    const reject = (input) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.result = input;

        this.rejectedPromisesCallbacks.forEach((cb) => cb(input));
      }
    };

    try {
      executor(resolve, reject);
    } catch (exception) {
      reject(exception);
    }
  }

  then(onFullfillementPromise, onRejectedPromise) {
    return new MastanPromise((resolve, reject) => {
      try {
        const handleFullfillmentPromise = (input) => {
          try {
            const result = onFullfillementPromise
              ? onFullfillementPromise(input)
              : input;
            resolve(result);
          } catch (exception) {
            reject(exception);
          }
        };

        const handleRejectedPromise = (input) => {
          try {
            const result = onRejectedPromise ? onRejectedPromise(input) : input;
            resolve(result);
          } catch (exception) {
            reject(exception);
          }
        };

        if (this.state === "resolved") {
          handleFullfillmentPromise();
        }
        if (this.state === "rejected") {
          handleRejectedPromise();
        }
        if (this.state === "pending") {
          this.fullfilledPromisesCallbacks.push(handleFullfillmentPromise);
          this.rejectedPromisesCallbacks.push(handleRejectedPromise);
        }
      } catch (exception) {
        return this.then(undefined, onRejectedPromise);
      }
    });
  }
}

const myPromise = new MastanPromise(function (resolve, reject) {
  const res = Math.random() > 0.5;
  if (res) {
    resolve("Resolve promise");
  } else {
    reject("Reject promise");
  }
}).then(
  (res) => console.log(`resolved : ${res}`),
  (rej) => console.log(`rejected : ${rej}`)
);
