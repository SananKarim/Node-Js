const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");
const testRoutes = require("./routes/testRoute");
const app = express();

const dbURI = "mongodb+srv://sanan:1234@cluster0.a3ydmjf.mongodb.net/cluster0";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine.
app.set("view engine", "ejs"); //This means that when rendering views, Express will use EJS as the template engine to process and generate HTML output.

//EJS stands for Embedded JavaScript, and it is a popular templating language used with Node.js and Express.js frameworks for building web applications. EJS allows you to generate dynamic HTML content by embedding JavaScript code within your HTML templates.

//By default it takes views. if u want to change then use the below one
// app.set("views", "myfolder");

//listen for requests

//app.listen(3000); //no need to tell for localhost. It knows it. Also it return instance of a server.
//You wont be needing createServer anymore.

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //takes all the url encoded data and pass to an object that we use in request object. req.body brings all the inputs values into the object.
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);

app.use("/test", testRoutes);

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "First Blog",
//     snippet: "about my first blog",
//     body: "bla bla bla",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     }); //when new instant  of sehcma is created the we have to save it in the dB which what this does. It save and send the object Document which is in the promise form. To resolve it we use then and send the results into the browser so that we can see that
// });

app.get("/", (req, res) => {
  // res.send("<p>Home Page</p>"); //respose code no need
  // res.sendFile("./views/index.html", { root: __dirname });
  res.redirect("blogs"); //ejs
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

//404 page. Remember this should be last. Express never know it is 404 page. due to which we have to tell its status code manaully.
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname }); // status code tells 404 page
  res.status(404).render("404", { title: "Error" }); // status code tells 404 page
});
