const timeOption = document.getElementById("time-option");
timeOption.addEventListener("change", (event) => {
  const val = parseInt(event.target.value);
  if (val < 1 || val > 60) {
    timeOption.value = 25;
  } else {
    timeOption.value = val;
  }
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
  alert("The new time-option of work has been saved");
});

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption;
});

const timeOption2 = document.getElementById("time-option2");
timeOption2.addEventListener("change", (event) => {
  const val = parseInt(event.target.value);
  if (val < 1 || val > 60) {
    timeOption2.value = 5;
  } else {
    timeOption2.value = val;
  }
});

const saveBtn2 = document.getElementById("save-btn2");
saveBtn2.addEventListener("click", () => {
  chrome.storage.local.set({
    timer2: 0,
    timeOption2: timeOption2.value,
    isRunning2: false,
  });
  alert("The new time-option of rest has been saved");
});

chrome.storage.local.get(["timeOption2"], (res) => {
  timeOption2.value = res.timeOption2;
});
