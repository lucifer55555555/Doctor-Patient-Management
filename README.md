# 🏥 Doctor Patient Management System

A full-stack healthcare management application developed using **Spring Boot** and **React (Vite)** for managing doctors and patients efficiently. The system includes authentication, protected routes, doctor/patient CRUD operations, and a responsive dashboard interface.

## 🚀 Features

### Authentication & Security
- JWT-based authentication
- Secure login system
- Protected frontend routes
- Session handling

### Doctor Management
- Add new doctors
- Update doctor details
- Delete doctors
- View doctor list

### Patient Management
- Add patients
- Edit patient information
- Delete patient records
- View patient details

### Dashboard
- Centralized admin dashboard
- Navigation for doctors and patients
- Responsive UI

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Context API
- CSS

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs
- Maven

### Database
- MySQL

## 📂 Project Structure

```bash
Doctor-Patient-Management/
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
│── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── security/
```

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/lucifer55555555/Doctor-Patient-Management.git

cd Doctor-Patient-Management
```

### Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## API Testing

Use:

- VS Code REST Client
- Postman
- Thunder Client

Example:

```http
POST /api/auth/login
```

```json
{
    "username":"admin",
    "password":"admin123"
}
```

## Future Enhancements

- Appointment scheduling
- Role-based access
- Medical history
- Reports generation
- Notifications
- Analytics dashboard

## Author

**Pratham Chandpurkar**

GitHub:

https://github.com/lucifer55555555
