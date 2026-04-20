/**
 * TITAN ARENA: Mission Critical Operational Engine
 * Handcrafted for 24/7 Smart Venue Intelligence.
 * Sync: Wembley Stadium (Real-time Mock Simulation)
 */

let currentSelectedStand = 'North Stand';

// --- REAL-TIME TELEMETRY ENGINE: Precise Wembley Stadium Data ---
const venueData = {
    stands: {
        'North Stand': {
            details: [
                { type: 'Gate', name: 'Turnstiles B & C', status: 'Moderate', info: '15m entry wait' },
                { type: 'Provision', name: 'Camden Town Brewery Bars', status: 'Busy', info: '12m queue' },
                { type: 'Sanitation', name: 'Level 1 Restroom 122', status: 'Optimal', info: 'Cleaned 2m ago' },
                { type: 'First Aid', name: 'Medical Post 123', status: 'Optimal', info: 'Ready' }
            ]
        },
        'South Stand': {
            details: [
                { type: 'Gate', name: 'Turnstiles J, K, & L', status: 'Optimal', info: '3m entry wait' },
                { type: 'Provision', name: 'TapHouse Social', status: 'Moderate', info: '5m queue' },
                { type: 'Sanitation', name: 'Level 1 Restroom 142', status: 'Active', info: 'Service in progress' },
                { type: 'Facility', name: 'Information Booth 111', status: 'Optimal', info: 'Staffed, Audio headsets available' }
            ]
        },
        'East Stand': {
            details: [
                { type: 'Gate', name: 'Turnstiles D & E', status: 'Danger', info: 'High volume bottleneck' },
                { type: 'Provision', name: 'Wicks Manor Sausages Kiosk', status: 'Busy', info: '18m wait' },
                { type: 'Sanitation', name: 'Level 5 Restroom 548', status: 'Optimal', info: 'Vacant' },
                { type: 'Facility', name: 'Complimentary Water Station', status: 'Optimal', info: 'Operational' }
            ]
        },
        'West Stand': {
            details: [
                { type: 'Gate', name: 'Turnstiles M & N', status: 'Modal', info: 'Consistent flow' },
                { type: 'Provision', name: 'M&S Food Store', status: 'Optimal', info: 'No queue' },
                { type: 'Sanitation', name: 'Dog Relieving Station B/M', status: 'Optimal', info: 'Clear' },
                { type: 'Accessibility', name: 'RADAR Key Toilet 134', status: 'Optimal', info: 'Available' }
            ]
        },
        'Club Wembley': {
            details: [
                { type: 'Gate', name: 'Club Wembley Entrance', status: 'Optimal', info: 'Priority access' },
                { type: 'Provision', name: 'Bobby Moore Suite', status: 'Optimal', info: 'Pre-ordered' },
                { type: 'Sanitation', name: 'Premium Level 2 CW Restroom', status: 'Optimal', info: 'Checked' },
                { type: 'Concierge', name: 'Guest Services', status: 'Optimal', info: 'Available' }
            ]
        }
    },
    gates: [
        { name: 'Turnstile A (Olympic Way)', waitTime: 8.2, intensity: 25, label: 'Optimal', inflow: 540, outflow: 85, lat: 51.5570, lng: -0.2795 },
        { name: 'Turnstile B & C (North)', waitTime: 22.5, intensity: 58, label: 'Moderate', inflow: 810, outflow: 210, lat: 51.5572, lng: -0.2808 },
        { name: 'Turnstile D & E (East)', waitTime: 38.0, intensity: 85, label: 'Dense', inflow: 1050, outflow: 190, lat: 51.5563, lng: -0.2775 },
        { name: 'Turnstiles J-L (South)', waitTime: 48.5, intensity: 98, label: 'Critical', inflow: 1120, outflow: 45, lat: 51.5548, lng: -0.2795 },
        { name: 'Turnstiles M & N (West)', waitTime: 12.0, intensity: 45, label: 'Moderate', inflow: 220, outflow: 400, lat: 51.5558, lng: -0.2818 },
        { name: 'Club Wembley VIP', waitTime: 2.5, intensity: 10, label: 'Clear', inflow: 45, outflow: 10, lat: 51.5565, lng: -0.2810 }
    ],
    analytics: {
        totalAttendance: 85400,
        capacity: 90000,
        peakInflow: 3785,
        netFlux: 3100,
        status: 'Surge Warning',
        temperature: 18.2,
        weather: 'Clear Skies'
    }
};

