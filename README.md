# Smart Task Manager

Smart Task Manager is a full-stack task management web app built with a React frontend and an Express + MongoDB backend. It supports authentication, personal task tracking, status management, and a modern dashboard UI.

## Highlights

- JWT-based user authentication (register/login)
- Protected dashboard route for authenticated users only
- Create, read, update, and delete tasks
- Task status workflow with pending/completed toggle
- Task status filtering: all, completed, pending
- Dashboard stats cards: total, done, pending
- Priority levels: low, medium, high
- Optional task deadline with overdue indicator
- Delete confirmation popup before removing tasks
- Logout confirmation popup with redirect to login
- Responsive, polished UI using Tailwind CSS

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router DOM, Axios, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Token (JWT), bcryptjs |
| Tooling | ESLint, PostCSS, Autoprefixer, Nodemon |

## Project Structure

```
smart-task-manager/
  client/
    src/
      api/
      components/
      context/
      pages/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
```

## Features in Detail

### Authentication

- Register new users with name, email, and password
- Login existing users with credentials validation
- Password hashing with bcrypt
- JWT token generation and verification
- Frontend route protection using auth context and protected route wrapper

### Task Management

- Add tasks with title, description, priority, and optional deadline
- Fetch tasks scoped to the logged-in user
- Update task status with one-click action
- Delete tasks with confirmation
- Color-coded priority and status badges
- Overdue deadlines highlighted for pending tasks

### Dashboard Experience

- Modern dashboard layout and card-based UI
- Real-time task summary metrics (total/done/pending)
- Filter tasks by status
- Empty state message when no tasks match a filter
- Logout button with confirmation prompt

## API Endpoints

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### Task Routes (Auth Required)

- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Local Setup

### Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB Atlas cluster or local MongoDB connection

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd smart-task-manager
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `server/` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Important: Never commit real secrets to GitHub.

### 4. Run the app

Start backend (Terminal 1):

```bash
cd server
npm run dev
```

Start frontend (Terminal 2):

```bash
cd client
npm run dev
```

Open the app at:

- `http://localhost:5173`

Backend API runs at:

- `http://localhost:5000`

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server (`server/package.json`)

- `npm run dev` - Start server with nodemon
- `npm run start` - Start server with node

## Future Enhancements

- Edit task details in-place
- Drag-and-drop task ordering
- Due date reminders and notifications
- Dark mode toggle
- Automated tests for frontend and backend

## Author

Built by Swastik.
