# 🏥 Doctor Patient Management System

A full-stack healthcare management application built using **Spring Boot + React + MySQL** for managing doctors and patients with JWT-based authentication.

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT Authentication
- MySQL
- Swagger / OpenAPI

### Frontend
- React
- Vite
- Axios
- React Router
- CSS / Tailwind

---

# 📁 Project Structure

```text
Doctor-Patient-Management/

backend/

src/main/java/com/example/demo/

config/
controller/
entity/
repository/
security/

frontend/

src/

components/
pages/
services/
context/
```

---

# ⚙ Architecture

```text
React Frontend (5173)
        ↓
Axios Requests
        ↓
Spring Boot API (8080)
        ↓
JPA / Hibernate
        ↓
MySQL Database
```

---

# 🔐 Authentication Flow

```text
Login Page
    ↓
POST /api/auth/login
    ↓
JWT Generated
    ↓
Stored in localStorage
    ↓
Axios Interceptor
    ↓
Protected Requests
```

JWT stored:

```javascript
localStorage.setItem(
"jwtToken",
token
);
```

---

# 🩺 Doctor Module

Entity:

```java
Doctor

id
doctorName
specialization
email
```

Endpoints:

```http
GET /api/doctors

POST /api/doctors

PUT /api/doctors/{id}

DELETE /api/doctors/{id}
```

---

# 🧑 Patient Module

Entity:

```java
Patient

id
patientName
age
disease
```

Endpoints:

```http
GET /api/patients

POST /api/patients

PUT /api/patients/{id}

DELETE /api/patients/{id}
```

---

# 🎨 Frontend Pages

- Login
- Dashboard
- Doctor List
- Add Doctor
- Edit Doctor
- Patient List
- Add Patient
- Edit Patient

---

# 🔗 Frontend Integration

Axios client:

```javascript
const apiClient=axios.create({

baseURL:
"http://localhost:8080/api"

});
```

Example:

```javascript
apiClient.get(
"/doctors"
);
```

Generated URL:

```text
http://localhost:8080/api/doctors
```

---

# 🌐 API Documentation

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# 🛠 Setup

## Clone

```bash
git clone https://github.com/lucifer55555555/Doctor-Patient-Management.git
```

## Backend

```bash
cd demo

mvn clean install

mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Database

Create:

```sql
CREATE DATABASE doctor_patient_db;
```

Update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/doctor_patient_db

spring.datasource.username=root

spring.datasource.password=YOUR_PASSWORD
```

---

# Current Features

✅ JWT Authentication  
✅ React Dashboard  
✅ Doctor CRUD  
✅ Patient CRUD  
✅ Swagger Docs  
✅ Axios Integration  
✅ MySQL Persistence  
✅ Spring Security  
✅ REST Client Testing

---

# Future Scope

- Appointment Management
- Role Based Access
- BCrypt Passwords
- Pagination
- Search Filters
- Docker Deployment
- Jenkins CI/CD
