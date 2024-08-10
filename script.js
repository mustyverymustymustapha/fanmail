let totalMoney = 0;
const themes = {
    default: {
        background: '#f0f0f0',
        text: '#333',
        header: '#4a4a4a',
        button: '#007bff',
        buttonText: '#ffffff',
        emailItem: '#ffffff',
        emailSubject: '#007bff',
        modalBackground: 'rgba(0, 0, 0, 0.5)',
        modalContent: '#ffffff'
    },
    dark: {
        background: '#2c3e50',
        text: '#ecf0f1',
        header: '#34495e',
        button: '#e74c3c',
        buttonText: '#ffffff',
        emailItem: '#34495e',
        emailSubject: '#e74c3c',
        modalBackground: 'rgba(0, 0, 0, 0.7)',
        modalContent: '#2c3e50'
    },
    pastel: {
        background: '#f9e79f',
        text: '#5d4037',
        header: '#a1887f',
        button: '#80cbc4',
        buttonText: '#ffffff',
        emailItem: '#fffde7',
        emailSubject: '#4db6ac',
        modalBackground: 'rgba(161, 136, 127, 0.5)',
        modalContent: '#fffde7'
    }
};

function createThemeSelector() {
    const themeSelector = document.createElement('select');
    themeSelector.id = 'themeSelector';
    for (const theme in themes) {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        themeSelector.appendChild(option);
    }
    themeSelector.addEventListener('change', applyTheme);
    document.body.insertBefore(themeSelector, document.body.firstChild);
}

function applyTheme() {
    const selectedTheme = document.getElementById('themeSelector').value;
    const theme = themes[selectedTheme];

    document.body.style.setProperty('--background-color', theme.background);
    document.body.style.setProperty('--text-color', theme.text);
    document.body.style.setProperty('--header-color', theme.header);
    document.body.style.setProperty('--button-color', theme.button);
    document.body.style.setProperty('--button-text-color', theme.buttonText);
    document.body.style.setProperty('--email-item-color', theme.emailItem);
    document.body.style.setProperty('--email-subject-color', theme.emailSubject);
    document.body.style.setProperty('--modal-background-color', theme.modalBackground);
    document.body.style.setProperty('--modal-content-color', theme.modalContent);
}

function initThemeSelector() {
    createThemeSelector();
    applyTheme();
}

let emailCount = 0;
const categories = ["Praise", "Question", "Collaboration", "Fan Art"];
let categoryStats = {
    Praise: 0,
    Question: 0,
    Collaboration: 0,
    "Fan Art": 0
};
let currentReplyEmail = null;

const asciiArtTemplates = [
    "  _____\n |     |\n | ♥ ♥ |\n |  ▽  |\n |_____|\n",
    " ________\n|        |\n|  ★★★★  |\n|________|\n",
    "    _\n  _| |_\n |_   _|\n   |_|\n",
    "  ___  ___\n (o o)\n(  V  )\n |___|_\n",
    " _______\n|       |\n|   ♫   |\n|_______|\n"
];

function generateAsciiArt(name) {
    const template = asciiArtTemplates[Math.floor(Math.random() * asciiArtTemplates.length)];
    return template + `\nFor ${name}`;
}

function submitName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        checkProfanity(name);
    } else {
        alert('Please enter your name.');
    }
}

function checkProfanity(text) {
    fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(text)}`)
        .then(response => response.json())
        .then(data => {
            if (data === true) {
                alert("HEY DIRTY MINDED PERSON TYPE SOMETHING NICE");
            } else {
                document.getElementById('namePrompt').style.display = 'none';
                document.getElementById('mainContent').style.display = 'flex';
                document.getElementById('userName').textContent = text;
                updateCategoryFilter();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while checking the name. Please try again.');
        });
} 

function updateMoneyDisplay() {
    const moneyDisplay = document.getElementById('moneyDisplay');
    if (!moneyDisplay) {
        const newMoneyDisplay = document.createElement('div');
        newMoneyDisplay.id = 'moneyDisplay';
        newMoneyDisplay.style.position = 'fixed';
        newMoneyDisplay.style.top = '10px';
        newMoneyDisplay.style.right = '10px';
        newMoneyDisplay.style.backgroundColor = '#4CAF50';
        newMoneyDisplay.style.color = 'white';
        newMoneyDisplay.style.padding = '10px';
        newMoneyDisplay.style.borderRadius = '5px';
        document.body.appendChild(newMoneyDisplay);
    }
    document.getElementById('moneyDisplay').textContent = `Total Donations: $${totalMoney.toFixed(2)}`;
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
    let category = categories[Math.floor(Math.random() * categories.length)];

    let content = `${greeting} ${adjective} ${noun},<br><br>
                   ${compliment}<br><br>
                   ${closing},<br>
                   Your biggest fan`;

    
    addEmailToList(subject, body, donation);
    updateMoneyDisplay();


    if (Math.random() < 0.2) {
        const asciiArt = generateAsciiArt(document.getElementById('userName').textContent);
        content = `<pre>${asciiArt}</pre><br>` + content;
        category = "Fan Art";
    }

    categoryStats[category]++;

    const subject = `Fan Mail #${++emailCount} [${category}]`;

    const donation = Math.random() < 0.3 ? Math.round(Math.random() * 100 + 1) : 0;
    totalMoney += donation;
    
    addEmailToList(subject, content, category);
    updateStats();
}

function addEmailToList(subject, content, donation) {
    const emailList = document.getElementById('emailList');
    const emailItem = document.createElement('div');
    emailItem.className = 'email-item';
    emailItem.innerHTML = `
        <div class="email-subject">${subject}</div>
        <div class="email-content">${content}</div>
        ${donation > 0 ? `<div class="email-donation">Donation: $${donation.toFixed(2)}</div>` : ''}
    `;
    emailList.prepend(emailItem);
}

function updateCategoryFilter() {
    const filter = document.getElementById('categoryFilter');
    filter.innerHTML = '<option value="All">All Categories</option>';
    categories.forEach(category => {
        filter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

function filterEmails() {
    const category = document.getElementById('categoryFilter').value;
    const emails = document.querySelectorAll('.email-item');
    emails.forEach(email => {
        if (category === 'All' || email.dataset.category === category) {
            email.style.display = 'block';
        } else {
            email.style.display = 'none';
        }
    });
}

function updateStats() {
    const statsDiv = document.getElementById('emailStats');
    statsDiv.innerHTML = '<h3>Email Statistics</h3>';
    for (const [category, count] of Object.entries(categoryStats)) {
        statsDiv.innerHTML += `<p>${category}: ${count}</p>`;
    }
}

function openReplyModal(emailItem) {
    currentReplyEmail = emailItem;
    document.getElementById('replyModal').style.display = 'block';
}

function closeReplyModal() {
    document.getElementById('replyModal').style.display = 'none';
    document.getElementById('replyText').value = '';
    currentReplyEmail = null;
}

function sendReply() {
    const replyText = document.getElementById('replyText').value.trim();
    if (replyText && currentReplyEmail) {
        const replyContent = currentReplyEmail.querySelector('.reply-content');
        replyContent.innerHTML = `<strong>Your reply:</strong><br>${replyText}`;
        replyContent.style.display = 'block';
        closeReplyModal();
    } else {
        alert('Please enter a reply before sending.');
    }
}

updateMoneyDisplay();

document.addEventListener('DOMContentLoaded', initThemeSelector);
