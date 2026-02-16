// Drivers Module
let driversData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadDrivers();
});

async function loadDrivers() {
    try {
        const response = await fetch('data/drivers.json');
        driversData = await response.json();
        displayDrivers(driversData);
        createTeamFilters();
    } catch (error) {
        console.error('Error loading drivers:', error);
        displayError();
    }
}

function displayDrivers(drivers) {
    const driversGrid = document.getElementById('driversGrid');
    if (!driversGrid) return;
    
    driversGrid.innerHTML = '';
    
    drivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.className = 'driver-card';
        driverCard.setAttribute('data-team', driver.team);
        
        driverCard.innerHTML = `
            <div class="driver-image">
                <img src="${driver.image}" alt="${driver.name}" style="width:100%;height:100%;object-fit:cover;">
                <div class="driver-number">${driver.number}</div>
            </div>
            <div class="driver-info">
                <h3 class="driver-name">${driver.name}</h3>
                <p class="driver-team">${driver.team}</p>
                <p class="driver-country">
                    <img src="${driver.flag}" alt="${driver.country}" class="flag-icon">
                    ${driver.country}
                </p>
            </div>
        `;
        
        driversGrid.appendChild(driverCard);
    });
}

function createTeamFilters() {
    const teamFilters = document.getElementById('teamFilters');
    if (!teamFilters) return;
    
    const teams = [...new Set(driversData.map(driver => driver.team))];
    teams.sort();
    
    teamFilters.innerHTML = '';
    
    teams.forEach(team => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.setAttribute('data-team', team);
        filterBtn.textContent = team;
        
        filterBtn.addEventListener('click', function() {
            filterDriversByTeam(team);
            
            document.querySelectorAll('.team-filter .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
        
        teamFilters.appendChild(filterBtn);
    });
    
    const allTeamsBtn = document.querySelector('.team-filter .filter-btn[data-team="all"]');
    if (allTeamsBtn) {
        allTeamsBtn.addEventListener('click', function() {
            displayDrivers(driversData);
            
            document.querySelectorAll('.team-filter .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    }
}

function filterDriversByTeam(team) {
    const driverCards = document.querySelectorAll('.driver-card');
    
    driverCards.forEach(card => {
        const cardTeam = card.getAttribute('data-team');
        
        if (cardTeam === team) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function displayError() {
    const driversGrid = document.getElementById('driversGrid');
    if (!driversGrid) return;
    
    driversGrid.innerHTML = `
        <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
            <h3>Unable to load drivers data</h3>
            <p>Please check your connection and try again.</p>
        </div>
    `;
}
