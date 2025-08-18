import React from 'react';

export const ContentType = {
  HEADING: 0,
  SUBHEADING: 1,
  PARAGRAPH: 2,
  CODE: 3,
  LIST: 4,
  NOTE: 5,
  SEPARATOR: 6
};

const ApiIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

const SpaIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m.75.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L4.2 15.3m15.6 0-1.57.393m0 0a2.25 2.25 0 01-2.12 2.12l-1.57-.393m-3.75 0a2.25 2.25 0 01-2.12 2.12l-1.57-.393M12 15.75l-1.57.393a2.25 2.25 0 00-2.12 2.12l-1.57-.393m7.5 0l-1.57.393a2.25 2.25 0 01-2.12 2.12L9 18.25m0 0a2.25 2.25 0 01-2.12 2.12l-1.57-.393" />
    </svg>
);

const CHEATSHEET_CONTENT = [
    { type: ContentType.HEADING, content: "LYRA's Cheatsheet: API POST/GET with AI Integration" },
    { type: ContentType.PARAGRAPH, content: "This cheatsheet provides common patterns for interacting with a backend API (which may, in turn, interact with an AI service) from both a server-side script and a client-side application." },
    { type: ContentType.NOTE, content: "<b>Assumptions:</b><br/>You have a backend API endpoint (e.g., <code>/api/process-text</code>) that receives data, potentially sends it to an AI service, and returns a processed response. API responses are typically JSON." },
    { type: ContentType.SEPARATOR },
    { type: ContentType.SUBHEADING, content: "1. Server-Side Scripting (Python Example)" },
    { type: ContentType.PARAGRAPH, content: "<i>Ideal for backend logic, AI model interaction, data processing.</i>" },
    { type: ContentType.SUBHEADING, content: "A. GET Request Example" },
    { type: ContentType.PARAGRAPH, content: "Fetching data from an API." },
    { type: ContentType.CODE, language: "python", content: `# pip install requests
import requests
import json

API_BASE_URL = "http://your-backend-api.com/api"

def get_data_from_api(endpoint):
    try:
        response = requests.get(f"{API_BASE_URL}/{endpoint}")
        response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Example usage:
# data = get_data_from_api("articles/latest")
# if data:
#     print("Fetched data:", json.dumps(data, indent=2))` },
    { type: ContentType.SUBHEADING, content: "B. POST Request with AI Integration Example" },
    { type: ContentType.PARAGRAPH, content: "Sending data to your backend, which then processes it with AI (e.g., sentiment analysis)." },
    { type: ContentType.CODE, language: "python", content: `# pip install requests
import requests
import json

API_BASE_URL = "http://your-backend-api.com/api" # Your backend API

def post_text_for_ai_processing(text_input):
    payload = {"text": text_input}
    headers = {"Content-Type": "application/json"} # Important for JSON payload

    try:
        # Your backend endpoint that handles AI processing
        response = requests.post(
            f"{API_BASE_URL}/process-with-ai",
            data=json.dumps(payload),
            headers=headers
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error posting data for AI processing: {e}")
        return None` },
    { type: ContentType.SEPARATOR },
    { type: ContentType.SUBHEADING, content: "2. Client-Side (JavaScript - Browser Fetch API)" },
    { type: ContentType.PARAGRAPH, content: "<i>Ideal for interactive user interfaces, web applications.</i>" },
    { type: ContentType.SUBHEADING, content: "A. GET Request Example" },
    { type: ContentType.PARAGRAPH, content: "Fetching data to display in the UI." },
    { type: ContentType.CODE, language: "javascript", content: `const API_BASE_URL = "http://your-backend-api.com/api";

async function fetchDataFromApi(endpoint) {
    try {
        const response = await fetch(\`\${API_BASE_URL}/\${endpoint}\`);
        if (!response.ok) { // Check for HTTP errors
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}` },
    { type: ContentType.SUBHEADING, content: "B. POST Request with AI Integration Example" },
    { type: ContentType.PARAGRAPH, content: "Sending user input to your backend for AI processing." },
    { type: ContentType.CODE, language: "javascript", content: `const API_BASE_URL = "http://your-backend-api.com/api";

async function postTextForAiProcessing(textInput) {
    const payload = { text: textInput };

    try {
        const response = await fetch(\`\${API_BASE_URL}/process-with-ai\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting data for AI processing:", error);
        return null;
    }
}` },
];

