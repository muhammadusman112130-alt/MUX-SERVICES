# Web Project - MVC Architecture with React

A modern React application built with MVC (Model-View-Controller) architecture pattern using Vite.

## 🏗️ Architecture

This project follows the MVC architectural pattern:

- **Model**: Data structures and business logic (`src/models/`)
- **View**: UI components and presentation layer (`src/views/`, `src/components/`)
- **Controller**: Business logic and coordination between Model and View (`src/controllers/`)

## 📁 Project Structure

```
web-project/
├── src/
│   ├── models/              # Data models
│   │   └── UserModel.js     # User data structure and business logic
│   ├── views/               # Page-level components
│   │   ├── HomeView.jsx    # Home page with user list
│   │   ├── HomeView.css
│   │   ├── AboutView.jsx   # About page explaining MVC
│   │   └── AboutView.css
│   ├── controllers/         # Business logic
│   │   └── UserController.js # User data management
│   ├── components/          # Reusable components
│   │   ├── UserList.jsx    # User list display component
│   │   └── UserList.css
│   ├── App.jsx              # Main app with routing
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Features

- **MVC Architecture**: Clean separation of concerns
- **User Management**: Display, search, and filter users
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Beautiful gradient design with smooth animations
- **Routing**: React Router for navigation

## 📝 MVC Implementation

### Model (UserModel.js)
- Defines user data structure
- Contains business logic methods (isAdmin, getFullName)
- Simulates API calls with static methods

### View (HomeView.jsx, AboutView.jsx)
- HomeView: Displays user list with search functionality
- AboutView: Explains MVC architecture
- Uses components for reusable UI elements

### Controller (UserController.js)
- Manages user data state
- Coordinates between Model and View
- Provides filtering and search logic

## 🎨 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with modern features

## 📄 License

This project is open source and available for educational purposes.
