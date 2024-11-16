// Function to load anime list from localStorage
const loadWatchlist = () => {
    const animeList = JSON.parse(localStorage.getItem('animeWatchlist')) || [];
    return animeList;
};

// Function to save anime list to localStorage
const saveWatchlist = (animeList) => {
    localStorage.setItem('animeWatchlist', JSON.stringify(animeList));
};

// Function to render the anime list
const renderAnimeList = () => {
    const animeList = loadWatchlist();
    const animeContainer = document.getElementById('anime-list');
    animeContainer.innerHTML = '';

    animeList.forEach((anime, index) => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p>Genre: ${anime.genre}</p>
        <p>Rating: ${anime.rating}</p>
        <p>${anime.description}</p>
        <button onclick="deleteAnime(${index})">Delete</button>
      `;
        animeContainer.appendChild(animeItem);
    });
};

// Function to add anime to the list
const addAnime = (anime) => {
    const animeList = loadWatchlist();
    animeList.push(anime);
    saveWatchlist(animeList);
    renderAnimeList();
};

// Function to delete an anime from the list
const deleteAnime = (index) => {
    const animeList = loadWatchlist();
    animeList.splice(index, 1);
    saveWatchlist(animeList);
    renderAnimeList();
};

// Genre filter function
const filterByGenre = (event) => {
    const genre = event.target.value;
    const animeList = loadWatchlist();
    const filteredList = genre === 'all' ? animeList : animeList.filter(anime => anime.genre.toLowerCase() === genre.toLowerCase());

    const animeContainer = document.getElementById('anime-list');
    animeContainer.innerHTML = '';

    filteredList.forEach((anime, index) => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p>Genre: ${anime.genre}</p>
        <p>Rating: ${anime.rating}</p>
        <p>${anime.description}</p>
        <button onclick="deleteAnime(${index})">Delete</button>
      `;
        animeContainer.appendChild(animeItem);
    });
};

// Form submission handler
document.getElementById('anime-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const anime = {
        title: document.getElementById('anime-title').value,
        genre: document.getElementById('anime-genre').value,
        description: document.getElementById('anime-description').value,
        rating: document.getElementById('anime-rating').value,
        image: document.getElementById('anime-image').value
    };
    addAnime(anime);
    e.target.reset(); // Reset the form after adding
});

// Event listener for genre filtering
document.getElementById('genre-filter').addEventListener('change', filterByGenre);

// Initial render
renderAnimeList();