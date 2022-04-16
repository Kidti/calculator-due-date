const startDate = new Date("2022-04-12T14:12:00");
const startHour = 9;
const endHour = 17;
const turnaroundHours = 16;

function isWeekDay(date) {
  date = new Date(+date);
  return date.getDay() > 0 && date.getDay() < 6;
}

function isWorkingHours(date) {
  date = new Date(+date);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let result =
    hours >= startHour &&
    (hours < endHour || (hours === endHour && minutes === 0 && seconds === 0));

  return result;
}

function isValidSubmitDate(date) {
  date = new Date(+date);
  return isWorkingHours(date) && isWeekDay(date);
}

function addNonWorkingHours(turnaroundHours) {
  let array = [];
  for (let i = 1; i <= turnaroundHours; i++) {
    array.push(i);
  }
  return array.filter((num) => num % 8 === 0).length * 16;
}

function calculateDueDate(submitTime, turnaroundHours) {
  let dueDateinHours = 0;

  if (!isValidSubmitDate(submitTime)) {
    throw new Error("Invalid Submit Time");
  } else {
    dueDateinHours =
      submitTime.getHours() +
      turnaroundHours +
      addNonWorkingHours(turnaroundHours);
  }

  return new Date(submitTime.setHours(dueDateinHours));
}

const result = calculateDueDate(startDate, turnaroundHours);
console.log("Due date is: " + result);

module.exports = calculateDueDate;
