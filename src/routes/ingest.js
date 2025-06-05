import express from "express";
import { v4 as uuidv4 } from "uuid";
import Ingestion from "../models/ingestion.js";
import Batch from "../models/batch.js";
import { enqueue } from "../utils/priorityQueue.js";

const router = express.Router();

router.post("/ingest", async (req, res) => {
	const { ids, priority } = req.body;

	if (!ids?.length || !["HIGH", "MEDIUM", "LOW"].includes(priority)) {
		return res.status(400).json({ error: "Invalid input" });
	}

	const ingestion_id = uuidv4();
	const ingestion = new Ingestion({ ingestion_id, priority });
	await ingestion.save();

	for (let i = 0; i < ids.length; i += 3) {
		const batch_ids = ids.slice(i, i + 3);
		const batch_id = uuidv4();
		const batch = new Batch({ ingestion_id, batch_id, ids: batch_ids });
		await batch.save();
		enqueue({
			...batch.toObject(),
			priority,
			created_at: ingestion.created_at,
		});
	}

	res.json({ ingestion_id });
});

export default router;
