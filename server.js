import express from "express";
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

// first route.... the landing/home page
app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Home Page</title>
  </head>
  <body>
    <h1>Home</h1>

    <p>
      Stay tuned for more information! This page will be updated regularly with
      news surrounding volunteering opportunities...
    </p>
  </body>
</html>
`);
});

// second route.... the 'about page'  - some more information about us
app.get("/about", (req, res) => {
  res.send(`
  <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>About Us</title>
      </head>
      <body>
        <h1>About</h1>

        <p>
          My name is Dante Eschleman, and am a rising senior at UMass Amherst
          studying data and computer science. I am thrilled to cap off my summer
          session experience in CS 326 with a capstone project, centered around
          computing for the common good! Emilio and I hope to provide value and
          opportunities, for people to give a helping hand to important initiatives.
          We hope to make a lasting, positive benefit, on the communities we hope to
          platform on this page!
        </p>

        <p>
          I am a rising senior at UMass Amherst, studying Informatics with a
          computer science minor. I am currently doing internship at liberty mutual
          on the data science team. I have experience in python and Java, data
          structures a little bit of algorithms. And I am very excited to get a
          better understanding of web systems.
        </p>
      </body>
    </html>
`);
});

app.get("/project_purpose", (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Project Purpose</title>
  </head>
  <body>
    <h1>Purpose</h1>

    <p>
      Our primary action is to host organizations in creating volunteering
      opportunities. Organizations will post updates surrounding initiatives
      they hope to host, and volunteers may sign up for spots and days of
      volunteering, all in one centralized place. We hope to connect individuals
      hoping to help around their community. We also hope to provide general
      analytics surrounding our platform, in wanting to improve our
      capabilities.
    </p>
  </body>
</html>
`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
