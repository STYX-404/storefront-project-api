# Storefront Backend Project

## Table of Contents

- [Description](#Description)
- [Prerequisites](#Prerequisites)
- [Instructions](#Instructions)

## Description

This is a storefront-api Project for FWD schoolership.

## Prerequisites

Your machine must have the following installed on it:

- [Node/NPM](https://nodejs.org/en/download/) (v16 or higher)

## Instructions

### 1. Install Dependencies

After Cloning the project, head inside the project folder and run

```
npm install
```

### 2. DB Creation and Migrations

```
cp .env.example .env
```

Now, replace .env with your credentials and then run

```
npm run migrate:up
```

### 3. Starting the project

```
npm run start
```

### 4. Running the tests

```
npm run test
```

And by now you should be able to go to `localhost:3000` to test that everything is working as expected.

### .env File Example

```
# dev | test | prod
NODE_ENV=NODE_ENV
DB_HOST=DB_HOST
DB_NAME=DB_NAME
DB_TEST_NAME=DB_TEST_NAME
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD
JWT_KEY=JWT_KEY
BCRYPT_PASSWORD=BCRYPT_PASSWORD
SALT_ROUNDS=SALT_ROUNDS

```

- NODE_ENV is your default node environment
- DB_HOST is your database host
- DB_NAME is your database name
- DB_TEST_NAME is the name of your test database
- DB_USERNAME is your database username
- DB_PASSWORD is your database password
- JWT_KEY is the secret you use for generating Authentication tokens
- BCRYPT_PASSWORD is the salt you use for generating encrypted passwords
- SALT_ROUNDS is the the number of encryption rounds

### The API Endpoints available

## The Users Endpoints

- `localhost:3000/users` : return all users from the database [GET]
- `localhost:3000/users/:id` : return one user from database by id [GET]
- `localhost:3000/users` : insert new user in the database [POST]
- `localhost:3000/products` : return all products from the database [GET]
- `localhost:3000/products/:id` : return one product from database by id [GET]
- `localhost:3000/products` : insert new product in the database [POST]
- `localhost:3000/orders` : return all orders from the database [GET]
- `localhost:3000/orders` : insert new order in the database [POST]
- `localhost:3000/orders/:id` : return one order from the database by id [GET]
- `localhost:3000/orders/:id/products` : add a product to the order [POST]