// --- DOM CACHE ---
const elements = {
    get themeToggle() { return document.getElementById('themeToggle'); },
    get detailsGrid() { return document.getElementById('detailsGrid'); },
    get standNav() { return document.getElementById('standNav'); },
    get gateList() { return document.getElementById('gateList'); },
    get chatbotToggle() { return document.getElementById('chatbotToggle'); },
    get chatWindow() { return document.getElementById('chatWindow'); },
    get chatBody() { return document.getElementById('chatBody'); },
    get chatInput() { return document.getElementById('chatInput'); },
    get chatSubmit() { return document.getElementById('chatSendBtn'); },
    get emergencyBtn() { return document.getElementById('emergencyBtn'); },
    get analyticsOverview() { return document.getElementById('analyticsOverview'); },
    get aiInsights() { return document.getElementById('aiInsightsOverview'); }
};

let map;

// --- SEMANTIC LOGIC: Color Controllers ---
function getSemanticColor(waitTime) {
    if (waitTime < 10) return 'var(--clr-status-low)';    // Titan Green
    if (waitTime < 25) return 'var(--clr-status-med)';   // Titan Yellow
    if (waitTime < 45) return 'var(--clr-status-high)';  // Titan Orange
    return 'var(--clr-status-danger)';                   // Titan Red
}

// --- INITIALIZATION ---
function init() {
    console.log("[TITAN ARENA] Booting Tactical Engine...");
    
    // Mission Critical: Initialize Satellite Telemetry
    initMap().catch(err => console.error("[TITAN] Map Boot Failed:", err));

    renderGates();
    renderAnalytics();
    renderAIInsights();
    selectStand('North Stand');
    setupEventListeners();
    updateClock();
    
    // Realtime Simulation loop
    setInterval(updateClock, 1000);
    setInterval(simulateRealtimeData, 10000); // 10-second simulation tick
}

let gateMarkers = [];

function getMarkerColor(waitTime) {
    if (waitTime < 10) return '#22c55e';   // Green - Optimal
    if (waitTime < 25) return '#eab308';   // Yellow - Moderate
    if (waitTime < 45) return '#f97316';   // Orange - Dense
    return '#ef4444';                       // Red - Critical
}

async function initMap() {
    const arenaLocation = { lat: 51.5560, lng: -0.2796 }; // Wembley Stadium
    
    try {
        // Modern approach: Import required libraries
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        map = new Map(document.querySelector('.vmap-container'), {
            zoom: 17,
            center: arenaLocation,
            mapTypeId: 'satellite',
            tilt: 45,
            disableDefaultUI: true,
            mapId: "DEMO_MAP_ID" // Required for AdvancedMarkerElement
        });

        // Store the class for use in other functions
        window.AdvancedMarkerElement = AdvancedMarkerElement;
        
        addGateMarkers();
        
        // Add map click listener
        map.addListener('click', () => {
            if (activeInfoWindow) {
                activeInfoWindow.close();
                activeInfoWindow = null;
            }
        });

    } catch (e) {
        console.error("[TITAN MAP] Initialization failed:", e);
        const placeholder = document.querySelector('.placeholder-map');
        if (placeholder) placeholder.innerText = "MAP INITIALIZATION ERROR: CHECK API ENABLEMENT";
    }
}

let activeInfoWindow = null;

