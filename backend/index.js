const bodyParser = require('body-parser');
const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const cors=require('cors');
const userRoutes=require("./routes/userRoutes");
const imageRoutes=require("./routes/imageRoutes");
const rateLimiter=require("./middleware/ratelimiter");
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));
const url="mongodb+srv://user:ankitraj@cluster0.ky8l28e.mongodb.net/"

// const router=express.Router();
// router.use(rateLimiter);
app.use(rateLimiter);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.use('/api/users', userRoutes);
app.use('/api/images',imageRoutes);

const PORT=2000;
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));