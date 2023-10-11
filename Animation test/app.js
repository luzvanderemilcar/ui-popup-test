const SessionLabel = document.querySelector("#session-label");
const SessionLength = document.querySelector("#session-length");
const BreakLabel = document.querySelector("#break-label");
const BreakLength = document.querySelector("#break-length");
const TimerLabel = document.querySelector("#timer-label");
const TimeLeft = document.querySelector("#time-left");

//Button selections
const BreakIncBtn = document.querySelector("#break-increment");
const BreakDecBtn = document.querySelector("#break-decrement");
const SessionIncBtn = document.querySelector("#session-increment");
const SessionDecBtn = document.querySelector("#session-decrement");
const StartStopBtn = document.querySelector("#start_stop");
const ResetBtn = document.querySelector("#reset");
const TimeOverBeep = document.getElementById("beep");
const LightenDiv = document.getElementById("signal");

//Timer global values
let sessionLength = 25;
let breakLength = 5;
let activeInterval;
let soundTimeOut;
let lightenInterval;
let sessionCount;
let breakCount = 0;
const SESSION = "Session";
const BREAK = "Break";


// if the current timer has been already stopped
let initialized = false;
let paused = false;
let breakOn = false;
let newSession = false;


// Default timer 
(() => { setTimer(25, 5); })();

//Break controls
BreakIncBtn.addEventListener("click", () => {
  if (breakLength < 60) {
    stopBeep();
    setTimer(sessionLength, breakLength + 1);
    initState();
  }
});

BreakDecBtn.addEventListener("click", () => {
  if (breakLength > 1) {
    stopBeep();
    setTimer(sessionLength, breakLength - 1);
    initState();
  }
});

// Session controls
SessionIncBtn.addEventListener("click", () => {
  if (sessionLength < 60) {
    stopBeep();
    setTimer(sessionLength + 1, breakLength);
    initState();
  }
});

SessionDecBtn.addEventListener("click", () => {
  if (sessionLength > 1) {
    stopBeep();
    setTimer(sessionLength - 1, breakLength);
    initState();
  }
});

StartStopBtn.addEventListener("click", () => {

  if (initialized && paused) {
    resume();
  }
  else if (initialized && !paused) {
    pause();
  }
  else if (!initialized) {
    start();
  }
});

ResetBtn.addEventListener("click", () => {
  reset();
});

// Functions to control the timer
function setTimer(sessionSet, breakSet) {
  sessionLength = sessionSet;
  breakLength = breakSet;
  sessionCount = sessionLength * 60;
  breakCount = breakLength * 60;
  if (TimerLabel.innerHTML != SESSION) {
    TimerLabel.innerHTML = SESSION;
  }
  SessionLength.innerHTML = sessionSet;
  BreakLength.innerHTML = breakSet;
  TimeLeft.innerHTML = muniteSet(sessionSet);
}

function start() {
  if (paused) {
    paused = false;
  }
  if (!initialized) {
    initialized = true;
  }

  if (TimerLabel.innerHTML == BREAK) {
    TimerLabel.innerHTML = SESSION;
  }
  StartStopBtn.innerHTML = '<i class="fa-solid fa-pause fa-lg"></i><span class="sr-only">Pause</span>';
  activeInterval = setInterval(() => {
    if (sessionCount > 0) {
      sessionCount--;
      TimeLeft.innerHTML = fromSecond(sessionCount);
    } else if (sessionCount == 0) {
      if (newSession) {
        setTimer(sessionLength, breakLength);
        newSession = false;
      }
      else if (breakCount > 0) {
        if (!breakOn) {
          playBeep();
          TimerLabel.innerHTML = BREAK;
          breakOn = true;
        }
        TimeLeft.innerHTML = fromSecond(breakCount);
        breakCount--;
      } else if (breakCount == 0) {
        playBeep();
        TimeLeft.innerHTML = fromSecond(breakCount);
        breakOn = false;
        newSession = true;
      }
    }
  }, 1000);
}

function resume() {
  if (paused) {
    paused = false;
    StartStopBtn.innerHTML = '<i class="fa-solid fa-pause fa-lg"></i><span class="sr-only">Pause</span>';
    activeInterval = setInterval(() => {
      if (sessionCount > 0) {
        sessionCount--;
        TimeLeft.innerHTML = fromSecond(sessionCount);
      } else if (sessionCount == 0) {
       if (newSession) {
          setTimer(sessionLength, breakLength);
          newSession = false;
        }
       else if (breakCount > 0) {
          if (!breakOn) {
            playBeep();
            breakOn = true;
            TimerLabel.innerHTML = BREAK;
          }
          TimeLeft.innerHTML = fromSecond(breakCount);
          breakCount--;
        } else if (breakCount == 0) {
          playBeep();
          TimeLeft.innerHTML = fromSecond(breakCount);
          breakOn = false;
          newSession = true;
        }
      }

    }, 1000);
  }
}

function pause() {
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
  paused = true;
  StartStopBtn.innerHTML = '<i class="fa-solid fa-play fa-lg"></i>️<span class="sr-only">Resume</span>';
  stopBeep();
}

function reset() {
  if (initialized) {
    initialized = false;
  }
  if (paused) {
    paused = false;
  }
  initState();
  stopBeep();
  setTimer(25, 5);
}

function initState() {
  StartStopBtn.innerHTML = '<i class="fa-solid fa-play fa-lg"></i>️<span class="sr-only">Start</span>';
  if (TimerLabel.innerHTML == BREAK) {
    TimerLabel.innerHTML = SESSION;
  }
  if (breakOn) {
    breakOn = false;
  }
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
}

//Time over Beep controls
function playBeep() {
  let beepPromise = TimeOverBeep.play();
  if (beepPromise != undefined) {
    beepPromise
      .then()
      .catch(error => {
        if (error.name == 'NotAllowedError') {
          console.log("Media Autoplay Not Allowed");
        }
      });
  }
  signal();
  soundTimeOut = setTimeout(() => {
    stopBeep();
  }, 5000);
}

function stopBeep() {
  if (soundTimeOut) {
    TimeOverBeep.pause();
    TimeOverBeep.currentTime = 0;
    clearTimeout(soundTimeOut);
    soundTimeOut = null;
  }
  // To clear light signal interval
  if (lightenInterval) {
    clearInterval(lightenInterval);
    lightenInterval = null;
    if (LightenDiv.classList.contains("lighten")) {
      LightenDiv.classList.toggle("lighten");
    }
  }
}

function signal() {
  lightenInterval = setInterval(() => {
    LightenDiv.classList.toggle("lighten");
  }, 500);

}

function muniteSet(min) {
  let minStr;
  if (min < 10) {
    minStr = min.toString().padStart(2, "0");
  } else {
    minStr = min.toString();
  }
  return `${minStr}:00`;
}

function fromSecond(second) {
  let min = Math.floor(second / 60);
  let sec = Math.round((second / 60 - min) * 60);
  let minStr, secStr;
  if (min < 10) {
    minStr = min.toString().padStart(2, "0");
  } else {
    minStr = min.toString();
  }
  if (sec < 10) {
    secStr = sec.toString().padStart(2, "0");
  } else {
    secStr = sec.toString();
  }
  return `${minStr}:${secStr}`;
}