function addGateMarkers() {
    if (!map || !window.AdvancedMarkerElement) {
        console.warn("[TITAN] Map or Marker library not ready.");
        return;
    }
    
    // Clear previous markers
    gateMarkers.forEach(m => m.setMap(null));
    gateMarkers = [];

    venueData.gates.forEach(gate => {
        const color = getMarkerColor(gate.waitTime);
        // Create modern AdvancedMarkerElement
        const markerPin = document.createElement('div');
        markerPin.style.width = '24px';
        markerPin.style.height = '24px';
        markerPin.style.borderRadius = '50%';
        markerPin.style.backgroundColor = color;
        markerPin.style.border = '2px solid white';
        markerPin.style.display = 'flex';
        markerPin.style.alignItems = 'center';
        markerPin.style.justifyContent = 'center';
        markerPin.style.color = 'white';
        markerPin.style.fontSize = '9px';
        markerPin.style.fontWeight = '900';
        markerPin.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        markerPin.innerText = `${gate.intensity.toFixed(0)}%`;

        const marker = new window.AdvancedMarkerElement({
            position: { lat: gate.lat, lng: gate.lng },
            map: map,
            title: `${gate.name} — ${gate.label}`,
            content: markerPin
        });

        const infoContent = `
            <div style="font-family: 'Inter', sans-serif; padding: 6px 4px; min-width: 180px;">
                <div style="font-size: 14px; font-weight: 800; margin-bottom: 6px; color: #1a1a1a; border-bottom: 2px solid ${color}; padding-bottom: 5px;">${gate.name}</div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                    <span style="font-size: 11px; color: #666;">Status</span>
                    <b style="font-size: 11px; color:${color};">${gate.label}</b>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                    <span style="font-size: 11px; color: #666;">Wait Time</span>
                    <b style="font-size: 11px;">${gate.waitTime.toFixed(1)}m</b>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                    <span style="font-size: 11px; color: #666;">Intensity</span>
                    <b style="font-size: 11px;">${gate.intensity.toFixed(0)}%</b>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 6px; padding-top: 5px; border-top: 1px solid #eee;">
                    <span style="font-size: 11px; color: #22c55e; font-weight: 700;">▼ In: ${gate.inflow}</span>
                    <span style="font-size: 11px; color: #ef4444; font-weight: 700;">▲ Out: ${gate.outflow}</span>
                </div>
            </div>
        `;

        marker.addListener('click', () => {
            // Close any previously open InfoWindow
            if (activeInfoWindow) activeInfoWindow.close();
            
            const infoWindow = new google.maps.InfoWindow({ 
                content: infoContent,
                disableAutoPan: false
            });
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
        });

        gateMarkers.push(marker);
    });

    // Click anywhere on the map to dismiss active popup
    google.maps.event.clearListeners(map, 'click');
    map.addListener('click', () => {
        if (activeInfoWindow) {
            activeInfoWindow.close();
            activeInfoWindow = null;
        }
    });
}

// --- SIMULATION (REAL-TIME MOCK) ---
function simulateRealtimeData() {
    console.log("[TELEMETRY] Incoming sync...");
    
    // Fluctuate Attendance slightly
    venueData.analytics.totalAttendance = Math.min(venueData.analytics.capacity, venueData.analytics.totalAttendance + Math.floor(Math.random() * 80 - 20));
    
    // Fluctuate Temperature
    venueData.analytics.temperature = Math.round((venueData.analytics.temperature + (Math.random() * 0.2 - 0.1)) * 10) / 10;
    
    let totalInflow = 0;
    let totalOutflow = 0;

    venueData.gates.forEach(gate => {
        // Shift Wait Times
        gate.waitTime = Math.max(0, gate.waitTime + (Math.random() * 6 - 3)); 
        
        // Intensity & Label mapping
        if (gate.waitTime < 10) { 
            gate.label = 'Optimal'; 
            gate.intensity = Math.min(30, gate.intensity + (Math.random() * 10 - 5)); 
        } else if (gate.waitTime < 25) { 
            gate.label = 'Moderate'; 
            gate.intensity = Math.min(60, Math.max(30, gate.intensity + (Math.random() * 10 - 5))); 
        } else if (gate.waitTime < 45) { 
            gate.label = 'Dense'; 
            gate.intensity = Math.min(90, Math.max(60, gate.intensity + (Math.random() * 10 - 5))); 
        } else { 
            gate.label = 'Critical'; 
            gate.intensity = Math.min(100, Math.max(90, gate.intensity + (Math.random() * 5))); 
        }

        gate.intensity = Math.max(0, Math.min(100, gate.intensity));

        // Flux adjustments: Randomized around a baseline for "live" feel
        gate.inflow = Math.floor(Math.random() * 200 + 50);
        gate.outflow = Math.floor(Math.random() * 150 + 20);

        totalInflow += gate.inflow;
        totalOutflow += gate.outflow;
    });

    venueData.analytics.peakInflow = Math.max(venueData.analytics.peakInflow, totalInflow);
    venueData.analytics.netFlux = totalInflow - totalOutflow;

    if (venueData.analytics.netFlux > 1500) venueData.analytics.status = 'Surge Warning';
    else if (venueData.analytics.netFlux < -500) venueData.analytics.status = 'Egress Mode';
    else venueData.analytics.status = 'Stable';

    // Rerender UI to simulate pushing
    renderGates();
    renderAnalytics();
    renderAIInsights();
    selectStand(currentSelectedStand);
    
    // Update map markers with live data
    if (map) addGateMarkers();

    // Visual heartbeat feedback
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) {
        dashboard.style.boxShadow = 'inset 0 0 40px rgba(0, 243, 255, 0.05)';
        setTimeout(() => { dashboard.style.boxShadow = 'none'; }, 500);
    }
}

