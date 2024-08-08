let emailCount = 0;

function submitName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        document.getElementById('namePrompt').style.display = 'none';
        document.getElementById('mainContent').style.display = 'flex';
        document.getElementById('userName').textContent = name;
    } else {
        alert('Please enter your name.');
    }
}

