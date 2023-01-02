const sendBtn = document.getElementById("send");
const messageInput = document.getElementById("message");
const messagesContainer = document.getElementById("messages");
console.log(`sendBtn ${sendBtn}`);
console.log(`messageInput ${messageInput}`);
console.log(`messContainer ${messagesContainer}`);

const messageHtml = ({ user, message }) => 
              `<div class="d-flex mb-3 bg-dark rounded-3 align-items-center p-3">
                    <span class=" me-2 text-capitalize">${user || 'Anonymous'}: </span>
                    <p class="lead m-0 text-white flex-grow-1">${message}</p>
               </div>`;

const socket = io();

socket.on("message broadcast", data => {
  messagesContainer.innerHTML += messageHtml(data);
})

const sendMessage = () => {
  const message = messageInput.value;
  if (message !== '') {
    messageInput.value = '';
    socket.emit("message send", message);
    messagesContainer.innerHTML += messageHtml({
      user: 'me',
      message
    });
  } else {
    alert('empty message')
  }
}

sendBtn.addEventListener("click", () => {
  sendMessage();
});

messageInput.addEventListener("keypress", (Event) => {
  if (Event.key === 'Enter')
    sendMessage()
})