// --- RENDERERS ---
function renderAIInsights() {
    if (!elements.aiInsights) return;
    const stats = venueData.analytics;
    const utilPercent = ((stats.totalAttendance / stats.capacity) * 100).toFixed(1);
    
    // Determine utilization color
    let utilColor = 'var(--clr-status-low)';
    if (utilPercent > 85) utilColor = 'var(--clr-status-med)';
    if (utilPercent > 95) utilColor = 'var(--clr-status-danger)';

    elements.aiInsights.innerHTML = `
        <div class="analytics-card" style="margin-bottom: 0;">
            <div class="stat-group" style="align-items: center;">
                <div class="stat-item" style="flex:1;">
                    <span class="stat-label"><i data-lucide="building-2" style="width:14px; height:14px; margin-right:4px;"></i>Capacity Utilization</span>
                    <div style="display:flex; align-items:baseline; gap:8px;">
                        <span class="stat-value" style="transition: all 0.5s ease;">${stats.totalAttendance.toLocaleString()}</span>
                        <span style="font-size: 0.625rem; font-weight:800; color: var(--clr-text-dim);">/ ${stats.capacity.toLocaleString()}</span>
                    </div>
                </div>
                
                <div style="width: 50px; height: 50px; position:relative; display:flex; align-items:center; justify-content:center;">
                    <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform: rotate(-90deg);">
                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-bg" stroke="var(--clr-surface-container)" stroke-width="4"></circle>
                        <circle cx="18" cy="18" r="16" fill="none" class="stroke-fg" stroke="${utilColor}" stroke-width="4" stroke-dasharray="100" stroke-dashoffset="${100 - utilPercent}" style="transition: all 1s ease;"></circle>
                    </svg>
                    <span style="position:absolute; font-size:0.5rem; font-weight:900; color:${utilColor};">${utilPercent}%</span>
                </div>
            </div>
            
            <div style="margin-top: 16px; display:flex; gap: 12px; font-size: 0.75rem; font-weight: 800; color: var(--clr-text-dim);">
                <span class="flux-item" style="display:flex; align-items:center; gap:4px; flex:1; justify-content:center; padding: 6px; border-radius:6px;">
                    <i data-lucide="thermometer" style="width:14px; height:14px; color:var(--clr-status-high);"></i>
                    <span style="color:var(--clr-text-primary); transition: all 0.5s ease;">${stats.temperature.toFixed(1)}°C</span>
                </span>
                <span class="flux-item" style="display:flex; align-items:center; gap:4px; flex:1; justify-content:center; padding: 6px; border-radius:6px;">
                    <i data-lucide="cloud-sun" style="width:14px; height:14px; color:var(--clr-accent);"></i>
                    <span style="color:var(--clr-text-primary);">${stats.weather}</span>
                </span>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}

function renderAnalytics() {
    if (!elements.analyticsOverview) return;
    const stats = venueData.analytics;
    
    // Progress calculation for status bar
    let statusFillColor = 'var(--clr-status-low)';
    let statusFillWidth = '40%';
    if (stats.status === 'Surge Warning') {
        statusFillColor = 'var(--clr-status-high)';
        statusFillWidth = '85%';
    } else if (stats.status === 'Egress Mode') {
        statusFillColor = 'var(--clr-accent)';
        statusFillWidth = '50%';
    }
    
    elements.analyticsOverview.innerHTML = `
        <div class="analytics-card">
            <div class="stat-group">
                <div class="stat-item">
                    <span class="stat-label"><i data-lucide="users" style="width:14px; height:14px; margin-right:4px;"></i>Total Attendance</span>
                    <span class="stat-value" style="transition: all 0.5s ease;">${stats.totalAttendance.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label"><i data-lucide="activity" style="width:14px; height:14px; margin-right:4px;"></i>Net Flux</span>
                    <span class="stat-value" style="color: ${stats.netFlux > 0 ? 'var(--clr-status-low)' : 'var(--clr-status-danger)'}; transition: all 0.5s ease;">
                        ${stats.netFlux > 0 ? '+' : ''}${stats.netFlux}/min
                    </span>
                </div>
            </div>
            <div class="status-indicator-bar" style="height: 4px; background: var(--clr-bg-secondary); border-radius: 4px; overflow: hidden; margin-top: 8px;">
                <div class="status-indicator-fill" style="width: ${statusFillWidth}; height: 100%; background: ${statusFillColor}; transition: all 1s ease;"></div>
            </div>
            <div style="font-size: 0.625rem; color: var(--clr-text-dim); margin-top: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.5s ease;">System State: ${stats.status}</div>
        </div>
    `;
    
    if (window.lucide) lucide.createIcons();
}

function renderGates() {
    if (!elements.gateList) return;
    elements.gateList.innerHTML = venueData.gates.map(gate => {
        const color = getSemanticColor(gate.waitTime);
        return `
            <div class="gate-card" style="background: var(--clr-bg-primary); border: 1px solid var(--clr-surface-container); border-radius: 12px; padding: 16px; margin-bottom: 12px; transition: all 0.3s ease;">
                <div class="gate-info" style="display:flex; align-items:center; justify-content: space-between; margin-bottom: 12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="door-open" style="width: 16px; height: 16px; color: var(--clr-text-dim);"></i>
                        <span style="font-weight: 800; font-size: 0.875rem; color: var(--clr-text-primary); font-family: var(--ff-display);">${gate.name}</span>
                        <span style="font-size: 0.5rem; font-weight: 900; color: #fff; background: ${color}; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${gate.label}</span>
                    </div>
                    <span style="display: flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 800; color: var(--clr-text-dim);">
                        <i data-lucide="clock" style="width: 12px; height: 12px;"></i> ${gate.waitTime.toFixed(1)}m
                    </span>
                </div>
                
                <div style="margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-size: 0.625rem; font-weight: 800; text-transform: uppercase; color: var(--clr-text-dim); letter-spacing: 0.05em;">Crowd Intensity</span>
                    <span style="font-size: 0.625rem; font-weight: 800; color: ${color};">${gate.intensity.toFixed(0)}%</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="flex:1; height: 8px; background: var(--clr-surface-container); border-radius: 4px; overflow: hidden; position: relative;">
                        <!-- Intensity Indicator Segments -->
                        <div style="position: absolute; top:0; left:25%; height:100%; width:1px; background: rgba(255,255,255,0.1); z-index:2;"></div>
                        <div style="position: absolute; top:0; left:50%; height:100%; width:1px; background: rgba(255,255,255,0.1); z-index:2;"></div>
                        <div style="position: absolute; top:0; left:75%; height:100%; width:1px; background: rgba(255,255,255,0.1); z-index:2;"></div>
                        <div style="position: absolute; top:0; left:0; width: ${gate.intensity}%; height: 100%; background: ${color}; transition: all 1s ease; z-index:1;"></div>
                    </div>
                    <div style="display: flex; gap: 12px; font-size: 0.625rem; font-weight: 800;">
                        <span style="display: flex; align-items: center; gap: 4px; color: var(--clr-status-low);">
                            <i data-lucide="arrow-down-to-line" style="width: 12px; height: 12px;"></i>
                            <span>${gate.inflow}</span>
                        </span>
                        <span style="display: flex; align-items: center; gap: 4px; color: var(--clr-status-danger);">
                            <i data-lucide="arrow-up-from-line" style="width: 12px; height: 12px;"></i>
                            <span>${gate.outflow}</span>
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    if (window.lucide) lucide.createIcons();
}

function selectStand(id) {
    if (!elements.standNav || !elements.detailsGrid) return;
    currentSelectedStand = id;
    
    // Update Nav UI
    const btns = elements.standNav.querySelectorAll('.btn-pill');
    btns.forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`'${id}'`)) {
            btn.classList.add('btn-pill--active');
        } else {
            btn.classList.remove('btn-pill--active');
        }
    });

    // Render Details
    const stand = venueData.stands[id] || venueData.stands['North Stand'];
    elements.detailsGrid.innerHTML = stand.details.map(item => {
        let dotColor = 'var(--clr-accent)';
        if (item.status === 'Optimal') dotColor = 'var(--clr-status-low)';
        if (item.status === 'Busy') dotColor = 'var(--clr-status-high)';
        if (item.status === 'Danger') dotColor = 'var(--clr-status-danger)';
        if (item.status === 'Moderate') dotColor = 'var(--clr-status-med)';

        let iconName = 'check-circle';
        if (item.type === 'Gate') iconName = 'door-open';
        else if (item.type === 'Provision' || item.type === 'Retail') iconName = 'coffee';
        else if (item.type === 'Sanitation') iconName = 'droplets';
        else if (item.type === 'First Aid') iconName = 'heart-pulse';
        else if (item.type === 'Facility' || item.type === 'Concierge' || item.type === 'Info') iconName = 'info';
        else if (item.type === 'Security') iconName = 'shield';
        else if (item.type === 'Accessibility') iconName = 'wheelchair';

        return `
            <div class="material-card" style="transition: all 0.3s ease;">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <i data-lucide="${iconName}" style="width: 14px; height: 14px; color: var(--clr-accent);"></i>
                    <span style="font-size: 0.75rem; font-weight: 800; color: var(--clr-accent); text-transform: uppercase; letter-spacing:0.02em;">${item.type}</span>
                </div>
                <h3 class="card-title">${item.name}</h3>
                <div class="card-metadata" style="transition: all 0.5s ease; gap: 6px;">
                    <span class="status-dot" style="background: ${dotColor}"></span>
                    ${item.info}
                </div>
            </div>
        `;
    }).join('');
    
    if (window.lucide) lucide.createIcons();
}

