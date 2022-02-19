# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                                     [/products]         [GET]
- Show (args: product id)                   [/products/:id]     [GET]
- Create (args: Product)                    [/products]         [POST]

#### Users
- Index [token required]                [/users]        [GET]
- Show (args: id)[token required]       [/users/:id]    [GET]
- Create (args: User)[token required]   [/users]        [POST]

#### Orders
- Current Order by user (args: user id)[token required] [/orders]   [GET]

## Data Shapes
#### Product
-  id   [SERIAL PEIMARY KEY]
- name  [VARCHAR(100)]
- price [FLOAT]

#### User
-  id   [SERIAL PEIMARY KEY]
- firstName [VARCHAR(50)]
- lastName  [VARCHAR(50)]
- password  [VARCHAR(300)]

#### Orders
- id                                        [SERIAL PEIMARY KEY]
- id of each product in the order           [INTEGER FORIGN KEY REFERENCES products(id)]
- quantity of each product in the order     [INTEGER]
- user_id                                   [INTEGER FORIGN KEY REFERENCES users(id)]
- status of order (active or complete)      [VARCHAR(20)]

