
# Rule Engine with AST

This project implements a **Rule-Based Engine** using an **Abstract Syntax Tree (AST)** for dynamic rule creation, evaluation, and modification. The engine allows users to define, combine, and evaluate rules dynamically, leveraging ASTs for structured representation and manipulation. The application features a **React**-based frontend, a **Node.js** and **Express** backend, and **MongoDB Atlas** for cloud-based data storage.



## Features
- **Dynamic Rule Creation**: Define custom rules that are converted into an AST for easy manipulation and interpretation.
- **Rule Combination**: Merge multiple rules to create complex logic structures.
- **Evaluation Engine**: Evaluate incoming data against the defined rules using the AST, providing quick and flexible compliance checks.
- **Interactive Visualization**: View, modify, and interact with rules as an organized tree structure for easier rule management and debugging.

## Getting Started

### Prerequisites
Before running the project, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) (Sign up and set up your cluster)
- A [GitHub account](https://github.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shresth941/Rule-Engine-with-AST.git
   cd Rule-Engine-with-AST


   
**Install dependencies:**

Install frontend dependencies:
npm install
Navigate to the backend directory and install backend dependencies:

cd backend
npm install
Set up environment variables:

In the backend directory, create a .env file and add your MongoDB Atlas connection string:


MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
Running the Application




**Start the Frontend**
In the project’s root directory, start the frontend with:



npm start


This will run the React application at http://localhost:3000.



**Start the Backend**


Navigate to the backend directory and start the Node.js server:


npm run server
Ensure that your backend connects to MongoDB Atlas successfully.

**Usage**
After starting both the frontend and backend, you can access the application by visiting http://localhost:3000 in your browser. From here, you can perform the following actions:

Create New Rules: Define and store custom rules using a user-friendly form interface.
Evaluate Data: Upload or input data to evaluate it against your predefined rules.
Visualize Rules: Navigate to the rule visualization section to see your rules displayed as a structured tree for easy understanding and modification.



**Example Usage:**
Creating a Rule: Fill in the criteria in the rule creation form and save the rule to the database.
Evaluating Data: Input data or upload a file, and the engine will process it to check against the saved rules.
Visualizing Rules: Use the tree-based view to explore how rules are connected and modify them as needed.
Ensure the backend is running and MongoDB Atlas is connected for full functionality.

**Technologies Used**


**Frontend:**
React: For building the user interface.



**Backend:**
Node.js: Server-side JavaScript runtime.
Express: Web framework for handling HTTP requests.




**Database:**
MongoDB Atlas: Cloud-based NoSQL database for storing rules and evaluation results.



**Contributing**
We welcome contributions! To contribute:














