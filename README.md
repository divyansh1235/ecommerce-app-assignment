# ecommerce-app-assignment
For Assignment
# Full-Stack E-Commerce Application

## Tech Stack
| Layer      | Technology                                     |
|------------|------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS                  |
| State/API  | Redux Toolkit + RTK Query                     |
| Backend    | Java 17, Spring Boot 3, Spring Data JPA       |
| Database   | MySQL 8                                       |
| Mapping    | MapStruct (compile-time DTO↔Entity)           |
| Container  | Docker, Docker Compose, Nginx                 |

## Architecture
Loosely coupled layered architecture:
Controller → Service Interface → ServiceImpl → Repository → MySQL  
DTOs are used at Controller↔Service boundary.  
Entities stay within Service↔Repository.

## Docker Setup

## Prerequisites

[Docker Desktop] installed and running

## Run the full app with one command
docker compose up --build


Frontend: http://localhost:3000
Backend API: http://localhost:8080/api/products
MySQL: localhost:3307

## Stop the app
docker compose down





##PAGES
##Home Page
![HomePage](https://github.com/user-attachments/assets/042a394b-2378-4775-ad2a-004f49582a9b)

##Cart Page
![CartPage](https://github.com/user-attachments/assets/b42b16e9-bc83-4fe8-b096-63e243319231)

##Order Page
![OrdersPage](https://github.com/user-attachments/assets/9ba1f57f-405d-47ba-9570-8a5b005c9544)


##  What This Application Does

This is a full-stack e-commerce application where users can:

- Browse products
- Add/remove items from cart
- Update quantity dynamically
- Place orders
- View order history

##  Application Flow

1. User opens the frontend (React app)
2. Frontend fetches products from backend API
3. User adds items to cart
4. Cart state is managed using Redux Toolkit
5. User places order
6. Backend processes order and stores it in MySQL
7. User can view order history

##  System Flow

Frontend (React)
        ↓
Nginx (Reverse Proxy)
        ↓
Backend (Spring Boot)
        ↓
Database (MySQL)

