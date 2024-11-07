# Athlete Management System

## Overview

The **Athlete Management System** is designed for admins to manage athletes, coaches, referees, tournaments, and events. It provides a structured system for managing various entities while offering public-facing features for users to view athlete profiles and tournament details.

The system is built using **Node.js** and **Express** for the backend, **MySQL** as the database, and utilizes **JWT** (JSON Web Token) for authentication with secure password management via **bcrypt**.

## Key Features

- **Admin Functions:**
  - User authentication and session management.
  - CRUD operations for managing athletes, coaches, referees, tournaments, and events.
  - Manage tournament standings and athlete histories.

- **Public Functions:**
  - Browse athlete profiles.
  - View tournament details and event standings.

## Technologies Used

- **Node.js**: Backend API framework.
- **Express**: Web framework for routing and middleware.
- **MySQL**: Relational database for storing all relevant data.
- **JWT (JSON Web Token)**: For handling authentication and session management.
- **bcrypt**: For securely hashing and storing passwords.

## Prerequisites

Before you begin setting up the project, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v12+)
- [MySQL](https://www.mysql.com/)
- A package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setting Up the Project

Follow these steps to set up the project locally on your system:

### 1. Clone the Repository

Begin by cloning the project repository:

```bash
git clone https://github.com/your-username/athlete-management-system.git
cd athlete-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory of the project. This file will store your environment variables, including database credentials and secret keys. Add the following variables:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=athlete_management
JWT_SECRET=your_jwt_secret_key
```

Replace the placeholders with your actual database credentials and a secure JWT_SECRET.


### 4. Set Up MySQL Database
You can create the database in MySQL using the following commands:

```bash
CREATE DATABASE athlete_management;
```

### 5. Run the Application

```bash
npm start
```

### 6. Testing the API
Once the server is running, you can test the API endpoints using tools like Postman or Insomnia.

For example, to test the user registration:
- POST http://localhost:5000/auth/register
    - Request body
    ``` bash
    {
  "username": "admin",
  "password": "yourpassword"
    }
    ```


