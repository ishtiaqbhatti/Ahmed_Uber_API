const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const passengerRequest = require("./utils/passengerRequest");

// Load env vars
dotenv.config({ path: "config/config.env" });

// Connect to database
connectDB();
const app = express();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Socket io
io.on("connection", (socket) => {
  socket.on("passengerRequest", ({ from, to, passengerId, paymentMethod }) => {
    const passengerBroadcastObj = passengerRequest(
      from,
      to,
      passengerId,
      paymentMethod
    );

    // Broadcasting to all captains
    io.emit("trip", passengerBroadcastObj);
  });
});

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Starter API",
      description: "API built in Nodejs",
      servers: [`http://localhost:${process.env.PORT}`],
    },
  },
  apis: ["routes/auth.js"],
  components: {
    bearerAuth: {
      type: "http",
      schema: "bearer",
      bearerFormat: "JWT",
    },
  },
  security: {
    bearerAuth: [],
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const auth = require("./routes/auth");
const captain = require("./routes/captain");
const admin = require("./routes/admin");
const trip = require("./routes/trip");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", auth);
app.use("/api/captain", captain);
app.use("/api/admin", admin);
app.use("/api/trip", trip);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
