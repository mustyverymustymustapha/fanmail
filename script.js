let emailCount = 0;
const categories = ["Praise", "Question", "Collaboration", "Fan Art"];
let categoryStats = {
    Praise: 0,
    Question: 0,
    Collaboration: 0,
    "Fan Art": 0
};
let currentReplyEmail = null;

function submitName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        document.getElementById('namePrompt').style.display = 'none';
        document.getElementById('mainContent').style.display = 'flex';
        document.getElementById('userName').textContent = name;
        updateCategoryFilter();
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
    const category = categories[Math.floor(Math.random() * categories.length)];

    categoryStats[category]++;

    const subject = `Fan Mail #${++emailCount} [${category}]`;
    const content = `${greeting} ${adjective} ${noun},<br><br>
                     ${compliment}<br><br>
                     ${closing},<br>
                     Your biggest fan`;

    addEmailToList(subject, content, category);
    updateStats();
}

function addEmailToList(subject, content, category) {
    const emailList = document.getElementById('emailList');
    const emailItem = document.createElement('div');
    emailItem.className = 'email-item';
    emailItem.dataset.category = category;
    emailItem.innerHTML = `
        <div class="email-subject">${subject}</div>
        <div class="email-content">
            ${content}
            <button onclick="openReplyModal(this.parentNode.parentNode)">Reply</button>
            <div class="reply-content" style="display:none;"></div>
        </div>
    `;
    emailItem.addEventListener('click', function() {
        this.classList.toggle('open');
    });
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