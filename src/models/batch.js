import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
	ingestion_id: String,
	batch_id: String,
	ids: [Number],
	status: {
		type: String,
		enum: ["yet_to_start", "triggered", "completed"],
		default: "yet_to_start",
	},
	created_at: { type: Date, default: Date.now },
});

const Batch = mongoose.model("Batch", batchSchema);
export default Batch;
