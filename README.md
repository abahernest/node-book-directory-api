# node-book-directory-api

 **Open Endpoints** <br />
Open endpoints that require no Authentication.

  * [Login](docs/users/login.md)                    : `POST /users/login/` 
  * [Signup](docs/users/signup.md)                   : `POST /users/signup/`
  * [Show all books](docs/books/GET.md)           : `GET /books/` 
  * [Show a book](docs/books/GET.md)              : `GET /books/:id` 

 **Endpoints that require Authentication** <br />
Each endpoint manipulates or displays information related to the User whose Token is provided with the request:

  * [Show all users](docs/users/GET.md)          : `GET /user/`
  * [Update book info](docs/books/id/PUT.md)        : `PUT /book/:id`
  * [Delete book info](docs/books/id/DELETE.md)        : `DELETE /book/id`