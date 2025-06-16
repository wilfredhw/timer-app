let timer;
let isRunning = false;
let timeLeft;

function startTimer() {
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  timeLeft = minutes * 60 + seconds;
  if (timeLeft <= 0) {
    alert('請輸入有效時間！');
    return;
  }
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    isRunning = false;
    speakText('0');
    document.getElementById('timer-display').innerText = '00:00';
    return;
  }
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer-display').innerText = `${pad(minutes)}:${pad(seconds)}`;
  // 播報總秒數
  speakText(timeLeft.toString());
  timeLeft--;
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  document.getElementById('timer-display').innerText = '00:00';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}

function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US';
  speech.rate = 1.5; // 加快語音速度（預設為 1，範圍 0.1 到 10）
  window.speechSynthesis.speak(speech);
}