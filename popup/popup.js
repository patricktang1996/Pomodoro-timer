let tasks = [];

function updateTime() {
  chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
    const time = document.getElementById("time");
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
      1,
      "0"
    );
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(1, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
    if (res.isRunning) {
      chrome.action.setBadgeText({
        text: `${minutes}:${seconds}`,
      });
    }
  });
}

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning", "isRunning2"], (res) => {
    if (res.isRunning2 !== undefined) {
      if (res.isRunning2) {
        alert("Please pause the timer of rest.");
      } else {
        chrome.storage.local.set(
          {
            isRunning: !res.isRunning,
          },
          () => {
            startTimerBtn.textContent = !res.isRunning
              ? "Pause Timer"
              : "Start Timer";
          }
        );
      }
    } else {
      chrome.storage.local.set(
        {
          isRunning: !res.isRunning,
        },
        () => {
          startTimerBtn.textContent = !res.isRunning
            ? "Pause Timer"
            : "Start Timer";
        }
      );
    }
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
  chrome.storage.local.get(["timeOption", "isRunning"], (res) => {
    const minutes = res.timeOption;
    let seconds = "00";
    if (!res.isRunning) {
      chrome.action.setBadgeText({
        text: `${minutes}:${seconds}`,
      });
    }
  });
});

function updateTime2() {
  chrome.storage.local.get(["timer2", "timeOption2", "isRunning2"], (res) => {
    const time = document.getElementById("time2");
    const minutes = `${res.timeOption2 - Math.ceil(res.timer2 / 60)}`.padStart(
      1,
      "0"
    );
    let seconds = "00";
    if (res.timer2 % 60 != 0) {
      seconds = `${60 - (res.timer2 % 60)}`.padStart(1, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
    if (res.isRunning2) {
      chrome.action.setBadgeText({
        text: `${minutes}:${seconds}`,
      });
    }
  });
}

updateTime2();
setInterval(updateTime2, 1000);

const startTimerBtn2 = document.getElementById("start-timer-btn2");
startTimerBtn2.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning", "isRunning2"], (res) => {
    if (res.isRunning !== undefined) {
      if (res.isRunning) {
        alert("Please pause the timer of work.");
      } else {
        chrome.storage.local.set(
          {
            isRunning2: !res.isRunning2,
          },
          () => {
            startTimerBtn2.textContent = !res.isRunning2
              ? "Pause Timer"
              : "Start Timer";
          }
        );
      }
    } else {
      chrome.storage.local.set(
        {
          isRunning2: !res.isRunning2,
        },
        () => {
          startTimerBtn2.textContent = !res.isRunning2
            ? "Pause Timer"
            : "Start Timer";
        }
      );
    }
  });
});

const resetTimerBtn2 = document.getElementById("reset-timer-btn2");
resetTimerBtn2.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer2: 0,
      isRunning2: false,
    },
    () => {
      startTimerBtn2.textContent = "Start Timer";
    }
  );
  chrome.storage.local.get(["timeOption2", "isRunning2"], (res) => {
    const minutes = res.timeOption2;
    let seconds = "00";
    if (!res.isRunning2) {
      chrome.action.setBadgeText({
        text: `${minutes}:${seconds}`,
      });
    }
  });
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.className = "task-input";
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.className = "task-delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
