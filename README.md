# node-book-directory-api

 **Open Endpoints** <br />
Open endpoints that require no Authentication.

  * [Login](docs/users/login.md)                    : `POST /users/login/` 
  * [Signup](docs/users/signup.md)                   : `POST /users/signup/`
  * [Show all books](docs/books/GET.md)           : `GET /books/` 
  * [Show all Sequels](docs/sequel/GET.md)  : `GET /sequel/`

 **Endpoints that require Authentication** <br />
Each endpoint manipulates or displays information related to the User whose Token is provided with the request:

  * [Show all users](docs/users/GET.md)          : `GET /user/`
  * [Show a book](docs/books/id/GET.md)              : `GET /books/:id` 
  * [Update book info](docs/books/id/PUT.md)        : `PUT /book/:id`
  * [Delete book info](docs/books/id/DELETE.md)        : `DELETE /book/id`
  * [Add a book](docs/books/POST.md)  :`POST /book/`
  * [Add a Sequel](docs/sequel/POST.md) : `POST /sequel/`
  * [Delete Book from Sequel](docs/books/id/sequel/DELETE.md)   : `DELETE /book/:id/sequel`
