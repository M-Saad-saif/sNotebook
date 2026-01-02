# 📓 S.Notebook - Modern Note-Taking Application

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#api-endpoints">API</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## ✨ Features

### 🔐 **Authentication & Security**
- ✅ Secure user registration and login
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt.js
- ✅ Protected routes and API endpoints
- ✅ Session management

### 📝 **Note Management**
- ✅ Create, Read, Update, Delete (CRUD) notes
- ✅ Rich text formatting support
- ✅ Add tags/categories to notes
- ✅ Search and filter notes
- ✅ Responsive note cards design

### 🎨 **User Experience**
- ✅ Clean, modern UI with Bootstrap
- ✅ Responsive design for all devices
- ✅ Real-time updates
- ✅ Alert notifications system
- ✅ Intuitive user interface
- ✅ Loading states and error handling

### 🔧 **Technical Features**
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM
- ✅ Express.js backend
- ✅ React frontend with Hooks
- ✅ Context API for state management
- ✅ Environment variables configuration

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/M-Saad-saif/sNotebook.git
cd sNotebook
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**

Create `.env` file in `/backend`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. **Start the application**

**Option A: Run separately**
```bash
# Start backend (from /backend directory)
npm start

# Start frontend (from /frontend directory)
npm start
```

**Option B: Run with concurrent script**
```bash
# From root directory (if configured)
npm run dev
```

5. **Access the application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 🏗️ Project Structure

```
sNotebook/
├── backend/  
│   └── db.js    //Database.js  
│   ├── middleware/
│   │   └── fetchuser.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── .env
|   ├── index.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── index.js
│   │   ├── notes.js
│   │   └── menifest.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.js
│   │   │   ├── Addnote.js
│   │   │   ├── Alert.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js
│   │   │   ├── Noteitems.js
│   │   │   ├── Notes.js
│   │   │   ├── Signup.js
│   │   │   └── UserProfile.js
│   │   ├── context/notes
│   │   │   ├── NoteState.js
│   │   │   └── noteContext.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/getuser` | Get user details |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes/fetchallnotes` | Get all notes |
| POST | `/api/notes/addnote` | Add new note |
| PUT | `/api/notes/updatenote/:id` | Update note |
| DELETE | `/api/notes/deletenote/:id` | Delete note |

---

## 🛠️ Tech Stack

### **Frontend**
- **React** - UI library
- **React Router** - Routing
- **Context API** - State management
- **Bootstrap** - Styling framework
- **Font Awesome** - Icons
- **Axios** - HTTP client

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **cors** - Cross-origin resource sharing

### **Development Tools**
- **Git** - Version control
- **Postman** - API testing
- **VS Code** - Code editor

---

## 🚀 Deployment Guide

### Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

---


## 👨‍💻 Author

**Muhammad Saad Saif**
- GitHub: [@M-Saad-saif](https://github.com/M-Saad-saif)
- LinkedIn: [Muhammad Saad Saif](https://linkedin.com/in/muhammad-saad-saif)
- Email: gcsaadsaif123@gmail.com

## 🙏 Acknowledgments

- Inspired by modern note-taking applications
- Built with ❤️ using MERN stack

---

<p align="center">
  Made by Muhammad Saad Saif
</p>

<p align="center">
  <a href="https://github.com/M-Saad-saif/sNotebook/issues">Report Bug</a> •
  <a href="https://github.com/M-Saad-saif/sNotebook/issues">Request Feature</a>
</p>
