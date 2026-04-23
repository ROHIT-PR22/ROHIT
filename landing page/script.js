const profiles = [
    {
        name: "Jane Doe",
        age: 25,
        image: "https://via.placeholder.com/400x400?text=Jane"
    },
    {
        name: "John Smith",
        age: 28,
        image: "https://via.placeholder.com/400x400?text=John"
    },
    {
        name: "Alice Johnson",
        age: 22,
        image: "https://via.placeholder.com/400x400?text=Alice"
    }
];

let currentIndex = 0;

// Function to create a profile card dynamically
function createCard(profile) {
    const cardContainer = document.getElementById('card-container');
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}">
        <div class="card-content">
            <h2>${profile.name}, ${profile.age}</h2>
        </div>
    `;
    
    // Insert the new card at the top of the container
    cardContainer.appendChild(card);
    
    // Swipe logic
    let offsetX = 0;
    
    card.addEventListener('mousedown', (e) => {
        offsetX = e.clientX;
    });
    
    card.addEventListener('mouseup', (e) => {
        const swipeDistance = e.clientX - offsetX;
        
        if (swipeDistance > 100) {
            handleLike(card);
        } else if (swipeDistance < -100) {
            handleDislike(card);
        }
    });
}

// Function to handle Like button click
function handleLike(card) {
    card.style.transform = 'translateX(200%)';
    setTimeout(() => {
        card.remove();
        showNextProfile();
    }, 300);
}

// Function to handle Dislike button click
function handleDislike(card) {
    card.style.transform = 'translateX(-200%)';
    setTimeout(() => {
        card.remove();
        showNextProfile();
    }, 300);
}

// Show the next profile in the list
function showNextProfile() {
    if (currentIndex < profiles.length) {
        createCard(profiles[currentIndex]);
        currentIndex++;
    } else {
        alert('No more profiles!');
    }
}

// Button click listeners
document.getElementById('likeBtn').addEventListener('click', () => {
    const card = document.querySelector('.card:last-child');
    handleLike(card);
});

document.getElementById('dislikeBtn').addEventListener('click', () => {
    const card = document.querySelector('.card:last-child');
    handleDislike(card);
});

// Show the first profile on page load
showNextProfile();