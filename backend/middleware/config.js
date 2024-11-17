const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
let token;

const middlewareConf = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(
    session({
      secret: token,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
};

export default middlewareConf;
