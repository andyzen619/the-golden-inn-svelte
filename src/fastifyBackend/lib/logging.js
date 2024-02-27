export function auditLog({ message, ...args }) {
	const auditLogMessage = `AUDIT LOG - ${message}`;

	console.log({ message, ...args });

	return { success: true };
}
