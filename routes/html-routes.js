// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    // How you know res is a object is the .  i.e render is the key because of the . to res...
    // when you have () directly after it's calling a function and executing that function. 
    res.render("index", {});
  });

  app.get("/drinks", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    res.render("/drinks");
  });

  //  New routes.

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/drinks");
    }
    // Empty object use {}
    res.render("signup", {});

    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/drinks");
    }
    res.render("login", {});
  });


  app.get("/favorites", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/favorites");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });



  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

};