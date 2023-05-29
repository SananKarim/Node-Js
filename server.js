const http = require("http");
const fs = require("fs");
const _ = require("lodash");

//createServer creates server which has a callback function.There are two object. first is "req"which has details of URL that is reqested, method type and more while second is "respose" which sends respose to the user in the broswer

const server = http.createServer((req, res) => {
  //loadash
  const num =_.random(0,20);
  console.log(num);

const greet=_.once(() =>{
  console.log("hello");
} )
  
  greet();
  greet();//it wont run because of lodesh once
  
  // console.log(req.url, req.method); //whenever a request is made this will invoke
  // console.log("request made");

  // set header content type.
  // res.setHeader("Contetn-Type", "text/html");
  // res.write("<p>hello,nijas</p>");
  // res.write("<p>ollo</p>");
  // res.end();

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200; //ok
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200; //ok
      break;
    case "/about-me": // redirecting a URL
      res.statusCode = 301; //resourse redirect
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404; //resourse doesn't exsist
      break;
  }

  // fs.readfile will read the html and fire it through
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});
//server.listen(), the HTTP server is started and begins accepting incoming requests on the specified port and hostname. It will trigger the callback function specified in http.createServer() for each incoming request, allowing you to handle the requests and send appropriate responses.

server.listen(3000, "localhost", () => {
  console.log("listening for request on port number 3000");
});

//make a request in browser localhost:3000
