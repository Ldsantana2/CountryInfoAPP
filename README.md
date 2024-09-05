# CountryInfoAPP

A web application that displays information about countries, including a list of countries, detailed information on selected countries, and population charts. Built with React, Next.js, and TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Testing and Linting](#testing-and-linting)

## Prerequisites

Ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ldsantana2/CountryInfoAPP.git
   cd CountryInfoAPP
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Create a `.env` file**

   Create a `.env` file in the root directory of the project and add any required environment variables. For example:

   ```plaintext
   API_BASE_URL=https://api.example.com
   ```

   Ensure that `.env` is included in your `.gitignore` to avoid exposing sensitive information.

## Running the Application

To start the development server and run the application locally:

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

This will start the development server at `http://localhost:3000`.

## Building for Production

To build the application for production:

Using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

To start the production server:

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

## Deployment

To deploy your application to GitHub Pages:

1. **Install GitHub Pages package**

   Using npm:

   ```bash
   npm install --save-dev gh-pages
   ```

   Or using yarn:

   ```bash
   yarn add --dev gh-pages
   ```

2. **Add deployment scripts to `package.json`**

   Modify your `package.json` to include:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d out"
   }
   ```

3. **Deploy to GitHub Pages**

   Using npm:

   ```bash
   npm run deploy
   ```

   Or using yarn:

   ```bash
   yarn deploy
   ```

   Ensure you have a `gh-pages` branch set up in your GitHub repository. This branch is where your static files will be pushed for GitHub Pages to serve.

## Testing and Linting

To run linting and format checks:

Using npm:

```bash
npm run lint
npm run format
```

Or using yarn:

```bash
yarn lint
yarn format
```
