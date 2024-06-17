============================================
============================================
## EXAMPLE DOCUMENTATION
### Ask for the Home Page
#### Step 1
Predicted Request components:
- Method: GET
- URL: /
- Headers: none
- Body: none

Predicted Response components:
- Status Code: 200
- Headers:
  - Content-Type: text/html
- Body: HTML page with navigation links to other pages

#### Step 2
In your browser open the chrome dev tools, navigate to [http://localhost:5000] and make a GET request for the Home Page (type "/" into the URL after 5000 and hit "enter").
Explore the "network" tab and find where you can compare your predicted request/response components to the actual components.

#### Step 3
If your prediction was wrong, try to understand why it was incorrect and then update your documentation to the correct request/response components.

Congratulations! You have performed a GET request to / showing the home page of our e-commerce
website. Move on to the next request/response documentation.

* Note
    - Headers contain many keys, but for this exercise focus on **Content-Type** and **Location**.

=============================================
=============================================

### Ask for a page that doesn't exist

Request components:
- Method: GET
- URL: /test
- Headers: none
- Body: none

Response components:
- Status code:  404
- Headers:
    - Content-Type: text/html
- Body: HTML page indicating 404 error

### Ask for the products list page

Request components:
- Method: GET
- URL: /products
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: HTML page with links to navigation / prodcut list

### Ask for the product detail page

Here's an example product on the server:

| detail      | value                                                      |
| ----------- | ---------------------------------------------------------- |
| productId   | 1                                                          |
| name        | "Facial Cleansing Brush"                                   |
| description | "Reaches deep pores to cleanse oil, dirt, and blackheads." |
| price       | 23.99                                                      |
| categories  | "beauty", "electronics"                                    |

Request components:
- Method: GET
- URL:  /products/1
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: html page with product details about the product with product ID of 1 (which is 'facial cleansing brush'), review entry fields / links

### Ask for the create new product page

Request components:
- Method: GET
- URL:  /products/new
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: html page with fields to enter information about the new product

### Submit a new product

Remember, for a traditional HTML web server, whenever a successful `POST`
request is sent to the server, the server should respond with a redirection to
a page.

After successful submission, user should be looking at the product detail page.

Here are the categories on the server:

| tag         | name           |
| ----------- | -------------- |
| grocery     | Grocery        |
| electronics | Electronics    |
| beauty      | Beauty         |
| toys-games  | Toys and Games |
| health      | Health         |
| furniture   | Furniture      |
| clothing    | Clothing       |

* Note: In Chome dev tools, if the "body" of a request exists, it will appear
in the network tab as "payload".

Request components:
- Method: POST
- URL:  /products
- Headers:
    - Content-Type: application/x-www-form-urlencoded
- Body: Payload -->
    name 'Test Prod'
    description 'Test Prod Desc'
    price '9.99'
    categories 'Electronics'

Response components:
- Status code: 302
- Headers:
    - Content-Type: text/html
    - Location: /products/2 (or whatever the new product ID number is)
- Body: html page indicating the details of the newly created product

### Ask for the edit product page

Request components:
- Method: GET
- URL: /products/[product ID #]/edit
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: html page with elements to allow the user to edit details about the product (editable fields, dropdown for category, etc)

### Submit an edit for an existing product

After successful submission, user should be looking at the product detail page.

Request components:
- Method: POST
- URL: /products/[product ID #] (this case, product ID is 2)
- Headers:
    - Content-Type: application/x-www-form-urlencoded
- Body:
    name 'Test Prod Edit'
    description 'Edited Test Prod Desc'
    price '$19.99'
    categories 'Toys and Games'

Response components:
- Status code: 302
- Headers:
    - Content-Type: text/html
    - Location: /products/[product ID #] (in this case the product ID is 2)
- Body: html page showing the details of the product, but now reflecting the edited values

### Submit a delete for an existing product

After successful submission, user should be looking at the products list page.

Request components:
- Method: POST
- URL: /products/[product ID #]/delete
- Headers:
    - Content-Type: application/x-www-form-urlencoded
- Body: none

Response components:
- Status code: 302
- Headers:
    - Content-Type: text/html
    - Location: /products
- Body: html page with the products list

### Submit a new review for a product

After successful submission, user should be looking at the product detail page.

Here's an example review on the server:

| detail     | value                  |
| ---------- | ---------------------- |
| reviewId   | 1                      |
| comment    | "I love this product!" |
| starRating | 5                      |
| productId  | 1                      |

Request components:
- Method: POST
- URL: /products/[product ID #]/reviews (in this case the product ID is 1)
- Headers:
    - Content-Type: application/x-www-form-urlencoded
- Body:
    comment: 'Test Review'
    starRating: '3'

Response components:
- Status code: 302
- Headers:
    - Content-Type: text/html
    - location: /products/[product ID #] (in this case the product ID is 1)
- Body: html web page with the product details that also includes the latest added review

### Ask for the edit review page for a product

Request components:
- Method: GET
- URL: reviews/[review ID #]/edit (in this case, review ID = 2)
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: web page with review entry fields populated with current review info

### Submit an edit for an existing review

After successful submission, user should be looking at the product detail page.

Request components:
- Method: POST
- URL: /reviews/[review ID #] (in this case the review ID = 2)
- Headers:
    - Content-Type: application/x-www-form-urlencoded
- Body:
    comment 'Test Review Edit'
    starRating '2'

Response components:
- Status code: 302
- Headers:
    - Content-Type: text/html
    - Location: /products/[product ID #] (in this case the product ID = 1)
- Body: html web page with product details for the product whose review was just edited

### Submit a delete for an existing review

After successful submission, user should be looking at the product detail page.

Request components:
- Method: POST
- URL: /reviews/[review ID #]/delete (in this case the review ID = 2)
- Headers:
    - Content-Type: application/x-www-form-urlencoded
- Body: none

Response components:
- Status code: 302
- Headers:
    - Content-Type: text/html
    - Location: /products/[product ID #] (in this case the product ID = 1)
- Body: product details web page for the product whose review was just deleted

### Ask for all the products in a particular category by tag of the category

Request components:
- Method: GET
- URL: /categories/[category name]/products (in this case category name = electronics)
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: web page displaying all of the products within that particularly selected category

### Ask for the best-selling product

Look for clues in the HTML pages from the prior responses for what the route should be.

Request components:
- Method: GET
- URL: /products/best-selling
- Headers: none
- Body: none

Response components:
- Status code: 200
- Headers:
    - Content-Type: text/html
- Body: html web page displaying products within the 'best-selling-products' category
