# Library Management App

A fullstack web application for library management built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Prerequisites

- Node.js (latest LTS version)
- NPM (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/Deep-20/BookHive.git
cd BookHive
```

2. **Environment Setup**
Create a `.env` file in the server directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET="secret"
PORT=8080
```

To get MONGODB_URI, 
  1) Login/Sign Up at MongoDb Atlas
  2) Click on Database Access from the left Navigation Menu
  3) Click on Add New Database User buton
  4) Fill in the username, password and required details
  5) Click on Add User button
  6) Click on Connect at the Overview Page
  7) Click on Drivers (Under the Connect to your application section)
  8) You will find the string there

Your MONGODB_URI will look as follows
"mongodb+srv://<DB_Username>:<DB_Password>@cluster0.nyxubl7.mongodb.net/BookHive?retryWrites=true&w=majority&appName=Cluster0"

Replace DB_Username with your database username
Replace DB_Password with your database password
BookHive is the database name for this app

3. **Install Dependencies**
   From root folder
```bash
cd client
npm install
```

  From root folder
```bash
cd client
npm install
```

4. **Running the Application**

Development mode:
```bash
# From the root directory
# Run both server and client
npm start
```

The server will run on `http://localhost:8080` and the client on `http://localhost:3000`

## Test Accounts

Use these credentials to test the application:

**Librarian Account:**
- Email: admin@gmail.com
- Password: secureAdminPassword123

## Features

- **Librarians can:**
  - Manage authors, genres, books
  - Handle borrowals
  - Manage user accounts

- **Members can:**
  - View books, authors, and genres
  - View their borrowals
  - View their account details

## Tech Stack

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend framework
- Node.js - Runtime environment
- Material-UI - UI components
