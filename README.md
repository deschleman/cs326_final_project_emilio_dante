# cs326_final_project_emilio_dante

Table AND group details:
Dante Eschleman: deschleman
Emilio Velazquez: EmilioVelazquezCarter

Communication:
*contact eachother through messages (phone), email (UMass)
*contact eachtoher throughout the week with pain-points, progress-updates, etc.
*PR entails revision from each teammate before pushing changes
*Disagreemnts will be resolved cordially

Project description & directions for outside contributors:
The project hopes to host organizations on our website in creating volunteering opportunities for initiatives that are held for the respective company. The domain is intended to provide a platform for initiatives that help the community in which the initiative is based in. At the moment we have our home, about, and project purpose routes set. A new contributor may first clone the repository locally, then install the necessary dependencies (js, npm, etc.) to contribute to any of the files currently in the branch or main. The port we are using to run our sever is 3000. To run it locally, create a `.env` file with `MONGODB_URI` and `SESSION_SECRET`, run `npm install`, and then run `npm start`. Visit `http://localhost:3000/listings` in a browser. So, to view the changes that the contributor has made: run in your terminal server.js, after this has ran open a new terminal and use curl -{the URL with the specific route you want to visit}.

## Volunteer Listing Feature

This feature we made simply allows organizations to make volunteer opportunities.
Users of it can submit an organization name, title or name of oppurtinuty, city, and description.
The information is checked, validated, saved to MongoDB, and displayed back on the listings page.

## How to Use

Visit:

/listings

Fill out the volunteer opportunity form and submit it.
The new listing will appear below the form.

## FOUR SPRINT CHANGES FOR SPRINT 3 BELOW:

#1 JEST/test suite: worked on by dante - run the ListingService.test.js test file to run (run in your terminal by using this command: "npm test"). All tests pass at the time of commit.
#2 Mongoose repo: worked on by dante - changed file-based repo to using mongoose enacted in the previous hw04 homework and mentioned in the notes (same structure has been followed). Hop over to listingRepository.js to see final product of mongo db/mongoose set up for our application.
#3 Tailwind restyling: worked on by emilio - i added Tailwind styling to the volunteer listings page, included things like responsive form, butons, page layout, and lisitng cards. Tailwind CSS is built by 'src/input.css' into 'public/style.css when npm run build:css is used
#4 HTMX interaction: worked on by emilio - io added HTMx to our liting form, so that a new volunteer opening is saved and then also inserted into the listings page without needing do to a reload o the entire page



## Sprint 4 dante and emilio: security, authorization, and and accessabilty


### Auth and the roles


Users sign up for the volunter listing page and log in with an email and password. Passwords are successfully hashed with bcrypt before ever being stored. A successful login creates a signed, HTTP only session cookie.


The application has two roles:


- `member`: can create listings and delete only listings they own, but not all
-  `admin`: can delete any listing

Public sign up creates `member` accounts. Administrator  roles are assigned specifcally through database administration, not through any public signup

### authorization


Protected listing routes use `requireLogin`, which returns `401 Unauthorized` when a user is not logged in.

Authorization is checked in the listing service part. A member attempting to delete a different  user’s listing receives `403 Forbidden` errorr. The listing owner and an administrator are allowed to delete the listing.


We tested all three cases to ensure it all ran smoothly:


- A member deleting another member’s listing successfully returns `403 Forbidden`
-  A listing owner can delete their own listing
- An administrator can delete another members listing



### Accessibility audit

The listing form has visible labels connected to every ervery input, form controls and buttons all have visible keyboard focus styles and accessible contrast so that they fucntion properly and dont cause any issues.


After a successful HTMX submission the form resets and focus returns to the organization field, this properly allows keyboard users to continue creating listings without manually navigating back to the form with no isseues

### Health check

The public health route is:


```text
GET /health
 and it returned : { "status": "ok" }



## system diagram:


browser
  |
  |
express server
  |
  + -- > authentication and sessions
  |       |
  |       v
  |     MongoDB users
  |
  + -- > listing routes
          |
          v
    listing service and authorization
          |
          v
     MongoDB listings
