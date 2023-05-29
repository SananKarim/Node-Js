const express = require("express");

const app = express();

//register view engine.
app.set("view engine", "ejs"); //This means that when rendering views, Express will use EJS as the template engine to process and generate HTML output.

//EJS stands for Embedded JavaScript, and it is a popular templating language used with Node.js and Express.js frameworks for building web applications. EJS allows you to generate dynamic HTML content by embedding JavaScript code within your HTML templates.

//By default it takes views. if u want to change then use the below one
// app.set("views", "myfolder");

//listen for requests

app.listen(3000); //no need to tell for localhost. It knows it. Also it return instance of a server.
//You wont be needing createServer anymore.

app.get("/", (req, res) => {
  // res.send("<p>Home Page</p>"); //respose code no need
  // res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs }); //ejs
});

// about page
app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//redirect to about page
// app.get("/about-me", (req, res) => {
//   res.redirect("/about");
// });

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

//404 page. Remember this should be last. Express never know it is 404 page. due to which we have to tell its status code manaully.
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname }); // status code tells 404 page
  res.status(404).render("404", { title: "Error" }); // status code tells 404 page
});
