# Project

This project is a technical test for the company DS-INTEGRATION. It is a backend designed to simulate a chatbot, integrated with the ChatGPT API. It is built with Node.js and Express, using a modular architecture and basic dependency configuration for backend development.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Technical Decisions Made](#technical-decisions-made)
- [Challenges Encountered and How You Resolved Them](#challenges-encountered-and-how-you-resolved-them)
- [Author](#author)
- [License](#license)

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [NPM](https://www.npmjs.com/) (included with Node.js)
- [Nodemon](https://nodemon.io/) (globally installed, optional for development)

## Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory.

```bash
cd project
```

3. Install the required dependencies.

```bash
npm install
```

4. Create a `.env` file at the root of the project to configure environment variables. Example content:

```
PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongo_database_uri
OPENAI_API_KEY=your_openai_api_key
```

## Usage

Start the server by running the following command:

```bash
npm start
```

By default, the server will run on the port defined in your `.env` file (e.g., `http://localhost:3000`).

## Scripts

- **`npm start`**: Starts the server.

## Dependencies

This project uses the following dependencies:

- **[axios](https://www.npmjs.com/package/axios)**: For making HTTP requests, including integration with the OpenAI API.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: For password hashing.
- **[cors](https://www.npmjs.com/package/cors)**: To enable CORS in the server.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: To manage environment variables.
- **[express](https://www.npmjs.com/package/express)**: Web framework for Node.js.
- **[express-validator](https://www.npmjs.com/package/express-validator)**: For validating data in HTTP requests.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: For authentication and handling JWTs.
- **[mongoose](https://www.npmjs.com/package/mongoose)**: For connecting to and managing MongoDB databases.
- **[openai](https://www.npmjs.com/package/openai)**: For integration with the OpenAI API.

## Technical Decisions Made

1. **Users and authentication**: The test did not require the creation of users and authentication, however, as a sample of experience we added the creation of users and the need for authentication to execute any other request.
2. **Integration with OpenAI API**: The OpenAI API was chosen for its robust capabilities in natural language processing, which aligns perfectly with the requirements of the chatbot.


## Challenges Encountered and How You Resolved Them

1. **Time to complete**:
   - As for the development of the api I could have many ideas and do a more complete work, however, due to time constraints due to my current job the solution presented is basic.


## Author

This project was created by **Alejandro Londoño**.

## License

This project is licensed under the ISC license. For more information, see the LICENSE file (if available).
