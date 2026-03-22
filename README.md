## Chef Claude – AI Recipe Generator

Chef Claude is a small Vite + React app that turns a list of ingredients into a full recipe using Anthropic's Claude model. You type what you have on hand, click a button, and the app asks "Chef Claude" to recommend a dish and render the recipe nicely in the browser.

---

## Features

- Add ingredients via a simple input form
- See a running list of all ingredients you have on hand
- One-click "Get a recipe" call to the Chef Claude API
- AI‑generated recipe returned as markdown and rendered with headings, lists, and steps
- Lightweight, single‑page UI built with React and Vite

---

## Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** CSS (see `index.css`)
- **AI Integration:** `@anthropic-ai/sdk` (Claude messages API)
- **Markdown Rendering:** `react-markdown`

> Note: This project calls the Anthropic API **directly from the browser** and is intended as a learning/demo app. Do not use this pattern in production with real secrets.

---

## Project Structure

- `index.html` – HTML shell that loads the React app into `#root`
- `index.jsx` – React entry point (`ReactDOM.createRoot(...).render(<App />)`)
- `App.jsx` – Top‑level component composing the header and main content
- `ai.js` – Anthropic client setup and the `getRecipeFromChefClaude` function
- `components/`
  - `Header.jsx` – App header and logo ("Chef Claude")
  - `Main.jsx` – Core logic: ingredient state, form, recipe generation and display
  - `IngredientsList.jsx` – Renders the list of ingredients and the "Get a recipe" call‑to‑action
  - `ClaudeRecipe.jsx` – Renders the AI‑generated markdown recipe using `react-markdown`
- `index.css` – Global styling for layout, header, form, and recipe display
- `images/chef-claude-icon.png` – Logo used in the header

---

## Getting Started

1. **Install dependencies**

	```bash
	npm install
	```

2. **Configure your Anthropic API key**

	Create a file named `.env.local` in the project root (same folder as `package.json`) with:

	```bash
	VITE_ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY_HERE
	```

	- Replace `YOUR_ANTHROPIC_API_KEY_HERE` with your actual key from Anthropic.
	- Never commit your real API key to version control.

3. **Run the dev server**

	```bash
	npm start
	```

	or equivalently:

	```bash
	npm run dev
	```

4. **Open the app**

	Visit the URL printed by Vite (typically `http://localhost:5173/`).

---

## How It Works

High‑level flow:

1. The user adds ingredients using the form in `Main.jsx`.
2. Ingredients are stored in React state and listed by `IngredientsList.jsx`.
3. When there are enough ingredients, the "Get a recipe" button becomes available.
4. Clicking the button calls `getRecipeFromChefClaude` from `ai.js`, which:
	- Builds a prompt from the ingredient list
	- Calls `anthropic.messages.create(...)` against the Claude model
	- Returns a markdown‑formatted recipe string
5. The recipe markdown is stored in state and rendered by `ClaudeRecipe.jsx` via `react-markdown`.

---

## Environment & Safety Notes

- This project uses a Vite `VITE_ANTHROPIC_API_KEY` variable that is exposed to the browser; this is **not safe for production**.
- For any real deployment you should:
  - Move the Anthropic call into a backend/service or serverless function.
  - Keep your API key secret on the server side.
  - Add proper error handling, rate limiting, and logging.

---

## Possible Improvements

- Add loading and error states when calling the API
- Allow editing/removing ingredients and basic validation (no empty entries)
- Fix and enhance scrolling to the generated recipe section
- Introduce tests for the main components and the `ai.js` integration
- Replace direct browser calls with a small backend proxy for secure key handling

This repository is primarily a learning project for wiring up a React UI to an AI model, so the focus is clarity and simplicity rather than production‑grade architecture.
