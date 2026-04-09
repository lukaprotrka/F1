// Guide Module - Tires and Flags
document.addEventListener('DOMContentLoaded', function() {
    initGuide();
});

function initGuide() {
    loadTires();
    loadFlags();
}

// Tire data
const tireData = [
    {
        name: 'Soft',
        color: '#e10600',
        image: 'images/tires/soft.svg',
        description: 'Fastest but least durable',
        durability: 'Low',
        usage: 'Qualifying, short stints',
        details: 'The softest compound offers maximum grip but wears quickly.'
    },
    {
        name: 'Medium',
        color: '#ffb800',
        image: 'images/tires/medium.svg',
        description: 'Balanced performance',
        durability: 'Medium',
        usage: 'Race strategy balance',
        details: 'A versatile compound that balances speed and durability.'
    },
    {
        name: 'Hard',
        color: '#ffffff',
        image: 'images/tires/hard.svg',
        description: 'Most durable compound',
        durability: 'High',
        usage: 'Long race stints',
        details: 'The hardest compound lasts the longest but provides less grip.'
    },
    {
        name: 'Intermediate',
        color: '#00d084',
        image: 'images/tires/intermediate.svg',
        description: 'For light rain/drying track',
        durability: 'Medium',
        usage: 'Damp conditions',
        details: 'Green-striped tires for damp conditions.'
    },
    {
        name: 'Wet',
        color: '#0090ff',
        image: 'images/tires/full_wet.svg',
        description: 'For heavy rain',
        durability: 'High',
        usage: 'Heavy wet conditions',
        details: 'Full wet tires for heavy rain.'
    }
];


// Flag data
const flagData = [
    {
        image: 'images/flags/checkered.svg',
        name: 'Chequered Flag',
        color: 'Black & White',
        description: 'Race finished - shown to race winner and all cars crossing the line after.'
    },
    {
        image: 'images/flags/red.svg',
        name: 'Red Flag',
        color: 'Red',
        description: 'Session stopped - drivers must return to pit lane immediately due to dangerous conditions.'
    },
    {
        image: 'images/flags/yellow.svg',
        name: 'Yellow Flag',
        color: 'Yellow',
        description: 'Danger ahead - no overtaking, reduce speed. Can be single or double waved for severity.'
    },
    {
        image: 'images/flags/green.svg',
        name: 'Green Flag',
        color: 'Green',
        description: 'Track is clear - racing can resume, often shown after yellow flag zones.'
    },
    {
        image: 'images/flags/blue.svg',
        name: 'Blue Flag',
        color: 'Blue',
        description: 'Faster car approaching - driver must let faster car pass within three flags shown.'
    },
    {
        image: 'images/flags/black.svg',
        name: 'Black Flag',
        color: 'Black',
        description: 'Disqualification - driver must return to pits immediately, shown with car number.'
    },
    {
        image: 'images/flags/white.svg',
        name: 'White Flag',
        color: 'White',
        description: 'Slow driver ahead.'
    },
    {
        image: 'images/flags/black_white.svg',
        name: 'Black & White Flag',
        color: 'Diagonal',
        description: 'Warning for unsportsmanlike behavior - final warning before penalties.'
    },
    {
        image: 'images/flags/black_orange.svg',
        name: 'Black/Orange Flag',
        color: 'Black + Orange',
        description: 'Mechanical problem - car has damage and must pit for repairs.'
    },
    {
        image: 'images/flags/yellow_red_stripes.svg',
        name: 'Yellow Flag with Red Stripes',
        color: 'Yellow + Red',
        description: 'Shown to inform drivers that there has been a deterioration in grip levels on the track ahead'
    },
    {
        image: 'images/flags/code60.svg',
        name: 'Code 60',
        color: 'Pink',
        description: 'Slow down to 60 km/h (37 mph). No overtaking.'
    },
];

