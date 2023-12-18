// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function getHoursMinsSecs(date) {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  let seconds = date.getSeconds().toString();

  ({ hours, minutes, seconds } = appendPrefixZeroIfRequired(
    hours,
    minutes,
    seconds
  ));

  return { hours, minutes, seconds };
}

function appendPrefixZeroIfRequired(hours, minutes, seconds) {
  hours = hours.length === 1 ? `0${hours}` : hours;
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  seconds = seconds.length === 1 ? `0${seconds}` : seconds;
  return { hours, minutes, seconds };
}

function print24hrsClock() {
  setInterval(() => {
    const date = new Date();
    let { hours, minutes, seconds } = getHoursMinsSecs(date);

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().length === 1 ? `0${hours}` : hours;

    console.log(`AMPM ---> ${hours}:${minutes}:${seconds} ${ampm}`);
  }, 1000);
}

function print12hrsClock() {
  setInterval(() => {
    const date = new Date();
    let { hours, minutes, seconds } = getHoursMinsSecs(date);

    console.log(`24Hrs ---> ${hours}:${minutes}:${seconds}`);
  }, 1000);
}

print12hrsClock();
print24hrsClock();
