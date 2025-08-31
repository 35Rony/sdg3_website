// Track health progress
let water = 0, sleep = 0, steps = 0;

function updateDashboard() {
  document.getElementById('waterProgress').innerText = water + " glasses";
  document.getElementById('sleepProgress').innerText = sleep + " hrs";
  document.getElementById('stepsProgress').innerText = steps + " steps";
  localStorage.setItem("healthData", JSON.stringify({water, sleep, steps}));
}

function loadData() {
  let data = JSON.parse(localStorage.getItem("healthData"));
  if (data) { water = data.water; sleep = data.sleep; steps = data.steps; }
  updateDashboard();
}
loadData();

// Simple chatbot
function sendMessage() {
  let input = document.getElementById('userInput').value.toLowerCase();
  let chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let response = "I'm not sure, but remember SDG 3 is about well-being!";
  if (input.includes("stress")) response = "Take deep breaths and rest. Mental health matters 💚";
  if (input.includes("water")) response = "Remember to drink at least 8 glasses daily.";
  if (input.includes("sleep")) response = "Adults need 7-9 hours of sleep for good health.";

  chatWindow.innerHTML += `<p><b>Bot:</b> ${response}</p>`;
  document.getElementById('userInput').value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
