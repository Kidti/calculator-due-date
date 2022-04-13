const startDate = new Date("2022-04-12T14:12:00");
const startHour = 9;
const endHour = 17;
const turnaroundHours = 16;

function isWeekDay(date) {
  return date.getDay() > 0 && date.getDay() < 6;
}

function isWorkingHours(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let millisecs = date.getMilliseconds();

  let result =
    hours >= startHour &&
    (hours < endHour ||
      (hours === endHour &&
        minutes === 00 &&
        seconds === 00 &&
        millisecs === 00));

  return result;
}

function isValidSubmitDate(date) {
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

  if (isValidSubmitDate(submitTime)) {
    dueDateinHours =
      submitTime.getHours() +
      turnaroundHours +
      addNonWorkingHours(turnaroundHours, submitTime);
  }

  return new Date(submitTime.setHours(dueDateinHours));
}

const result = calculateDueDate(startDate, turnaroundHours);
console.log("Due date is: " + result);
