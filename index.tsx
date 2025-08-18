import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";

// --- Inlined constants.tsx ---
const ContentType = {
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

const AIExplainerIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.197-.398a2.25 2.25 0 001.423-1.423L16.5 15.75l.398 1.197a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.197.398a2.25 2.25 0 00-1.423 1.423z" />
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

const CONTENT_DATA = [
    {
        id: 'api-cheatsheet',
        title: 'API Cheatsheet',
        icon: ApiIcon,
        content: CHEATSHEET_CONTENT
    },
    {
        id: 'code-explainer',
        title: 'AI Code Explainer',
        icon: AIExplainerIcon,
        content: [] // This section is rendered by a special component
    },
    {
        id: 'spa-blueprint',
        title: 'SPA Blueprint',
        icon: SpaIcon,
        content: SPA_BLUEPRINT_CONTENT
    }
];

// --- Inlined components/CodeBlock.tsx ---
const LanguageBadge = ({ language }) => {
    if (!language) return null;

    let langName = '';
    let bgColor = 'bg-gray-600';
    let textColor = 'text-white';

    switch (language) {
        case 'python':
            langName = 'Python';
            bgColor = 'bg-blue-800';
            break;
        case 'javascript':
            langName = 'JavaScript';
            bgColor = 'bg-yellow-600';
            break;
        case 'json':
            langName = 'JSON';
            bgColor = 'bg-green-700';
            break;
        case 'bash':
            langName = 'Shell';
            bgColor = 'bg-gray-700';
            break;
        case 'html':
            langName = 'HTML';
            bgColor = 'bg-orange-600';
            break;
        default:
            langName = language;
    }

    return (
        <span className={`absolute top-3 left-4 text-xs font-semibold px-2 py-1 rounded-md ${bgColor} ${textColor}`}>
            {langName}
        </span>
    );
};

const CodeBlock = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="glass my-4 relative">
      <LanguageBadge language={language} />
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-lyra-text-secondary hover:text-lyra-light transition-all duration-200"
        aria-label="Copy code"
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre className="p-4 pt-10 text-sm overflow-x-auto">
        <code className="font-mono text-lyra-text">
          {code}
        </code>
      </pre>
    </div>
  );
};

// --- Inlined components/CodeExplainer.tsx ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CodeExplainer = () => {
    const [code, setCode] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleExplain = async () => {
        if (!code.trim()) {
            setError('Please enter some code to explain.');
            return;
        }
        setIsLoading(true);
        setError('');
        setExplanation('');

        try {
            const prompt = `You are LYRA, an expert AI programming assistant. Your goal is to explain code snippets clearly and concisely for developers.
            
            **Instructions:**
            1.  Start with a high-level summary of what the code does.
            2.  Provide a breakdown of key sections, functions, or logic.
            3.  Explain complex lines or syntax.
            4.  Use markdown for formatting (headings, lists, bold text, inline code).
            5.  Keep the tone helpful and professional.

            **Code to Explain:**
            \`\`\`
            ${code}
            \`\`\``;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setExplanation(response.text);

        } catch (e) {
            console.error(e);
            setError('An error occurred while explaining the code. Please try again.');
            setExplanation('');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center mb-2">
                    <span className="text-lyra-accent mr-3"><AIExplainerIcon className="w-8 h-8" /></span>
                    <h1 className="text-4xl font-extrabold text-lyra-light">AI Code Explainer</h1>
                </div>
                <p className="text-lg text-lyra-text-secondary">Paste any code snippet below and LYRA will break it down for you.</p>
            </header>
    
            <div className="glass p-6">
                <label htmlFor="code-input" className="block text-sm font-medium text-lyra-light mb-2">Your Code Snippet</label>
                <textarea
                    id="code-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="w-full h-48 p-4 font-mono text-sm bg-lyra-dark-secondary text-lyra-text border border-gray-600 rounded-lg focus:ring-2 focus:ring-lyra-accent focus:border-lyra-accent transition duration-200 resize-y"
                    aria-label="Code input"
                />
                <button
                    onClick={handleExplain}
                    disabled={isLoading}
                    className="mt-4 px-6 py-3 w-full flex justify-center items-center font-semibold text-white bg-lyra-accent rounded-lg hover:bg-lyra-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lyra-dark focus:ring-lyra-accent transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Explaining...
                        </>
                    ) : (
                        'Explain Code'
                    )}
                </button>
            </div>
    
            {(explanation || isLoading || error) && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-lyra-light mb-4 border-b border-gray-700 pb-2">Explanation</h2>
                    <div className="glass p-6">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center text-lyra-text-secondary p-8">
                               <svg className="animate-spin h-8 w-8 text-lyra-accent mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                               </svg>
                               <p className="text-lg">LYRA is analyzing the code...</p>
                            </div>
                        )}
                        {error && <p className="text-red-400">{error}</p>}
                        {explanation && <div className="prose-lyra" dangerouslySetInnerHTML={{ __html: marked.parse(explanation) }} />}
                    </div>
                </div>
            )}
        </div>
    )
};


