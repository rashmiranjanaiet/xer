# BPUT SkillSphere

An AI-Powered Career & Internship Platform for BPUT Students. This prototype focuses on the student dashboard, where users can upload their resume to get an AI-generated skill map, career readiness score, and personalized recommendations.

## Local Development Setup

This project has been upgraded to use [Vite](https://vitejs.dev/) for a fast and modern development experience.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- A Google Gemini API Key

### Installation

1.  Clone the repository and navigate into the project directory.
2.  Install the required dependencies using your terminal:
    ```bash
    npm install
    ```

### Running the Development Server

1.  Create a file named `.env.local` in the root of the project.
2.  Add your Gemini API key to this file. Vite will automatically load this variable and make it available to the application.
    ```
    VITE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```
    *Note: It's important to prefix the variable with `VITE_` for it to be exposed to the client-side code.*

3.  Start the development server from your terminal:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the local URL provided (usually `http://localhost:5173`). The app will automatically reload whenever you save a file.