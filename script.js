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

function generateFanMail() {
    const greetings = ["Dear", "Hello", "Hi", "Hey"];
    const adjectives = ["amazing", "incredible", "awesome", "fantastic", "wonderful"];
    const nouns = ["fan", "supporter", "follower", "admirer"];
    const compliments = [
        "Your work is truly inspiring!",
        "I'm in awe of your talent!",
        "You're making a real difference!",
        "Your creativity knows no bounds!",
        "You're a true role model!"
    ];
    const closings = ["Best wishes", "Yours truly", "Sincerely", "With admiration"];

    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    const closing = closings[Math.floor(Math.random() * closings.length)];

    const subject = `Fan Mail #${++emailCount}`;
    const content = `${greeting} ${adjective} ${noun},<br><br>
                     ${compliment}<br><br>
                     ${closing},<br>
                     Your biggest fan`;

    addEmailToList(subject, content);
}

function addEmailToList(subject, content) {
    const emailList = document.getElementById('emailList');
    const emailItem = document.createElement('div');
    emailItem.className = 'email-item';
    emailItem.innerHTML = `
        <div class="email-subject">${subject}</div>
        <div class="email-content">${content}</div>
    `;
    emailItem.addEventListener('click', function() {
        this.classList.toggle('open');
    });
    emailList.prepend(emailItem);
}