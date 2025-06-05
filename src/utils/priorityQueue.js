const queue = [];

function enqueue(batch) {
	queue.push(batch);
	queue.sort((a, b) => {
		const priorityMap = { HIGH: 0, MEDIUM: 1, LOW: 2 };
		return (
			priorityMap[a.priority] - priorityMap[b.priority] ||
			new Date(a.created_at) - new Date(b.created_at)
		);
	});
}

function dequeue() {
	return queue.shift();
}

function peek() {
	return queue[0];
}

function isEmpty() {
	return queue.length === 0;
}

export { enqueue, dequeue, peek, isEmpty };
