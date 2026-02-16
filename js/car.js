// Car Guide Module
document.addEventListener('DOMContentLoaded', function() {
    initCarGuide();
});

const carParts = {
    'front-wing': {
        name: 'Front Wing',
        description: 'The front wing is the first point where air hits the car. It generates around 25-30% of the car\'s total downforce and directs airflow around and under the car. Modern front wings have multiple elements and can be adjusted to change the car\'s balance. Teams can modify the wing angle to suit different circuits.'
    },
    'nose': {
        name: 'Nose Cone',
        description: 'The nose cone connects the front wing to the main chassis. It must pass strict crash tests to protect the driver. The shape is crucial for directing airflow to the floor and sidepods. Teams experiment with different nose designs to optimize aerodynamics while meeting safety regulations.'
    },
    'cockpit': {
        name: 'Cockpit',
        description: 'The cockpit houses the driver and must meet strict safety requirements. The survival cell is made from carbon fiber and designed to protect the driver in crashes. The steering wheel contains over 20 buttons and switches for controlling various car systems. Drivers sit in a custom-molded seat for maximum support.'
    },
    'sidepods': {
        name: 'Sidepods',
        description: 'Sidepods house the radiators that cool the engine and other systems. Their shape is critical for directing air to the rear of the car and creating downforce. Teams spend huge resources optimizing sidepod design. The 2022 regulations allowed radical sidepod designs like Mercedes\' "zero-pod" concept.'
    },
    'engine': {
        name: 'Power Unit',
        description: 'The 1.6-liter V6 turbo hybrid power unit is one of the most efficient engines ever made. It produces over 1000 horsepower combined with the hybrid system. The MGU-K recovers energy under braking, while the MGU-H harvests from the turbocharger. These engines can run at over 50% thermal efficiency.'
    },
    'rear-wing': {
        name: 'Rear Wing',
        description: 'The rear wing generates the most downforce of any single component, producing 25-30% of total downforce. It features a DRS (Drag Reduction System) flap that opens to reduce drag and increase straight-line speed. The wing angle can be adjusted to balance downforce versus top speed for different circuits.'
    },
    'tires': {
        name: 'Tires',
        description: 'F1 tires are the only part of the car touching the track. Pirelli supplies five dry compounds (C1-C5) plus intermediate and wet tires. Each compound offers different performance vs. durability trade-offs. Tire management is crucial for race strategy. Teams can choose tire pressures and camber angles to optimize performance.'
    }
};

function initCarGuide() {
    const carParts = document.querySelectorAll('.car-part');
    
    carParts.forEach(part => {
        part.addEventListener('click', function() {
            const partName = this.getAttribute('data-part');
            showCarPartInfo(partName);
            
            // Highlight selected part
            document.querySelectorAll('.car-part').forEach(p => {
                p.classList.remove('active');
            });
            this.classList.add('active');
        });
        
        // Hover effect
        part.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        part.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

function showCarPartInfo(partName) {
    const carInfo = document.getElementById('carInfo');
    if (!carInfo) return;
    
    const partData = window.carParts && window.carParts[partName] ? window.carParts[partName] : carParts[partName];
    
    if (partData) {
        carInfo.innerHTML = `
            <h2>${partData.name}</h2>
            <p>${partData.description}</p>
        `;
        
        // Add animation
        carInfo.style.animation = 'none';
        setTimeout(() => {
            carInfo.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
}

// Export for global access
window.carParts = carParts;
