import mongoose from "mongoose";

const ingestionSchema = new mongoose.Schema({
	ingestion_id: { type: String, required: true },
	priority: { type: String, enum: ["HIGH", "MEDIUM", "LOW"], required: true },
	created_at: { type: Date, default: Date.now },
});

const Ingestion = mongoose.model("Ingestion", ingestionSchema);
export default Ingestion;
