//Sets up the initial alarm for the Pomodoro timer.
chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

//Handle First Pomodoro Timer Alarm Events
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    //Check if the first Pomodoro timer is running and updates its state based on elapsed time
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
        1,
        "0"
      );
      let seconds = "00";
      if (res.timer % 60 != 0) {
        seconds = `${60 - (res.timer % 60)}`.padStart(1, "0");
      }
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 60 * res.timeOption) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `${res.timeOption} minutes has passed!`,
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
          chrome.action.setBadgeText({
            text: "00:00",
          });
        } else {
          chrome.action.setBadgeText({
            text: `${minutes}:${seconds}`,
          });
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

//Initial Pomodoro Timer Settings
chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

//Set up Second Pomodoro Timer Alarms
chrome.alarms.create("pomodoroTimer2", {
  periodInMinutes: 1 / 60,
});

//Handle Second Pomodoro Timer Alarm Events
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer2") {
    //Check if the second Pomodoro timer is running and updates its state based on elapsed time
    chrome.storage.local.get(["timer2", "isRunning2", "timeOption2"], (res) => {
      const minutes = `${
        res.timeOption2 - Math.ceil(res.timer2 / 60)
      }`.padStart(1, "0");
      let seconds = "00";
      if (res.timer2 % 60 != 0) {
        seconds = `${60 - (res.timer2 % 60)}`.padStart(1, "0");
      }
      if (res.isRunning2) {
        let timer2 = res.timer2 + 1;
        let isRunning2 = true;
        if (timer2 === 60 * res.timeOption2) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `${res.timeOption2} minutes has passed!`,
            icon: "icon.png",
          });
          timer2 = 0;
          isRunning2 = false;
          chrome.action.setBadgeText({
            text: "00:00",
          });
        } else {
          chrome.action.setBadgeText({
            text: `${minutes}:${seconds}`,
          });
        }
        chrome.storage.local.set({
          timer2,
          isRunning2,
        });
      }
    });
  }
});

//Initial Settings for Second Pomodoro Timer
chrome.storage.local.get(["timer2", "isRunning2", "timeOption2"], (res) => {
  chrome.storage.local.set({
    timer2: "timer2" in res ? res.timer2 : 0,
    timeOption2: "timeOption2" in res ? res.timeOption2 : 5,
    isRunning2: "isRunning2" in res ? res.isRunning2 : false,
  });
});
