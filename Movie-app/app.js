const apiKey = "Your-API-KEY"; // Use your own API key

const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const form = document.getElementById("search-form");
const query = document.getElementById("search-input");
const result = document.getElementById("result");

let currentPage = 1;
let isSearching = false;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not OK.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function searchAndShowData(url) {
    const data = await fetchData(url.toLowerCase());
    if (data && data.results) {
        displayMovieCards(data.results);
    }
}

function createCardMarkup(movie) {
    const { poster_path, original_title, release_date, overview } = movie;
    const imagePath = poster_path ? imgApi + poster_path : "./img-01.jpeg";
    const truncatedTitle = original_title.length > 15 ? `${original_title.slice(0, 15)}...` : original_title;
    const formattedDate = release_date || "No release date";

    return `
        <div class="column">
            <div class="card">
                <a class="card-media" href="${imagePath}" target="_blank">
                    <img src="${imagePath}" alt="${original_title}" width="100%" />
                </a>
                <div class="card-content">
                    <div class="card-header">
                        <div class="left-content">
                            <h3 style="font-weight: 600">${truncatedTitle}</h3>
                            <span style="color: #12efec">${formattedDate}</span>
                        </div>
                        <div class="right-content">
                            <a href="${imagePath}" target="_blank" class="card-btn">See Cover</a>
                        </div>
                    </div>
                    <div class="info">
                        ${overview || "No overview yet..."}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function clearResults() {
    result.innerHTML = "";
}

function displayMovieCards(movies) {
    const cardsMarkup = movies.map(createCardMarkup).join("");
    result.insertAdjacentHTML("beforeend", cardsMarkup || "<p>No results found.</p>");
}

async function loadMoreMovies() {
    if (isSearching) {
        return;
    }
    currentPage++;
    const searchTerm = query.value;
    const url = searchTerm
        ? `${searchUrl}${searchTerm}&page=${currentPage}`
        : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${currentPage}`;
    await searchAndShowData(url);
}

function checkIfScrollEnd() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        loadMoreMovies();
    }
}

async function handleSearch(e) {
    e.preventDefault();
    const searchTerm = query.value.trim();
    if (searchTerm) {
        isSearching = true;
        clearResults();
        const newUrl = `${searchUrl}${searchTerm}&page=${currentPage}`;
        await searchAndShowData(newUrl);
        query.value = "";
        isSearching = false;
    }
}

form.addEventListener("submit", handleSearch);
window.addEventListener("scroll", checkIfScrollEnd);
window.addEventListener("resize", checkIfScrollEnd);

async function initializeApp() {
    clearResults();
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${currentPage}`;
    await searchAndShowData(url);
}

initializeApp();


