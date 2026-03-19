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
bash
git clone <your-repo-url>
cd ecommerce-assignment
docker-compose up --build

##PAGES
##Home Page
![HomePage](https://github.com/user-attachments/assets/042a394b-2378-4775-ad2a-004f49582a9b)

##Cart Page
![CartPage](https://github.com/user-attachments/assets/b42b16e9-bc83-4fe8-b096-63e243319231)

##Order Page
![OrdersPage](https://github.com/user-attachments/assets/9ba1f57f-405d-47ba-9570-8a5b005c9544)

