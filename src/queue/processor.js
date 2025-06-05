import { dequeue, isEmpty } from "../utils/priorityQueue.js";
import Batch from "../models/batch.js";

function simulateFetch(id) {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ id, data: "processed" }), 1000);
	});
}

async function processBatch(batch) {
	console.log(`Triggering batch: ${batch.batch_id}`);
	await Batch.findOneAndUpdate(
		{ batch_id: batch.batch_id },
		{ status: "triggered" }
	);

	await Promise.all(batch.ids.map((id) => simulateFetch(id)));

	await Batch.findOneAndUpdate(
		{ batch_id: batch.batch_id },
		{ status: "completed" }
	);
	console.log(`Completed batch: ${batch.batch_id}`);
}

function startQueueProcessor() {
	setInterval(async () => {
		if (!isEmpty()) {
			const batch = dequeue();
			await processBatch(batch);
		}
	}, 5000);
}

export default startQueueProcessor;
