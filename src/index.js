import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ingestRouter from "./routes/ingest.js";
import statusRouter from "./routes/status.js";
import startQueueProcessor from "./queue/processor.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", ingestRouter);
app.use("/", statusRouter);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected");
		app.listen(process.env.PORT || 5000, () => {
			console.log("Server started");
		});
		startQueueProcessor();
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});