// --- Inlined components/ContentDisplay.tsx ---
const renderContentItem = (item, index) => {
  switch (item.type) {
    case ContentType.HEADING:
      return (
        <h2 key={index} className="text-3xl font-bold text-lyra-light mb-2 mt-8 border-b border-gray-700 pb-2">
          {item.content}
        </h2>
      );
    case ContentType.SUBHEADING:
      return (
        <h3 key={index} className="text-2xl font-semibold text-lyra-light mb-4 mt-6">
          {item.content}
        </h3>
      );
    case ContentType.PARAGRAPH:
      return (
        <p key={index} className="text-lyra-text mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }}>
        </p>
      );
    case ContentType.CODE:
      return (
        <CodeBlock
          key={index}
          code={item.content}
          language={item.language}
        />
      );
    case ContentType.LIST:
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-lyra-text pl-4">
          {item.content.map((li, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: li }}></li>
          ))}
        </ul>
      );
    case ContentType.NOTE:
      return (
        <div key={index} className="glass border-l-4 border-lyra-accent p-4 my-4 rounded-l-none rounded-r-lg">
          <p className="text-lyra-text-secondary italic" dangerouslySetInnerHTML={{ __html: item.content }}></p>
        </div>
      );
    case ContentType.SEPARATOR:
      return <hr key={index} className="border-gray-700 my-8" />;
    default:
      return null;
  }
};

const ContentDisplay = ({ section }) => {
  if (section.id === 'code-explainer') {
    return <CodeExplainer />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center mb-2">
            <span className="text-lyra-accent mr-3">{section.icon({ className: "w-8 h-8" })}</span>
            <h1 className="text-4xl font-extrabold text-lyra-light">{section.title}</h1>
        </div>
        <p className="text-lg text-lyra-text-secondary">{section.id === 'api-cheatsheet' ? "Common patterns for API interaction with AI integration." : "A blueprint for building modern, scalable Single Page Applications."}</p>
      </header>
      {section.content.map(renderContentItem)}
    </div>
  );
};

// --- Inlined components/Sidebar.tsx ---
const Sidebar = ({ sections, activeSectionId, setActiveSectionId }) => {
  return (
    <aside className="w-64 glass neon flex-shrink-0 p-6 hidden md:block">
      <div className="flex items-center mb-10">
        <a href="/" aria-label="Home" className="brand-link flex items-center">
            <img
                src="https://andiegogiap.com/assets/aionex-icon-256.png"
                alt="AIONEX"
                style={{height: '40px', width: 'auto', display: 'block'}}
                loading="eager"
                decoding="async"
            />
            <h1 className="text-xl font-bold text-lyra-light ml-3">LYRA</h1>
        </a>
      </div>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSectionId(section.id);
                }}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  activeSectionId === section.id
                    ? 'bg-lyra-accent text-white shadow-lg'
                    : 'text-lyra-text-secondary hover:bg-gray-700/50 hover:text-lyra-light'
                }`}
              >
                {section.icon({ className: 'h-5 w-5 mr-3' })}
                <span>{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-6 left-6 text-lyra-text-secondary text-xs">
        <p>AI Cheatsheet & Blueprint</p>
        <p>&copy; 2024 LYRA Industries</p>
      </div>
    </aside>
  );
};

// --- Inlined App.tsx ---
const App = () => {
  const [activeSectionId, setActiveSectionId] = useState(CONTENT_DATA[0].id);

  const activeSection = CONTENT_DATA.find(section => section.id === activeSectionId) || CONTENT_DATA[0];

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar 
        sections={CONTENT_DATA} 
        activeSectionId={activeSectionId} 
        setActiveSectionId={setActiveSectionId} 
      />
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <ContentDisplay section={activeSection} />
      </main>
    </div>
  );
};

// --- RENDER ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);