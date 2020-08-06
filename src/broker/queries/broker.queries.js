const messages = {
  createMessage: 'INSERT INTO messages(message) VALUES($1) RETURNING *',
  updateMessage: 'UPDATE messages SET status=$1 WHERE id=$2',
  getMessage: 'SELECT * FROM messages WHERE status=$1 LIMIT 1',
  deleteMessage: 'DELETE FROM messages WHERE id=$1'
};

export default messages;
