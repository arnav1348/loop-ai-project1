import express from "express";
import Batch from "../models/batch.js";

const router = express.Router();

router.get("/status/:ingestion_id", async (req, res) => {
	const { ingestion_id } = req.params;
	const batches = await Batch.find({ ingestion_id });

	if (!batches.length) {
		return res.status(404).json({ error: "Ingestion ID not found" });
	}

	const statuses = batches.map((b) => b.status);
	let status = "yet_to_start";

	if (statuses.every((s) => s === "completed")) {
		status = "completed";
	} else if (statuses.some((s) => s === "triggered" || s === "completed")) {
		status = "triggered";
	}

	res.json({
		ingestion_id,
		status,
		batches: batches.map(({ batch_id, ids, status }) => ({
			batch_id,
			ids,
			status,
		})),
	});
});

export default router;
