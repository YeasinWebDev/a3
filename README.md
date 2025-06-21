#  Library Management Api

 ### A RESTful Library Management System built using Express, TypeScript, and MongoDB (Mongoose). 
 It allows users to manage books and borrowing activities, with robust validation, 
 business logic enforcement, and aggregation queries.


 ## Features

  * 🔒 **Book Management**
    1. Create, Read, Update, Delete (CRUD)
    2. Genre filtering, sorting, and pagination
    3. Schema validation with meaningful error responses
  
  * 📖 **Borrow Management**
     1. Borrow books with quantity and due date
     2. Automatically updates book availability
     3. Enforces borrowing rules via business logic
     4. Uses Mongoose static methods

  * 📊 **Borrow Summary**
     1. Aggregated view of all borrowed books with total quantity
     2. Returns book titles and ISBNs via MongoDB aggregation pipeline

   *  ✅ **Schema Validation**  
      1.Mongoose validations with detailed error handling and messages

   *  ⚙️ **Filtering & Sorting**  
     1.  Genre-based filtering  
     2.  Sorting by fields like createdAt  
     3.  Pagination via limit query  



## ⚙️ Setup Instructions

### 1. Clone the Repository
 ``
   git clone https://github.com/your-username/library-management-api.git
   cd library-management-api
``  

### 2. Install Dependencies
``
    npm install
    # or
    yarn install
``  

### 3. Configure Environment Variables
``
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/library-management
``  

### 4. Run the Server
``
    npm run dev
``  


##  API Endpoints  
 ### 📚 Books  
| Method | Endpoint              | Description                              |
|--------|-----------------------|------------------------------------------|
| POST   | `/api/books`          | Create a new book                        |
| GET    | `/api/books`          | Retrieve all books (with filtering & sorting) |
| GET    | `/api/books/:bookId`  | Get single book by ID                    |
| PUT    | `/api/books/:bookId`  | Update a book                            |
| DELETE | `/api/books/:bookId`  | Delete a book                            |

### 🔄 Borrow  
| Method | Endpoint        | Description                          |
|--------|------------------|--------------------------------------|
| POST   | `/api/borrow`    | Borrow books with due date           |
| GET    | `/api/borrow`    | Aggregated summary of borrow records |  



## 📧 Contact
If you have any questions or suggestions, feel free to reach out!

* Portfolio : [Yeasin Arafat](https://yeasin-arafat-portfolio.netlify.app)
* LinkedIn: [Yeasin Arafat](https://www.linkedin.com/in/yeasinarafat121)








