<h1 align="center">Welcome to FitBook 👋</h1>

## ✨ Overview

Within this repository it contains the React code for [fitbook](https://fitbook.jazzytoor.com)

## Locally

- 🚀 Prerequisites
    1. Node
    2. Npm

- 🚀 Commands
    1. `sam build -t infrastructure/sam/template.yaml --use-container`
    2. `sam local start-api`

## Usage

- ✨ Steps
    
    1. 

    ```bash
    npm install 
    ```

    2. 

    The config for Firebase is using environment variables, do the following locally:

    Create `.env` file in the root level

    Store the following in the `.env` file
    ```bash
    REACT_APP_API_KEY=ENTER_KEY
    REACT_APP_API_URL=ENTER_URL
    REACT_APP_DB_URL=ENTER_DB_URL
    ```

    3. 
    ```bash
    npm start
    ```

## Coming Soon
- ❗️ CI/CD for GitHub and Azure DevOps
- ❗️ Hosted within EKS

## Author

👤 **Jazz**