const penaltyData = [
    {
        name: '5 / 10s Time Penalty',
        description: 'Aditional time is added to the drivers total time at end of a race.',
        usage: 'Given for infractions like track limits or unsafe releases.',
        impact: 'Loses positions if close to rivals.'
    },
    {
        name: 'Drive-Through Penalty',
        description: 'Driver must go through pit lane without stopping while obeying all pit lane speed limits.',
        usage: 'Medium breaches (yellow flag ignore, pit speed)',
        impact: 'Loses significant time, often 20+ seconds.'
    },
    {
        name: 'Pit Lane Speed Limit Penalty',
        description: 'Driver must spend extra time in the pit lane.(3s per km/h over limit)',
        usage: 'Speeding in pit lane (>80 km/h)',
        impact: 'Minimal but stacks up if repeated.'
    },
    {
        name: 'Stop-Go Penalty',
        description: 'Driver serves the penalty by stopping in their pit box for a set time before the mechanics can work on the car.',
        usage: 'Serious incidents (contact, blocking)',
        impact: 'Loses significant time, often 30+ seconds.'
    },
    {
        name: 'Grid Drop Penalty',
        description: 'Driver must drop a number of grid positions (e.g., 3 positions).',
        usage: 'Engine changes, car damage to others',
        impact: 'Loses starting position in the next race (up to 20+ places back)'
    },
    {
        name: 'Disqualification',
        description: 'Driver is fully excluded from participating in the race / race results.',
        usage: 'Severe infractions (e.g., dangerous driving, intentional damage, tech violations)',
        impact: 'Driver is removed from the race and cannot score points. Often also includes investigation for further sanctions.'
    },
];

function loadTires() {
    const tireGrid = document.getElementById('tireGrid');
    if (!tireGrid) return;
    
    tireGrid.innerHTML = '';
    
    tireData.forEach(tire => {
        const tireCard = document.createElement('div');
        tireCard.className = 'tire-card';
        
        tireCard.innerHTML = `
            <div class="tire-visual" style="border-color: ${tire.color};">
                <img class="tire-icon" src="${tire.image}" alt="${tire.name} tire">
            </div>
            <h3>${tire.name}</h3>
            <p>${tire.description}</p>
            <div class="tire-details">
                <p><strong>Durability:</strong> ${tire.durability}</p>
                <p><strong>Usage:</strong> ${tire.usage}</p>
                <p style="margin-top: 1rem; line-height: 1.6;">${tire.details}</p>
            </div>
        `;
        
        // Toggle details on click
        tireCard.addEventListener('click', function() {
            document.querySelectorAll('.tire-card').forEach(card => {
                if (card !== tireCard) {
                    card.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
        });
        
        tireGrid.appendChild(tireCard);
    });
}

function loadPenalties() {
    const penaltyGrid = document.getElementById('penaltyGrid');
    if (!penaltyGrid) return;
    
    penaltyGrid.innerHTML = '';
    
    penaltyData.forEach(penalty => {
        const penaltyCard = document.createElement('div');
        penaltyCard.className = 'penalty-card';
        
        penaltyCard.innerHTML = `
            <h3>${penalty.name}</h3>
            <p class="penalty-desc">${penalty.description}</p>
            <div class="penalty-details">
                <p><strong>Usage:</strong> ${penalty.usage}</p>
                <p><strong>Impact:</strong> ${penalty.impact}</p>
            </div>
        `;
        
        // Toggle details on click (same interactive behavior as tires)
        penaltyCard.addEventListener('click', function() {
            document.querySelectorAll('.penalty-card').forEach(card => {
                if (card !== penaltyCard) {
                    card.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
        });
        
        penaltyGrid.appendChild(penaltyCard);
    });
}
// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    loadPenalties();
});


function loadFlags() {
    const flagsGrid = document.getElementById('flagsGrid');
    if (!flagsGrid) return;
    
    flagsGrid.innerHTML = '';
    
    flagData.forEach(flag => {
        const flagCard = document.createElement('div');
        flagCard.className = 'flag-card';
        
        flagCard.innerHTML = `
            <img class="flag-image" src="${flag.image}" alt="${flag.name} flag">
            <h4>${flag.name}</h4>
            <p>${flag.description}</p>
        `;
        
        flagsGrid.appendChild(flagCard);
    });
}