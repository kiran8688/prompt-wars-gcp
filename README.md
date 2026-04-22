# 🏟️ Titan Arena — Smart Venue Tactical Assistant

> A high-performance, AI-driven operational command center for Wembley Stadium, purpose-built for the **Prompt Wars GCP Challenge 2026**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Cloud_Run-blue?style=for-the-badge&logo=google-cloud)](https://titan-arena-495364542436.us-central1.run.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/kiran8688/prompt-wars-gcp)

---

## 🏢 1. Chosen Vertical: Smart Venue & Event Management
Titan Arena is designed for the high-stakes environment of **Wembley Stadium**, specifically targeting venue managers and security personnel. It solves the critical problem of fragmented data by unifying real-time crowd telemetry, operational states, and intelligent AI assistance into a single tactical glass-pane view.

## 🚀 2. Approach and Logic

### The "Single Pane of Glass" Philosophy
Our approach prioritizes **High-Density Information Design**. We enforce a strict 70/30 viewport split to eliminate vertical scrolling, ensuring that mission-critical data — from total attendance to specific gate bottlenecks — is always visible.

### Intelligent Telemetry Architecture
- **Simulated Real-time Data**: To demonstrate practical usability without a live sensor network, we implemented a **10-second Operational Loop** (`simulateRealtimeData`). This engine calculates realistic fluctuations in wait times, crowd intensity, and net flux (inflow vs. outflow) based on historic stadium patterns.
- **Contextual Awareness**: Titan is not just a chatbot; it is a **Tactical Engine**. With every query, the system injects the *entire current operational state* of the stadium into the Gemini prompt.

## ⚙️ 3. How the Solution Works

1. **Telemetry Feed**: The simulation engine updates the global `venueData` object every 10 seconds.
2. **Visual Sync**: 
   - **Gate List**: Renders interactive cards with Lucide icons and segmented progress bars.
   - **Google Map**: Dynamically repositions and colors 6 tactical markers at real Wembley gate coordinates.
   - **AI Insights**: Updates circular SVG utilization gauges and climate metrics in real-time.
3. **AI Concierge (Titan)**: Powered by **Gemini 1.5 Flash**, the concierge synthesizes live data to answer queries like *"Which gate is most congested?"* or *"What is our current capacity status?"* with zero latency.
4. **Interactive Mapping**: Uses Google Maps JS with **Advanced Markers** for a satellite-view situational awareness overlay.

## 🛠️ Technical Implementation

| Service | Feature |
|---------|---------|
| **Gemini 1.5 Flash** | Tactical decision support and data synthesis (v1beta API). |
| **Google Maps JS** | Satellite imagery situational awareness with custom tactical overlays. |
| **GCP Cloud Run** | Containerized deployment for scalable, high-availability hosting. |
| **Nginx Alpine** | Ultra-lightweight web server for sub-second load times. |
| **Lucide Icons** | High-fidelity visual indicators for mission-critical clarity. |

---

## 🏁 Latest Developments (April 2026)
- **Stable Intelligence**: Migrated to `gemini-1.5-flash` for consistent, low-latency performance.
- **Containerization**: Fully dockerized the application for seamless deployment.
- **Live Deployment**: Hosted on Google Cloud Run with automated scaling.
- **UI Refinement**: Optimized the 70/30 tactical split and improved accessibility for touch-screen command center monitors.

## 🚀 Getting Started
1. **Visit the Live Site**: [Titan Arena Dashboard](https://titan-arena-495364542436.us-central1.run.app)
2. **Operations**:
   - Toggle **Dark Mode** for night-time stadium operations.
   - Monitor **Gate Telemetry** for real-time inflow/outflow flux.
   - Ask **Titan** for an operational summary of any stadium sector.

Built with ⚡ by Titan Arena Command.