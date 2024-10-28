let promptData = {};

// Fetch prompt data from `data.json`
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        promptData = data;
    })
    .catch(error => console.error('Error fetching prompt:', error));

const chatBox = document.getElementById('messages');

// Function to send message
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();
    if (userMessage === '') return;

    displayMessage(userMessage, 'user-message');
    inputField.value = '';

    try {
        const response = await fetch('https://api.betabotz.eu.org/api/search/openai-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: [
                    { role: 'system', content: promptData.prompt },
                    { role: 'user', content: userMessage }
                ],
                apikey: 'vw5gHq3R'
            })
        });
        
        const data = await response.json();
        if (data.result) {
            displayMessage(data.result, 'bot-message');
        } else {
            displayMessage("Kesalahan dalam mengambil data", 'bot-message');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage("Gagal menghubungi bot", 'bot-message');
    }
}

// Function to display messages in chat box
function displayMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}