// --- INTERACTION HANDLERS ---
function setupEventListeners() {
    if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);
    if (elements.chatbotToggle) elements.chatbotToggle.addEventListener('click', toggleChat);
    if (elements.emergencyBtn) elements.emergencyBtn.addEventListener('click', triggerEmergency);
    if (elements.chatSubmit) elements.chatSubmit.addEventListener('click', handleChatSubmit);
    if (elements.chatInput) {
        elements.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
    }
}

async function handleChatSubmit() {
    const text = elements.chatInput.value.trim();
    if (!text) return;

    addChatMessage('user', text);
    elements.chatInput.value = '';

    const botMsgId = addChatMessage('bot', 'Titan is processing...');

    const config = window.TITAN_CONFIG || {};
    if (config.GEMINI_KEY && config.GEMINI_KEY !== 'PROVIDE_KEY_HERE') {
        try {
            const response = await callGemini(text);
            updateChatMessage(botMsgId, response);
        } catch (error) {
            console.error('[TITAN AI] Chat Error:', error);
            updateChatMessage(botMsgId, `⚠ Titan encountered an issue: ${error.message}. Retrying may help.`);
        }
    } else {
        setTimeout(() => {
            updateChatMessage(botMsgId, "Live intelligence requires API provisioning. Please provide valid credentials.");
        }, 1000);
    }
}

