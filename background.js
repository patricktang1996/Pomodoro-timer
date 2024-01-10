chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
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
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

chrome.alarms.create("pomodoroTimer2", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer2") {
    chrome.storage.local.get(["timer2", "isRunning2", "timeOption2"], (res) => {
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
        }
        chrome.storage.local.set({
          timer2,
          isRunning2,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer2", "isRunning2", "timeOption2"], (res) => {
  chrome.storage.local.set({
    timer2: "timer2" in res ? res.timer2 : 0,
    timeOption2: "timeOption2" in res ? res.timeOption2 : 5,
    isRunning2: "isRunning2" in res ? res.isRunning2 : false,
  });
});
