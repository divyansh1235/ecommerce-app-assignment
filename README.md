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

## Quick Start
```bash
git clone <your-repo-url>
cd ecommerce-assignment
docker-compose up --build

