const express = require("express")
const authRouter = express.Router()
const passport = require("passport")
const {generateToken}= require('../jwt/jwt')

//Sign UP
authRouter.get("/signup", (req, res) => {
  res.render("signup");
});
authRouter.post("/signup",passport.authenticate('signup', { failureRedirect: '/auth/signupfailed' }),
  (req, res) => {
    res.redirect("/auth/login")
    }
);
authRouter.get("/signupfailed", (req, res) => {
  res.render("signupfailed");
});

//Login
authRouter.get("/", (req, res) => {
  res.redirect("/auth/login");
});
authRouter.get("/login", (req, res) => {
  res.render("login");
});
authRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/auth/loginfailed" }),
  (req, res) => {
    const user=req.user;
    const token= generateToken(user)
    res.cookie('auth',token);
    res.redirect('/store/home')
  }
);

authRouter.get("/loginfailed", (req, res) => {
  res.render("loginfailed");
});

//Logout
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.clearCookie("auth");
  res.render("login");
});

module.exports = authRouter;
