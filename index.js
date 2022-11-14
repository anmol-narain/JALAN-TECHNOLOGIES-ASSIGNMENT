let alarmString = null;

// Selecting Audio element
const alarmAudio = document.getElementById("alarm-audio");

// Selecting DOM elements 
const createAlarm = document.querySelector(".create-alarm");
const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("clear-alarm");
const alarmTextContainer = document.getElementById("alarm-text");

//I created a simple function to set the alarm text
const alarmText = (time) => `Alarm is set at ${time}`;

// Initialize alarm sound
alarmAudio.src = "https://assets.mixkit.co/sfx/preview/mixkit-classic-alarm-995.mp3";
alarmAudio.load();


const handleSubmit = (event) => {
  // Prevent default action of reloading the page
  event.preventDefault();
  const { hour, sec, min, zone } = document.forms[0];
  alarmString = getTimeString({
    hours: hour.value,
    seconds: sec.value,
    minutes: min.value,
    zone: zone.value
  });
  
  document.forms[0].reset();
  createAlarm.style.display = "none";
  activeAlarm.style.display = "block";
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};


clearAlarm.addEventListener("click", handleClear);
document.forms[0].addEventListener("submit", handleSubmit);

// Function to check if alarm needs to be triggered
const checkAlarm = (timeString) => {
  if (alarmString === timeString) {
    alarmAudio.play();
  }
};

// Function to convert time to string value
const getTimeString = ({ hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

// A simple Function to display present time
const renderTime = () => {
  let currentTime = document.getElementById("current-time");
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let zone = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};
setInterval(renderTime, 1000);