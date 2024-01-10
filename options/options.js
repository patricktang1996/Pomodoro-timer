const timeOption = document.getElementById("time-option");
// Event listener for changes in the work Pomodoro timer's time option
timeOption.addEventListener("change", (event) => {
  const val = parseInt(event.target.value);
  if (val < 1 || val > 60) {
    timeOption.value = 25;
  } else {
    timeOption.value = val;
  }
});

const saveBtn = document.getElementById("save-btn");
// Event listener for the save button of the work Pomodoro timer
saveBtn.addEventListener("click", () => {
  // Save the new time option for the work Pomodoro timer to local storage
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
  alert("The new time-option of work has been saved");
});

// Fetch the saved time option for the work Pomodoro timer from local storage
chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption;
});

const timeOption2 = document.getElementById("time-option2");
// Event listener for changes in the rest Pomodoro timer's time option
timeOption2.addEventListener("change", (event) => {
  const val = parseInt(event.target.value);
  if (val < 1 || val > 60) {
    timeOption2.value = 5;
  } else {
    timeOption2.value = val;
  }
});

const saveBtn2 = document.getElementById("save-btn2");
// Event listener for the save button of the rest Pomodoro timer
saveBtn2.addEventListener("click", () => {
  chrome.storage.local.set({
    timer2: 0,
    timeOption2: timeOption2.value,
    isRunning2: false,
  });
  alert("The new time-option of rest has been saved");
});

// Fetch the saved time option for the rest Pomodoro timer from local storage
chrome.storage.local.get(["timeOption2"], (res) => {
  timeOption2.value = res.timeOption2;
});
