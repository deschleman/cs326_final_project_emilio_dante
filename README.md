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
The project hopes to host organizations on our website in creating volunteering opportunities for initiatives that are held for the respective company. The domain is intended to provide a platform for initiatives that help the community in which the initiative is based in. At the moment we have our home, about, and project purpose routes set. A new contributor may first clone the repository locally, then install the necessary dependencies (js, npm, etc.) to contribute to any of the files currently in the branch or main. The port we are using to run our sever is 3000. So, to view the changes that the contributor has made: run in your terminal server.js, after this has ran open a new terminal and use curl -{the URL with the specific route you want to visit}.

## Volunteer Listing Feature

This feature we made simply allows organizations to make volunteer opportunities.
Users of it can submit an organization name, title or name of oppurtinuty, city, and description.
The information is checked/validated, saved to listings.json, and displayed back on the listings page.

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


## system diagram:

browser
  |
express server
  |
Listing routes
  |
listing controller
  |
llisting service
  |
mongoose listing repository
  |\
MongoDB
