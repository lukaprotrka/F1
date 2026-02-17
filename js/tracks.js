// Tracks Module
let tracksData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadTracks();
    setupMonthFilters();
});

async function loadTracks() {
    try {
        const response = await fetch('data/tracks.json');
        tracksData = await response.json();
        displayTracks(tracksData);
    } catch (error) {
        console.error('Error loading tracks:', error);
        displayTracksError();
    }
}

function displayTracks(tracks) {
    const tracksGrid = document.getElementById('tracksGrid');
    if (!tracksGrid) return;
    
    tracksGrid.innerHTML = '';
    
    tracks.forEach(track => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-card';
        
        const date = new Date(track.date);
        const month = date.getMonth() + 1;
        trackCard.setAttribute('data-month', month);
        
        trackCard.innerHTML = `
            <div class="track-date">${formatDate(track.date)}</div>
            <h3 class="track-name">${track.name}</h3>
            <p class="track-location">📍 ${track.location}</p>
            <div class="track-info">
                <span>🏁 ${track.laps} laps</span>
                <span>📏 ${track.length}</span>
                <span>🔄 ${track.turns} turns</span>
            </div>
        `;
        
        // Click to show details
        trackCard.addEventListener('click', function() {
            showTrackDetails(track);
        });
        
        tracksGrid.appendChild(trackCard);
    });
}

function setupMonthFilters() {
    const monthButtons = document.querySelectorAll('.month-filter .filter-btn');
    
    monthButtons.forEach(button => {
        button.addEventListener('click', function() {
            const month = this.getAttribute('data-month');
            
            // Update active state
            monthButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter tracks
            filterTracksByMonth(month);
        });
    });
}

function filterTracksByMonth(month) {
    const trackCards = document.querySelectorAll('.track-card');
    
    trackCards.forEach(card => {
        const cardMonth = card.getAttribute('data-month');
        
        if (month === 'all' || cardMonth === month) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function showTrackDetails(track) {
    const modal = document.getElementById('trackModal');
    const trackDetail = document.getElementById('trackDetail');
    
    trackDetail.innerHTML = `
        <h2>${track.name}</h2>
        
        <div style="margin: 2rem 0;">
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1rem;">
                📍 ${track.location}
            </p>
            <div style="margin-top: 2rem; text-align: center;">
                <img 
                    src="${track.image}" 
                    alt="${track.name}" 
                    style="width: 100%; max-width: 600px; border-radius: 16px; margin-top: 1rem;"
                >
            </div>
            
        </div>
        
        <div style="background: var(--bg-secondary); padding: 2rem; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); border-radius: 12px;">
            <h3 style="margin-bottom: 1rem;">Track Statistics</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Circuit Length</p>
                    <p style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">${track.length}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Number of Laps</p>
                    <p style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">${track.laps}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Turns</p>
                    <p style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">${track.turns}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">First GP</p>
                    <p style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">${track.firstGP}</p>
                </div>
            </div>
        </div>
        <p style="font-size: 1rem; color: var(--accent-color); margin-bottom: 2rem;">
                Race Date: ${formatDate(track.date)}
        </p>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem;">About This Circuit</h3>
            <p style="line-height: 1.8; color: var(--text-secondary);">${track.description}</p>
        </div>
        
        <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px;">
            <h4 style="margin-bottom: 0.5rem;">⏱️ Lap Record</h4>
            <p style="color: var(--text-secondary);">${track.lapRecord}</p>
        </div>

        
    `;
    
    modal.classList.add('active');
}


// Close modal
document.getElementById('closeTrackModal').addEventListener('click', function() {
    document.getElementById('trackModal').classList.remove('active');
});

// Close modal on outside click
document.getElementById('trackModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Lap animation function
window.animateLap = function() {
    const lapCar = document.getElementById('lapCar');
    if (!lapCar) return;
    
    const container = document.getElementById('trackAnimation');
    const containerWidth = container.offsetWidth;
    
    lapCar.style.left = '0px';
    lapCar.style.transition = 'left 3s linear';
    
    // Trigger animation
    setTimeout(() => {
        lapCar.style.left = (containerWidth - 20) + 'px';
    }, 50);
    
    // Reset after animation
    setTimeout(() => {
        lapCar.style.transition = 'none';
        lapCar.style.left = '0px';
    }, 3100);
};

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function displayTracksError() {
    const tracksGrid = document.getElementById('tracksGrid');
    if (!tracksGrid) return;
    
    tracksGrid.innerHTML = `
        <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
            <h3>Unable to load tracks data</h3>
            <p>Please check your connection and try again.</p>
        </div>
    `;
}
