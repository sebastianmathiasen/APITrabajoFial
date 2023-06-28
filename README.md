
# Imaginarium: A Kid-Friendly Historical Fact Learning Platform

This repository contains the back-end code for Imaginarium, a platform designed to help children learn about historical facts in a fun and engaging way. The platform presents information as stories featuring heroes and villains, making learning more engaging for young users.


## Table of Contents

- Technology Stack
- Installation
- Usage
- Contributing
- License


## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- OpenAI's GPT-3
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing


## Installation

Clone this repository.

```bash
  git clone https://github.com/user/imaginarium.git

```
Change into the directory.
```bash
  cd imaginarium

```
Install the dependencies.
```bash
  npm install

```
Create a .env file to store your environment variables, such as your OpenAI API key, MongoDB connection string, and JWT secret.
```bash
  OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```
Start the server.
```bash
  npm start

```

    
## Usage

The following endpoints are available:

- GET /api/posts: Retrieves all posts.

- GET /api/posts/find/:query: Retrieves posts by title or historical fact.

- POST /api/posts: Creates a new post. Requires authentication.

- GET /api/users: Retrieves all users. Requires authentication.

- POST /api/users: Creates a new user.

- PATCH /api/users/:id: Updates a user's details. Requires authentication.

- DELETE /api/users/:id: Deletes a user. Requires authentication.

- POST /api/users/login: Authenticates a user and returns a token.

- POST /api/users/forgot-password: Sends password reset instructions to a user's email.

- GET /api/users/reset/:token: Validates a password reset token.

- POST /api/users/reset/:token: Updates a user's password using a valid reset token.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.