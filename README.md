Rule Engine with AST
This project implements a rule-based engine using an Abstract Syntax Tree (AST) for dynamic rule creation, evaluation, and modification. It features a frontend built with React, a backend powered by Node.js and Express, and utilizes MongoDB Atlas for data storage.

Features
Rule Creation: Define custom rules that are converted into AST.
Rule Combination: Merge multiple rules for complex evaluations.
Evaluation: Check data against the defined rules using the AST.
Tree Visualization: View rules in a structured tree format.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v14+)
MongoDB Atlas (set up your cluster)
A GitHub account
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Shresth941/Rule-Engine-with-AST.git
cd Rule-Engine-with-AST
Install dependencies for both frontend and backend:

bash
Copy code
npm install
cd backend
npm install
Set up environment variables:

Create a .env file in the backend directory.
Add your MongoDB connection string:
php
Copy code
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
Running the Application
Start the Frontend
In the project’s root directory, run:

bash
Copy code
npm start
Start the Backend
Navigate to the backend directory and run:

bash
Copy code
npm run server
Usage
Open localhost in your browser to access the frontend.
Use the web interface to define and evaluate rules.
Ensure the backend and MongoDB Atlas are connected for full functionality.
Technologies Used
Frontend: React
Backend: Node.js, Express
Database: MongoDB Atlas
