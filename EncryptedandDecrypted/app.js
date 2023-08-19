document.addEventListener("DOMContentLoaded", function () {
    const encBtn = document.getElementById("enc-btn");
    const decBtn = document.getElementById("dec-btn");
    const messageTextarea = document.getElementById("message");
    const keyInput = document.getElementById("key");
    const resultDiv = document.getElementById("result");

    encBtn.addEventListener("click", () => {
        const message = messageTextarea.value;
        const key = keyInput.value;

        if (message && key) {
            const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
            resultDiv.textContent = `Encrypted Message: ${encryptedMessage}`;
        } else {
            resultDiv.textContent = "Please enter both message and key.";
        }
    });

    decBtn.addEventListener("click", () => {
        const encryptedMessage = resultDiv.textContent.split(": ")[1];
        const key = keyInput.value;

        if (encryptedMessage && key) {
            try {
                const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
                resultDiv.textContent = `Decrypted Message: ${decryptedMessage}`;
            } catch (error) {
                resultDiv.textContent = "Decryption failed. Invalid key or message.";
            }
        } else {
            resultDiv.textContent = "Please encrypt a message first.";
        }
    });
});