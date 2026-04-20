# 🏟️ Titan Arena — Smart Venue Tactical Assistant

> A high-performance, AI-driven operational command center for Wembley Stadium, purpose-built for the **Prompt Wars GCP Challenge 2026**.

---

## 🏢 1. Chosen Vertical: Smart Venue & Event Management
Titan Arena is designed for the high-stakes environment of **Wembley Stadium**, specifically targeting venue managers and security personnel. It solves the critical problem of fragmented data by unifying real-time crowd telemetry, operational states, and intelligent AI assistance into a single tactical glass-pane view.

## 🚀 2. Approach and Logic

### The "Single Pane of Glass" Philosophy
Our approach prioritizes **High-Density Information Design**. We enforce a strict 70/30 viewport split to eliminate vertical scrolling, ensuring that mission-critical data — from total attendance to specific gate bottlenecks — is always visible.

### Intelligent Telemetry Architecture
- **Simulated Real-time Data**: To demonstrate practical usability without a live sensor network, we implemented a **10-second Operational Loop** (`simulateRealtimeData`). This engine calculates realistic fluctuations in wait times, crowd intensity, and net flux (inflow vs. outflow) based on historic stadium patterns.
- **Contextual Awareness**: The AI is not just a general-purpose chatbot; it is a **Tactical Engine**. With every query, the system injects the *entire current operational state* of the stadium into the Gemini 2.5 Flash prompt.

## ⚙️ 3. How the Solution Works

1. **Telemetry Feed**: The simulation engine updates the global `venueData` object every 10 seconds.
2. **Visual Sync**: 
   - **Gate List**: Renders interactive cards with Lucide icons and segmented progress bars (25/50/75% markers).
   - **Google Map**: Dynamically repositions and colors 6 tactical markers at real Wembley gate coordinates.
   - **AI Insights**: Updates the circular SVG utilization gauge and climate pills.
3. **AI Concierge (Titan)**: When a user asks a question, the `callGemini` function builds a system context string from the live `venueData`. This allows Titan to answer specific queries like *"Which gate is most congested?"* or *"What is our available capacity?"* with 100% accuracy relative to the current simulation state.
4. **Interactive Mapping**: Clicking markers opens tactical InfoWindows. These popups are styled for maximum visibility (dark text on white background) even in Dark Mode.

## 📋 4. Assumptions Made

- **Sensor Network**: We assume the stadium is equipped with turnstile counter sensors and thermal climate sensors at various sectors.
- **Connectivity**: We assume high-availability stadium Wi-Fi/LTE for the command center agents to receive the centralized telemetry stream.
- **Authentication**: For this challenge demonstration, API keys are managed in a `TITAN_CONFIG` object. In a full production environment, these would be retrieved via an authenticated backend to prevent key exposure.

---

## 🛠️ Technical Implementation

| Service | Feature |
|---------|---------|
| **Gemini AI v1beta** | Tactical decision support and data synthesis using `gemini-2.5-flash`. |
| **Google Maps JS** | Satellite imagery situational awareness with custom tactical overlays. |
| **Firebase Hosting** | Optimized content delivery for the tactical interface. |
| **Lucide Icons** | SVG-based high-fidelity visual indicators for clarity under stress. |

### Evaluation Focus Highlights

- **Efficiency**: Entire dashboard is **~91KB**. No large frameworks; vanilla stack for sub-second load times.
- **Accessibility**: Implemented semantic HTML headers, high-contrast color indicators (Green/Red/Orange), and rounded UI targets for touch/mouse precision.
- **Security**: Centralized `TITAN_CONFIG` for API management and explicit CORS-safe fetch patterns.
- **Maintainability**: Clear separation of `theme.css` (tokens), `main.css` (layout), and `titan_wembley.js` (logic).

---

## 🏁 Getting Started
1. Open `index.html` in any modern browser.
2. Toggle **Dark Mode** (top-right moon icon) for night operations.
3. Click any **Google Map Pin** for specific gate intel.
4. Use the **Chatbot** (bottom-right) to query the tactical field state.

Built with ⚡ by Titan Arena Command.