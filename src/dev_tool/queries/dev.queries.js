const devQueries = {
    getCount: 'SELECT COUNT(*) FROM messages WHERE status=$1',
    getMessagesByStatus: 'SELECT * FROM messages WHERE status=$1',
    getMessages: 'SELECT * FROM messages LIMIT $1'
}

export default devQueries;
