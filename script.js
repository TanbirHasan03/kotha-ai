const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_KEY = "sk-your-api-key"; // এখানে তোমার আসল OpenAI API key বসাও

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';
    appendMessage('ai', 'Typing...');

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: text }]
            })
        });
        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        document.querySelector('.message.ai:last-child').textContent = aiMessage;
    } catch (error) {
        document.querySelector('.message.ai:last-child').textContent = "Sorry, something went wrong.";
    }
}
