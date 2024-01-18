document.addEventListener('DOMContentLoaded', function () {
    // Display current time and date
    updateDateTime();

    // Update time every second
    setInterval(updateDateTime, 1000);

    // Load alarms from localStorage and display
    displayAlarms();

    // Add event listener for new alarm button
    document.getElementById('new-alarm-btn').addEventListener('click', showAlarmSetting);
});

function updateDateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');

    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toDateString();

    currentTimeElement.textContent = timeString;
    currentDateElement.textContent = dateString;
}

function showAlarmSetting() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('alarm-setting').style.display = 'block';
}

function setAlarm() {
    const alarmTime = document.getElementById('alarm-time').value;
    const alarmTone = document.getElementById('alarm-tone').value;

    // Save the alarm to localStorage (for simplicity, using an array)
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.push({ time: alarmTime, tone: alarmTone, enabled: true });
    localStorage.setItem('alarms', JSON.stringify(alarms));

    // Display alarms
    displayAlarms();

    // Reset form and go back to home screen
    document.getElementById('alarm-time').value = '';
    document.getElementById('alarm-tone').value = '';
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('alarm-setting').style.display = 'none';
}

function displayAlarms() {
    const alarmListElement = document.getElementById('alarm-list');
    alarmListElement.innerHTML = '';

    // Retrieve alarms from localStorage
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];

    alarms.forEach((alarm, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${alarm.time} - 
            <label>
                <input type="checkbox" ${alarm.enabled ? 'checked' : ''} onchange="toggleAlarm(${index})"> 
                Enabled
            </label>
            <button onclick="deleteAlarm(${index})">Delete</button>
        `;
        alarmListElement.appendChild(listItem);
    });
}

function toggleAlarm(index) {
    // Toggle the enabled status of the alarm in localStorage
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms[index].enabled = !alarms[index].enabled;
    localStorage.setItem('alarms', JSON.stringify(alarms));

    // Update the displayed alarms
    displayAlarms();
}

function deleteAlarm(index) {
    // Remove the alarm from localStorage
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    alarms.splice(index, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));

    // Update the displayed alarms
    displayAlarms();
}