const SPA_BLUEPRINT_CONTENT = [
    { type: ContentType.HEADING, content: "LYRA's SPA Architectural Blueprint" },
    { type: ContentType.PARAGRAPH, content: "A Single Page Application (SPA) provides a fluid, desktop-like user experience by dynamically rewriting the current page rather than loading entire new pages from the server." },
    { type: ContentType.PARAGRAPH, content: "<b>Core Concept:</b> The server initially sends a single HTML file and all necessary JavaScript, CSS, and other assets. Subsequent 'page' navigations and data interactions occur via JavaScript, primarily communicating with a backend API." },
    { type: ContentType.SEPARATOR },
    { type: ContentType.SUBHEADING, content: "I. Application Server (Backend for SPA)" },
    { type: ContentType.PARAGRAPH, content: "The 'application server' in an SPA context often serves two main roles:" },
    { type: ContentType.LIST, content: ["<b>Static File Server:</b> Serves the initial <code>index.html</code> and all bundled static assets (JS, CSS, images, fonts) of your SPA.", "<b>API Server:</b> Provides the data and business logic endpoints that your SPA client consumes. This is where your AI integration logic would live."] },
    { type: ContentType.SUBHEADING, content: "A. Recommended Technologies:" },
    { type: ContentType.LIST, content: ["<b>Node.js with Express/Fastify:</b> JavaScript all the way, highly performant for API, vast ecosystem.", "<b>Alternatives:</b> Python with Flask/FastAPI, Go with Gin/Echo, Ruby on Rails, Java with Spring Boot. Choose based on team expertise and project needs."] },
    { type: ContentType.CODE, language: "javascript", content: `// app.js (Simplified Express Example)
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/process-with-ai', (req, res) => {
    const { text } = req.body;
    // ... AI processing logic here ...
    res.json({ result: \`AI processed: \${text.toUpperCase()}\` });
});

// Serve static SPA files
app.use(express.static(path.join(__dirname, 'client-build')));

// For client-side routing, send all other requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client-build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
});` },
    { type: ContentType.SUBHEADING, content: "B. Nuances & Best Practices (Server):" },
    { type: ContentType.LIST, content: ["<b>API Design:</b> Follow RESTful principles for clear endpoints.", "<b>Authentication/Authorization:</b> Implement secure user auth (e.g., JWT, OAuth).", "<b>Error Handling:</b> Robust error logging and user-friendly error messages.", "<b>Environment Variables:</b> Use <code>.env</code> files for sensitive credentials.", "<b>Scalability:</b> Consider load balancers and containerization (Docker)."] },
    { type: ContentType.SEPARATOR },
    { type: ContentType.SUBHEADING, content: "II. Client (SPA Frontend)" },
    { type: ContentType.PARAGRAPH, content: "The client is the user-facing part, running entirely in the user's browser." },
    { type: ContentType.SUBHEADING, content: "A. Recommended Technologies:" },
    { type: ContentType.LIST, content: ["<b>Frameworks:</b> React, Vue.js, or Angular.", "<b>Routing:</b> <code>react-router-dom</code> (React), <code>vue-router</code> (Vue).", "<b>State Management:</b> Context API, Redux, Zustand (React); Vuex, Pinia (Vue).", "<b>API Interaction:</b> Native <code>Fetch API</code> or <code>Axios</code>.", "<b>Styling:</b> Tailwind CSS, Styled Components, CSS Modules."] },
    { type: ContentType.SUBHEADING, content: "B. Iteration & Nuance Tools (Client):" },
    { type: ContentType.LIST, content: ["<b>Dev Server with Hot Reloading:</b> Vite, Create React App.", "<b>Linting:</b> ESLint, Prettier.", "<b>Testing:</b> Jest, React Testing Library, Cypress.", "<b>Component Libraries:</b> Material-UI, Ant Design, Chakra UI.", "<b>Version Control:</b> Git (GitHub, GitLab).", "<b>CI/CD:</b> GitHub Actions, Netlify, Vercel for automated builds and deployment."] },
    { type: ContentType.SUBHEADING, content: "C. manifest.json (Progressive Web App - PWA Manifest)" },
    { type: ContentType.PARAGRAPH, content: "A JSON file that provides information about your application (name, icons, etc.), enabling features like 'Add to Home Screen'." },
    { type: ContentType.CODE, language: "json", content: `{
  "name": "My AI-Powered App",
  "short_name": "AI App",
  "description": "A powerful single-page application leveraging AI.",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}` },
    { type: ContentType.NOTE, content: "Link the manifest in your <code>index.html</code>: <code>&lt;link rel=\"manifest\" href=\"/manifest.json\"&gt;</code>" },
];


export const CONTENT_DATA = [
    {
        id: 'api-cheatsheet',
        title: 'API Cheatsheet',
        icon: ApiIcon,
        content: CHEATSHEET_CONTENT
    },
    {
        id: 'spa-blueprint',
        title: 'SPA Blueprint',
        icon: SpaIcon,
        content: SPA_BLUEPRINT_CONTENT
    }
];