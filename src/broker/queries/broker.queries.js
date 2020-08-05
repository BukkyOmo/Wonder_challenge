const messages = {
    createMessage: 'INSERT INTO messages(message) VALUES($1) RETURNING *'
};

export default messages;
