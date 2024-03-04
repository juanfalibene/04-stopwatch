document.addEventListener("DOMContentLoaded", () => {
  const stopWatch = document.getElementById("stopwatch");
  const playPauseBtn = document.getElementById("play-pause");
  const stopBtn = document.getElementById("stop");
  const secondsCircle = document.getElementById("seconds-circle");

  // guardar el intervalo y modificar cada 1s
  var stopWatchInterval;
  var runningTime = 0;

  const playTimer = playPauseBtn.addEventListener("click", () => {
    // no esta pausado
    const isPaused = !playPauseBtn.classList.contains("running");
    if (isPaused) {
      playPauseBtn.classList.add("running");
      start();
    } else {
      playPauseBtn.classList.remove("running");
      pause();
    }
  });

  const start = () => {
    secondsCircle.style.animation = "secsRotation 60s linear infinite";
    // primera vez milisegundos actuales - 0
    let startTime = Date.now() - runningTime;
    secondsCircle.style.animationPlayState = "running";
    // iniciar intervalo
    stopWatchInterval = setInterval(() => {
      runningTime = Date.now() - startTime;
      console.log(runningTime);
      stopWatch.textContent = calcuateTime(runningTime);
    }, 1000);
  };

  const calcuateTime = (runningTime) => {
    // calcular seg
    const totalSeconds = Math.floor(runningTime / 1000);
    // calcular min
    const totalMins = Math.floor(totalSeconds / 60);

    // display seg modulo
    const displaySeconds = (totalSeconds % 60).toString().padStart(2, "0");
    const displayMins = totalMins.toString().padStart(2, "0");

    return `${displayMins}:${displaySeconds}`;
  };

  const pause = () => {
    secondsCircle.style.animationPlayState = "paused";
    // borrar intervalo
    clearInterval(stopWatchInterval);
  };

  const stopTimer = stopBtn.addEventListener("click", () => {
    secondsCircle.style.transform = "rotate(-90deg) translateX(60px)";
    secondsCircle.style.animation = "none";
    playPauseBtn.classList.remove("running");
    // reset
    runningTime = 0;
    clearInterval(stopWatchInterval);
    stopWatch.textContent = "00:00";
  });
});