function addChatMessage(role, text) {
    const id = Date.now();
    const div = document.createElement('div');
    div.className = `bubble bubble--${role}`;
    div.id = `msg-${id}`;
    div.innerText = text;
    elements.chatBody.appendChild(div);
    elements.chatBody.scrollTop = elements.chatBody.scrollHeight;
    return id;
}

function updateChatMessage(id, text) {
    const div = document.getElementById(`msg-${id}`);
    if (div) div.innerText = text;
    elements.chatBody.scrollTop = elements.chatBody.scrollHeight;
}

async function callGemini(prompt) {
    const API_KEY = window.TITAN_CONFIG.GEMINI_KEY;
    const MODEL = "gemini-2.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    // Build rich system context
    const systemContext = `You are Titan, the AI concierge for Titan Arena at Wembley Stadium. You are professional, concise, and helpful. You have real-time access to all venue telemetry. Current data: Attendance: ${venueData.analytics.totalAttendance.toLocaleString()}/${venueData.analytics.capacity.toLocaleString()}, Temperature: ${venueData.analytics.temperature}°C, Weather: ${venueData.analytics.weather}, Net Flux: ${venueData.analytics.netFlux}/min, System State: ${venueData.analytics.status}. Gates: ${venueData.gates.map(g => `${g.name}: ${g.label} (${g.waitTime.toFixed(1)}m wait, ${g.intensity.toFixed(0)}% intensity)`).join('; ')}. Answer the fan's question helpfully.`;

    console.log('[TITAN AI] Sending to Gemini:', MODEL);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${systemContext}\n\nFan Question: ${prompt}` }]
            }]
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('[TITAN AI] API Error:', response.status, errorBody);
        throw new Error(`API returned ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    console.log('[TITAN AI] Response:', data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
        throw new Error(data.error.message || 'Unknown API error');
    } else {
        throw new Error('Unexpected response structure');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleChat() {
    if (elements.chatWindow) elements.chatWindow.classList.toggle('hidden');
}

function triggerEmergency() {
    alert("CRITICAL: EMERGENCY PROTOCOL ACTIVATED. Sector personnel dispatched.");
}

function updateClock() {
    const clock = document.getElementById('systemClock');
    if (clock) clock.innerText = new Date().toLocaleTimeString();
}

// Start Command System
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.selectStand = selectStand;
window.toggleChat = toggleChat;
