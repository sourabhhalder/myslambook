console.log("System: Script link verified!");

document.getElementById('slambookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Change button text to show it's working
    const btn = document.querySelector('.submit-btn');
    const originalText = btn.innerText;
    btn.innerText = "⏳ SAVING...";
    btn.style.opacity = "0.7";

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    console.log("Attempting to connect to Node.js server at port 3000...");

    fetch('http://localhost:3000/save-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            showPopup();
        } else {
            alert("⚠️ Server error: The server is running but couldn't write the file. Is the Excel file open? Close it!");
        }
    })
    .catch(error => {
        console.error("Connection Error:", error);
        alert("❌ Connection Failed!\n1. Is your terminal showing 'SERVER IS FLYING'?\n2. Did you run 'node server.js'?");
    })
    .finally(() => {
        btn.innerText = originalText;
        btn.style.opacity = "1";
    });
});

function showPopup() {
    const popup = document.getElementById('successPopup');
    popup.style.display = 'flex';
    for (let i = 0; i < 50; i++) { createConfetti(); }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    const colors = ['#ff4791', '#00d2ff', '#7d5fff', '#3ae374'];
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: 10px;
        height: 10px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        z-index: 9999;
        border-radius: 50%;
        animation: fall ${Math.random() * 2 + 2}s linear forwards;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
}

function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.getElementById('slambookForm').reset();
}