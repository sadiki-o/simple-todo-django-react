# Frontend - React Application

## Description

This is the frontend application for the Django backend. It is a React-based app that communicates with the Django REST API for user authentication, managing a todo list, and rendering the frontend interface.

Key features of the frontend include:

- User registration, login, and logout.
- Viewing and managing todos (create, read, update, delete).
- JWT authentication for secure access to the backend.

The frontend is built using **React**, and the app is styled using **Tailwindcss** and **Shadcn** components.

## Code structure

### Routing

- I have used react router with the help of protectedRoute component to secure private routes and RedirectIfAuthenticated to redirect user from login/signup if already logged in.
- I have used context to manage states like user and other helpfulmethods.
- for refreshing access token i have used axios interceptor to capture 401 error status and try refreshing.

## Installation

install packages:

```bash
npm install
```

run server:

```bash
npm run dev
```

### Prerequisites

- Node.js (version 16.x or higher)
- npm (Node Package Manager)


### Credentials

**username**: user2
**password**: test