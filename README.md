# 🎉Storefront-API Project

## Table of Content📃

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Instructions](#instructions)
- [.env File Example](#env-file-example)
- [API Endpoints](#api-endpoints)

## 🌵Description

This is a storefront-api Project for FWD schoolership.

## 🥇Prerequisites

Your machine must have the following installed on it:

- [Node/NPM](https://nodejs.org/en/download/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/download) (14)

## 📝Instructions

### 1. ⬇️Install Dependencies

After Cloning the project, head inside the project folder and run

```
npm install
```

### 2. 🛠️DB Creation and Migrations
- Make an .env file from .env.example file
```
cp .env.example .env
```
 - Create super-user (owner) in Postgres
```
CREATE USER owner SUPERUSER WITH PASSWORD 'password123';
```
 - Create a DEV database (store)
```
CREATE DATABASE store
```
 - Create the TEST database (store-test)
```
CREATE DATABASE store-test
```
 - Grant all permissions to the super-user (owner) on the DEV and TEST database
```
GRANT ALL PRIVILEGES ON DATABASE store TO owner;
GRANT ALL PRIVILEGES ON DATABASE store-test TO owner;
```

 - Now, replace .env with your credentials and then run ( see [.env file example](#env-file-example) )

```
npm run migrate:up
```
**_The default database PORT is 5432_**

### 3. 🟢Starting the project

```
npm run start
```

### 4. 🧪Running the tests

```
npm run test
```

And by now you should be able to go to `localhost:3000` to test that everything is working as expected.

## 📄.env File Example

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

- `NODE_ENV` _is your default node environment (**dev** or **test** or **prod**)_
- `DB_HOST` _is your database host (The default is the localhost)_
- `DB_NAME` _is your database name (should be **store**)_
- `DB_TEST_NAME` _is the name of your test database (should be **store-test**)_
- `DB_USERNAME` _is your database username (should be **owner**)_
- `DB_PASSWORD` _is your database password (should be **password123**)_
- `JWT_KEY` _is the secret you use for generating Authentication tokens_
- `BCRYPT_PASSWORD` _is the salt you use for generating encrypted passwords_
- `SALT_ROUNDS` _is the the number of encryption rounds_

## 🚩API Endpoints

### 🚧The Users Endpoints

- `localhost:3000/users`  return all users from the database            **[GET]**
- `localhost:3000/users/:id`  return one user from database by id       **[GET]**
- `localhost:3000/users`  insert new user in the database               **[POST]**
### 🚧The Products Endpoints

- `localhost:3000/products`  return all products from the database      **[GET]**
- `localhost:3000/products/:id`  return one product from database by id **[GET]**
- `localhost:3000/products`  insert new product in the database         **[POST]**
### 🚧The Orders Endpoints
- `localhost:3000/orders`  return all orders from the database          **[GET]**
- `localhost:3000/orders`  insert new order in the database             **[POST]**
- `localhost:3000/orders/:id`  return one order from the database by id **[GET]**
- `localhost:3000/orders/:id/products`  add a product to the order      **[POST]**
