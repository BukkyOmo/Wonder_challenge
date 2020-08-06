const messages = {
  createMessage: 'INSERT INTO messages(message) VALUES($1) RETURNING *',
  updateMessageToProcessing: "UPDATE messages SET status = 'processing' WHERE id = $1",
  updateMessageToProcessed: "UPDATE messages SET status = 'processed' WHERE id = $1",
  getMessage: 'SELECT * FROM messages WHERE status = $1 ORDER BY id LIMIT $2',
  deleteMessage: 'DELETE FROM messages WHERE id = $1',
  lockTableQuery: 'LOCK TABLE messages IN SHARE MODE',
  processedUpdateMessage: "UPDATE messages SET status='unprocessed' WHERE id = $1 AND status = 'processing'",
};

export default messages;
