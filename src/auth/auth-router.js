const express = require("express");
const AuthService = require("./auth-service");

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
.post("/login", jsonBodyParser, (req, res, next) => {
  const { user_name, user_password } = req.body;
  const loginUser = { user_name, user_password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  AuthService.getUserWithUserName(req.app.get("db"), loginUser.user_name)
    .then((dbUser) => {
      console.log(dbUser);
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect user_name or user_password",
        });
      /*else if (loginUser.user_password === dbUser.user_password){
          console.log("its a match")
          return res.status(200).json({
            error: 'none',
          })
        }*/ else {
          console.log(loginUser.user_password,
          dbUser.user_password)
        const compareMatch = AuthService.comparePasswords(
          loginUser.user_password,
          dbUser.user_password
        );
        console.log("login user" + loginUser.user_password);
        console.log("db user" + dbUser.user_password);
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect user_name or password",
          }).then;
        const sub = dbUser.user_name;
        const payload = { user_id: dbUser.id };
        res.send({
          authToken: AuthService.createJwt(sub, payload),
          userId: dbUser.id,
          user_name: dbUser.user_name,
          user_bio:dbUser.user_bio
        });
      }
    })
    .catch(next);
});

module.exports = authRouter;
