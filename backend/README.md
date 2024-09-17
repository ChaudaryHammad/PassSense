# Auth Boilerplate with Email Verification

![npm](https://img.shields.io/npm/v/auth)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![npm](https://img.shields.io/npm/dw/auth)

## Introduction

**Auth Boilerplate** is a full-stack authentication solution for Node.js applications. It includes user registration, login, and email verification functionalities, providing a robust foundation for handling user authentication in your projects.

## Features

- **User Authentication:** Register and login users with secure password hashing.
- **JWT Tokens:** Generate and verify JSON Web Tokens (JWT) for secure authentication.
- **Email Verification:** Send email verification links using Nodemailer.
- **Environment Configuration:** Easily manage environment variables with dotenv.
- **Middleware Integration:** Protect routes with authentication middleware.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Installation

To install this package, use npm:

```bash
npm install mernstack-auth-boilerplate
```
## Usage

After installation, you can start the server using:
```bash
npm start
```
Or, to start the server in development mode with Nodemon:
```bash
npm run dev
```

## Project Structure
```bash
├── backend/
│   ├── config/
│   │   └── .env
│   ├── controller/
│   │   └── auth.controller.js
│   ├── database/
│   │   └── connection.js
│   ├── middleware/
│   │   └── isAuthenticated.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── auth.route.js
│   └── utils/
│       ├── emails/
│       │   ├── generateEmailTemplate.js
│       │   └── transporter.js
│       ├── generateJwtTokenAndSetCookie.js
│       └── sendEmail.js
└── index.js
```
## Configuration
```env
PORT=5000
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>
JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRES_IN=7d
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_EMAIL=<YOUR_SMTP_EMAIL>
SMTP_PASSWORD=<YOUR_SMTP_PASSWORD>
FROM_NAME=<YOUR_NAME_OR_APP_NAME>
FROM_EMAIL=<YOUR_EMAIL>
Client_URI=http://localhost:3000
```

## Contributing
- Fork the repository
- Create a new branch: git checkout -b my-feature-branch
- Commit your changes: git commit -m 'Add new feature'
- Push to the branch: git push origin my-feature-branch
- Create a pull request



