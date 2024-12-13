# Dating App 💘  
## Project Overview  
This is a Tinder-like dating web application that allows users to create profiles, set preferences, match with potential partners, and chat in real-time.

## Technologies Stack
- Frontend: Vue.js  
- Backend: Express.js, Node.js  
- Database: PostgreSQL  
- DevOps: Docker, Docker Compose  

## Prerequisites
Before you begin, ensure you have the following installed:  
- Docker  
- Docker Compose  
- Git  

## Project Setup
1. Clone the Repository  
2. `git clone <your-repository-url>`  
3. `cd <project-directory>`  


## Environment Configuration
- Create a .env file in the root directory with necessary environment variables like the .env.example and add:  
random jwt access token  
1. random jwt refresh token  
2. address mail for sending verification and reset password mail  
3. password of the mail address  

## Launch the Application
To start the entire application, run:  

```bash
docker-compose up
```  


This will build and start four containers:  
- Frontend (Vue.js)  
- Backend (Express.js)  
- PostgreSQL Database  
- pgAdmin (Database Management)  

## Access the Application
Open your browser and navigate to:  
Application: http://localhost:8080  
pgAdmin: http://localhost:5050  

## Project Structure
```bash
project-root/  
│  
├── frontend/           # Vue.js frontend  
├── backend/            # Express.js backend  
├── database/           # PostgreSQL database scripts  
├── docker-compose.yml  # Docker Compose configuration  
└── README.md           # Project documentation  
```


## Features
- User Profile Creation  
- Preference Settings  
- Real-time Matching  
- Instant Messaging  
- User Authentication  

## Development
### Frontend Development  
```bash
cd frontend  
npm install  
npm run serve  
```

### Backend Development
```bash
cd backend  
npm install  
npm run dev  
```


### Docker Management
- Start Containers: `docker-compose up`  
- Stop Containers: `docker-compose down`  
- Rebuild Containers: `docker-compose up --build`  

## Contributing
### Fork the repository
- Create your feature branch (git checkout -b feature/AmazingFeature)  
- Commit your changes (git commit -m 'Add some AmazingFeature')  
- Push to the branch (git push origin feature/AmazingFeature)  
- Open a Pull Request  

### License
Specify your project's license here (e.g., MIT, Apache 2.0)