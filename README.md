# cs326_final_project_emilio_dante

## Team : github username

Dante Eschleman: deschleman
Emilio Velazquez: EmilioVelazquezCarter

---

## project/application background:

The application is an Express/Node.js web application, which uses MongoDB/Mongoose for our database connection and EJS for server-rendered HTML views, with Tailwind-generated CSS in public/style.css. The project hopes to host organizations on our website in creating volunteering opportunities for initiatives that are held for the respective company. The domain is intended to provide a platform for initiatives that help the community in which the initiative is based in.

The application has a MongoDB Listing model/repository with fields for title, organization, description, city, and ownerId; Mongoose timestamps also create createdAt and updatedAt. Authentication is implemented through the auth service, repository, controllers, routes, and session system. Users can create an account through GET /signup and submit the signup form with POST /signup; passwords are hashed with bcrypt before being stored (session based authorization as opposed to tokenized authorization), duplicate emails are rejected, and signup redirects to /login after successful registration.

Users can access the login page through GET /login and submit credentials through POST /login; successful login creates a server-side session and sets an HTTP-only signed sessionId cookie, then redirects the user to /listings. Logout is handled through the POST /logout route, which destroys the session and clears the cookie. Authentication is enforced through the requireLogin middleware: unauthenticated users attempting protected actions receive a 401 response. When a listing is created, its ownerId is taken from the currently authenticated user, which allows the application to enforce ownership authorization. A user can delete their own listing, while attempting to delete another user's listing returns 403 Forbidden with the message You do not have permission to delete this listing.

Users sign up for the volunter listing page and log in with an email and password. Passwords are successfully hashed with bcrypt before ever being stored. A successful login creates a signed, HTTP only session cookie. The application has two roles: `member`: can create listings and delete only listings they own, but not all; `admin`: can delete any listing.

---

## Application control pre-publication (audit):

We verified this authorization behavior manually by creating two separate users, logging them in with separate session cookies, creating a listing as User Two, and then attempting to delete User Two's listing while authenticated as User One; the request correctly returned 403 Forbidden. We also verified that attempting to create a listing without authentication returns 401 Unauthorized, while creating one with a valid authenticated session returns 303 See Other and redirects to /listings. We confirmed the created listing is actually persisted in MongoDB and contains the correct ownerId, along with its timestamps.

---

## Application rendering:

The homepage is rendered through views/home_page.ejs at GET / and includes the shared views/partials/header.ejs; the listings page is rendered through views/listings.ejs and also uses the shared header. The signup and login pages are views/signup.ejs and views/login.ejs, and both use the shared stylesheet at /style.css.

---

## flow:

A visitor can view the site/listings, create an account, log in, create volunteer listings while authenticated, and delete listings they own. The application maintains the layered architecture as specified: routes handle HTTP routing, controllers coordinate requests/responses, repositories handle database operations, and middleware handles authentication/authorization. The listing repository uses Mongoose and exposes operations such as retrieving all listings, finding a listing by ID, creating listings, updating listings, and removing listings; it also validates MongoDB IDs. The authentication service handles signup/login validation and password hashing/comparison.

---

## Testing:

The expected command for running the tests created with jest is: "npm test" in your terminal. This should run all of the tests that have been created in the test suite (1 suite; 9 tests) - which should all pass. Tests include validation for missing title, city, organization, and description; rejection of organization/title values containing only spaces; trimming input values before saving; creation of valid listings; and returning all listings.

---

## system diagram:

browser
|
|
express server
|

- -- > authentication and sessions
  | |
  | v
  | MongoDB users
  |
- -- > listing routes
  |
  v
  listing service and authorization
  |
  v
  MongoDB listings

---

## setup instructions:

The .env file is local configuration and should NOT be committed to GitHub. A fresh contributor must create their own .env file. MONGODB_URI must point to the MongoDB database used by the application, and SESSION_SECRET to sign authentication cookies. DO NOT commit real MongoDB credentials or secrets to the existing or new repo.

---

## environment variables:

The environment variable MONGODB_URI is the MongoDB connection string used by Mongoose when connecting to a database container, if this is missing or there are any errors connecting to this expect the following message: "MONGODB_URI is missing. To fix add it to your .env file". Consult the README or files in the repo to debug if needed (most likely will not have to if you have connection or have the mongo atlas configured to your URL) to check wether you had not configured the .env file with your mongo db atlas credentials as such.

Clone command sequence: npm install, create/configure local .env, npm run seed to populate the development database, npm start to start the application. If the database already contains the required data and seeding is not necessary for every startup. The npm run seed is a one-time/setup command rather than something that must be run every time the server starts. The application is then accessed at http://localhost:3000.

The finished project includes a database seed file which connects to the MongoDB database specified by MONGODB_URI, inserts the project's sample development data, and exits after completing the operation.
After cloning the repo, installing dependencies, and creating the .env file with a valid MONGODB_URI, the contributor can run npm run seed to populate the MongoDB database with the project's sample development data. The contributor should not need to manually insert MongoDB documents. The seed command is the reproducible way to prepare a fresh database for development/testing.

---

## Clean clone and single-command startup:

1. Clone the public GitHub repository (easiest through the github page UI)
2. Enter the project directory.
3. Run in your terminal once cloned locally 'npm install' to install all dependencies from package.json/package-lock.json.
4. Create a local .env file.
5. Add the required MONGODB_URI and SESSION_SECRET values.
6. Run 'npm run seed' in your terminal to populate the development database.
7. Run 'npm test' in your terminal to verify the Jest test suite.
8. Run 'npm start' in your terminal to start the Express server.
9. Visit the following URL http://localhost:3000 in a browser. (can also run server.js in one terminal and run 'curl {the URL you want to access} in another terminal)

Notes:

- 'npm run seed' prepares the MongoDB development data, while npm start starts the web application. It is part of developer/deployment setup.
- for new contributors : A new contributor may first clone the repository locally through the github UI online as mentioned in step #1, and should also install the necessary dependencies locally if needed (js, npm, etc.) after step executing step #2 to contribute to any of the files currently in the branch or main. The port we are using to run our sever is 3000.
