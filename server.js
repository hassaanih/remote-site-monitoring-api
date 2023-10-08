import cookieParser from "cookie-parser";
import  express  from "express";

import authRoutes from "./routes/auth.js";
import valueRoutes from "./routes/values.js"
import userRoutes from "./routes/user.js"
import cors from 'cors';


const corsOptions = {
  origin: '*'
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/values", valueRoutes);
app.use("/api/user", userRoutes);

const BEPORT = process.env.BEPORT || 8800;
app.listen(BEPORT, () => {
    console.log("Server is running on PORT: " + BEPORT);
  });