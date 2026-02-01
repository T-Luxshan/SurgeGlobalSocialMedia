# LinkNestSocialMedia

LinkNestSocialMedia is a full-stack social media application platform built with a modern technology stack. It features a responsive frontend, a robust backend API, and containerized deployment.

##  Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (v18)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **State/Data**: Axios, React Query (implied) or standard hooks
- **Forms & Validation**: React Hook Form, Yup
- **Authentication**: Firebase (for specific auth flows), React Google Recaptcha, OTP Input
- **Utilities**: date-fns, dayjs, jwt-decode
- **Routing**: React Router DOM

### Backend
- **Framework**: [Spring Boot](https://spring.io/projects/spring-boot) (v3.2.3)
- **Language**: Java 17
- **Database ORM**: Spring Data JPA
- **Security**: Spring Security, JWT (JSON Web Tokens)
- **Validation**: Spring Boot Validation
- **Mail Services**: Spring Boot Starter Mail

### Infrastructure & Database
- **Database**: MySQL 8.0
- **Management**: phpMyAdmin (included in docker-compose)
- **Containerization**: Docker, Docker Compose

## Features
- **User Authentication**: Secure login/signup using JWT and potentially Firebase/OTP.
- **Responsive UI**: Built with Material UI for a polished look across devices.
- **Database Integration**: fully integrated MySQL database with JPA relationships.
- **Email Notifications**: Integration with mail services.
- **CAPTCHA Protection**: Google Recaptcha integration.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (v16+ recommended) - *If running frontend locally*
- [Java 17 JDK](https://adoptium.net/) - *If running backend locally*
- [Maven](https://maven.apache.org/) - *If running backend locally*

## Installation & Setup

The easiest way to run the application is using Docker Compose.

### 1. Clone the Repository
```bash
git clone https://github.com/T-Luxshan/LinkNestSocialMedia.git
cd LinkNestSocialMedia
```

### 2. Run with Docker Compose
This will start the Frontend, Backend, MySQL database, and phpMyAdmin.

```bash
docker-compose up --build
```

**Services will be available at:**
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **phpMyAdmin**: [http://localhost:8081](http://localhost:8081)
  - *Server*: `mysqldb`
  - *Username*: `root`
  - *Password*: `root`

---

##  Manual Setup (Development)

If you prefer to run services individually without Docker:

### Backend (Spring Boot)
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Configure your database in `src/main/resources/application.properties` (or `.env` if configured) to match your local MySQL instance.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
LinkNestSocialMedia/
├── frontend/           # React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── server/             # Spring Boot backend application
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── docker-compose.yml  # Docker orchestration
└── README.md           # Project documentation
```
