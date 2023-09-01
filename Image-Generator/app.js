const APIKey = "Use your own API KEY"

const maxImages = 4;

let selectedImageNumber = null;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableGenerateButton() {
    document.getElementById("generate-btn").disabled = true;
}

function enableGenerateButton() {
    document.getElementById("generate-btn").disabled = false;
}

function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const imageUrls = [];

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney",
                {
                    
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${APIKey}`,
                    },
                    method: "POST",
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to generate image!");
            }

            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            imageUrls.push(imgUrl);

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = `art-${i + 1}`;
            img.onclick = () => downloadImage(imgUrl, i);
            document.getElementById("image-grid").appendChild(img);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    loading.style.display = "none";
    enableGenerateButton();

    selectedImageNumber = null;
}

document.getElementById("generate-btn").addEventListener('click', () => {
    const input = document.getElementById("img-text").value;
    generateImages(input);
});

function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();
}
