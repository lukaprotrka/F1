// Dictionary Module
document.addEventListener('DOMContentLoaded', function() {
    initDictionary();
});

const dictionaryTerms = [
    {
        term: 'Aerodynamics',
        definition: 'The study of airflow around the car. F1 teams spend millions optimizing aerodynamics to generate downforce while minimizing drag. Wings, diffusers, and bodywork are all carefully designed to control airflow.'
    },
    {
        term: 'Apex',
        definition: 'The innermost point of a corner. Hitting the apex correctly is crucial for carrying maximum speed through a turn. Professional drivers can hit the apex to within centimeters lap after lap.'
    },
    {
        term: 'Blistering',
        definition: 'Tire damage caused by overheating. When tires get too hot, the rubber can separate from the carcass, creating blisters. This reduces grip and requires a pit stop for fresh tires.'
    },
    {
        term: 'Chicane',
        definition: 'A tight sequence of corners in alternate directions, usually used to slow cars down. Famous chicanes include Monza\'s Variante Ascari and the final chicane at Montreal.'
    },
    {
        term: 'Deg (Degradation)',
        definition: 'The rate at which tires lose performance over a stint. Managing tire degradation is a crucial part of race strategy. Some drivers are better at preserving their tires than others.'
    },
    {
        term: 'Delta Time',
        definition: 'The time difference between laps or sectors. Teams constantly monitor delta times to track performance. A positive delta means you\'re slower, negative means faster.'
    },
    {
        term: 'Dirty Air',
        definition: 'Turbulent air created by cars ahead. Following in dirty air reduces downforce by up to 35%, making overtaking difficult. This is why qualifying position is so important.'
    },
    {
        term: 'Downforce',
        definition: 'Aerodynamic force pushing the car down onto the track. More downforce means faster cornering speeds but lower top speed. Teams constantly balance downforce vs. drag.'
    },
    {
        term: 'ERS (Energy Recovery System)',
        definition: 'Hybrid system that recovers energy from braking and exhaust heat. The MGU-K harvests energy from the rear axle, while the MGU-H recovers from the turbocharger. Drivers can deploy this for power boosts.'
    },
    {
        term: 'Flat Spot',
        definition: 'A flat area on the tire caused by locking up and sliding. Flat spots create vibration and reduce grip. Severe flat spots can require a pit stop for new tires.'
    },
    {
        term: 'Formation Lap',
        definition: 'The lap before the race start where cars form up on the grid. Drivers weave to warm their tires and test their brakes. The race officially starts when they complete this lap.'
    },
    {
        term: 'Graining',
        definition: 'When small pieces of rubber peel off the tire surface, reducing grip. This usually happens when tires are too cold or used outside their optimal temperature window.'
    },
    {
        term: 'Halo',
        definition: 'Titanium protection device above the cockpit, introduced in 2018. The halo has already saved multiple lives in crashes. It can withstand the weight of a double-decker bus.'
    },
    {
        term: 'Marbles',
        definition: 'Pieces of rubber debris off the racing line. Marbles are extremely slippery and can cause cars to lose grip. They accumulate throughout the race as tires shed rubber.'
    },
    {
        term: 'Out-lap',
        definition: 'The lap taken to exit the pits and return to the track. Teams analyze out-laps to understand how quickly tires come up to temperature. A good out-lap is crucial after pit stops.'
    },
    {
        term: 'Oversteer',
        definition: 'When the rear of the car loses grip before the front. This makes the rear slide outward in corners. Some drivers prefer slight oversteer for faster corner entry.'
    },
    {
        term: 'Parc Fermé',
        definition: 'French for "closed park". After qualifying, cars must remain in parc fermé overnight where no setup changes are allowed. This ensures cars race in qualifying specification.'
    },
    {
        term: 'Porpoising',
        definition: 'Bouncing motion caused by ground effect aerodynamics. Introduced with 2022 regulations, porpoising occurs when airflow under the car stalls and recovers rapidly. Teams work hard to eliminate it.'
    },
    {
        term: 'Power Unit',
        definition: 'The complete engine package including the 1.6L V6 turbo engine, MGU-K, MGU-H, turbocharger, and energy store. Modern F1 power units are the most efficient engines in motorsport.'
    },
    {
        term: 'Rake',
        definition: 'The angle of the car from front to rear. High rake means the rear is higher than the front. Different teams prefer different rake philosophies for aerodynamic performance.'
    },
    {
        term: 'Slipstream',
        definition: 'Following closely behind another car to reduce drag. The lead car punches a hole in the air, allowing the following car to go faster. Essential for overtaking on straights.'
    },
    {
        term: 'Stint',
        definition: 'The period between pit stops. Race strategy involves planning how many stints to run and which tires to use. A typical race has 1-3 stops, creating 2-4 stints.'
    },
    {
        term: 'Tow',
        definition: 'Similar to slipstream. Being "in the tow" means following closely to benefit from reduced drag. A good tow can provide 10-15 km/h extra speed on straights.'
    },
    {
        term: 'Track Evolution',
        definition: 'How the track surface changes during a session. As rubber is laid down, grip increases. Weather changes also cause track evolution. Understanding evolution is key to strategy.'
    },
    {
        term: 'Undercut',
        definition: 'Pit stop strategy where you stop before your rival. Fresh tires allow you to set faster laps and potentially jump ahead when your rival pits. Timing is crucial for a successful undercut.'
    },
    {
        term: 'Understeer',
        definition: 'When the front tires lose grip before the rear. The car doesn\'t turn as much as the driver wants. Also called "push" in American racing. Teams work to eliminate understeer.'
    },
    {
        term: 'VSC (Virtual Safety Car)',
        definition: 'Digital safety car that limits speeds without deploying the actual Safety Car. Drivers must slow to a delta time. The VSC maintains gaps between cars better than a full Safety Car.'
    },
    {
        term: 'Warm-up Lap',
        definition: 'Another term for the formation lap. Drivers warm up their tires and brakes before the race start. Teams monitor tire and brake temperatures during this lap.'
    }
];

function initDictionary() {
    displayDictionary(dictionaryTerms);
    setupSearch();
}

function displayDictionary(terms) {
    const dictionaryGrid = document.getElementById('dictionaryGrid');
    if (!dictionaryGrid) return;
    
    dictionaryGrid.innerHTML = '';
    
    // Sort terms alphabetically
    const sortedTerms = terms.sort((a, b) => a.term.localeCompare(b.term));
    
    sortedTerms.forEach(item => {
        const termCard = document.createElement('div');
        termCard.className = 'dictionary-term';
        
        termCard.innerHTML = `
            <div class="term-title">
                <h3>${item.term}</h3>
                <span class="term-toggle">▼</span>
            </div>
            <div class="term-definition">
                ${item.definition}
            </div>
        `;
        
        // Toggle definition
        termCard.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        dictionaryGrid.appendChild(termCard);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('dictionarySearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            displayDictionary(dictionaryTerms);
        } else {
            const filtered = dictionaryTerms.filter(item => 
                item.term.toLowerCase().includes(searchTerm) || 
                item.definition.toLowerCase().includes(searchTerm)
            );
            displayDictionary(filtered);
        }
    });
}
