// Drivers Module
let driversData = [];
let teamsData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadDrivers();
    loadTeams();
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

async function loadTeams() {
    try {
        const response = await fetch('data/teams.json');
        teamsData = await response.json();
    } catch (error) {
        console.error('Error loading teams:', error);
    }
}

function displayDrivers(drivers) {
    const driversGrid = document.getElementById('driversGrid');
    if (!driversGrid) return;
    
    driversGrid.innerHTML = '';
    
    // Remove centering when showing all drivers
    driversGrid.classList.remove('team-filtered');
    
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
        
        driverCard.addEventListener('click', function() {
            showDriverDetails(driver);
        });
        
        driversGrid.appendChild(driverCard);
    });
}

function showDriverDetails(driver) {
    const modal = document.getElementById('driverModal');
    const driverDetail = document.getElementById('driverDetail');
    
    driverDetail.innerHTML = `
        <h2>${driver.name}</h2>
        
        <div style="margin: 2rem 0;">
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1rem;">
                <img src="${driver.flag}" alt="${driver.country}" style="width: 24px; height: 16px; margin-right: 8px; vertical-align: middle;">
                ${driver.country} • #${driver.number}
            </p>
            <div style="margin-top: 2rem; text-align: center;">
                <img 
                    src="${driver.image}" 
                    alt="${driver.name}" 
                    style="width: 100%; max-width: 200px; border-radius: 16px; margin-top: 1rem;"
                >
            </div>
            
        </div>
        
        <div style="background: var(--bg-secondary); padding: 2rem; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); border-radius: 12px;">
            <h3 style="margin-bottom: 1rem;">Career Statistics</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">F1 Debut</p>
                    <p style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">${driver.debut}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Championships</p>
                    <p style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">${driver.championships}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Race Wins</p>
                    <p style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">${driver.wins}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Podiums</p>
                    <p style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">${driver.podiums}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Pole Positions</p>
                    <p style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">${driver.poles}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Fastest Laps</p>
                    <p style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">${driver.fastestLaps}</p>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem;">Current Team</h3>
            <p style="font-size: 1.2rem; color: var(--accent-color); font-weight: bold;">${driver.team}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem;">About ${driver.name.split(' ')[0]}</h3>
            <p style="line-height: 1.8; color: var(--text-secondary);">${driver.bio}</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
            showTeamInfoCard(team);
            
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
            hideTeamInfoCard();
            
            document.querySelectorAll('.team-filter .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    }
}

function filterDriversByTeam(team) {
    const driverCards = document.querySelectorAll('.driver-card');
    const driversGrid = document.getElementById('driversGrid');
    
    driverCards.forEach(card => {
        const cardTeam = card.getAttribute('data-team');
        
        if (cardTeam === team) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Center the drivers when a specific team is selected
    if (driversGrid) {
        driversGrid.classList.add('team-filtered');
    }
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

function showTeamInfoCard(teamName) {
    const teamInfoCard = document.getElementById('teamInfoCard');
    if (!teamInfoCard) return;
    
    const team = teamsData.find(t => t.name === teamName);
    if (!team) return;
    
    teamInfoCard.innerHTML = `
        <img src="${team.image}" alt="${team.name}" class="team-info-image">
        <div class="team-info-content">
            <h2>${team.fullName}</h2>
            <p><strong>Base:</strong> ${team.base}</p>
            <p><strong>Founded:</strong> ${team.founded}</p>
            <p><strong>Engine:</strong> ${team.engine}</p>
            <p><strong>Chassis:</strong> ${team.chassis}</p>
            <p><strong>Drivers:</strong> ${team.drivers.join(', ')}</p>
            <p>${team.description}</p>
            
            <div class="team-stats">
                <div class="team-stat">
                    <span class="stat-value">${team.championships}</span>
                    <div class="stat-label">Championships</div>
                </div>
                <div class="team-stat">
                    <span class="stat-value">${team.wins}</span>
                    <div class="stat-label">Race Wins</div>
                </div>
                <div class="team-stat">
                    <span class="stat-value">${team.poles}</span>
                    <div class="stat-label">Pole Positions</div>
                </div>
                <div class="team-stat">
                    <span class="stat-value">${team.fastestLaps}</span>
                    <div class="stat-label">Fastest Laps</div>
                </div>
            </div>
        </div>
    `;
    
    teamInfoCard.style.display = 'grid';
}

function hideTeamInfoCard() {
    const teamInfoCard = document.getElementById('teamInfoCard');
    if (teamInfoCard) {
        teamInfoCard.style.display = 'none';
    }
}

// Modal event handlers
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('driverModal');
    const closeBtn = document.getElementById('closeDriverModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
