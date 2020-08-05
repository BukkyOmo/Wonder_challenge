import db from '../../../config/connection';
import messages from '../queries/broker.queries'

class MessageController {
    static async createMessage(req, res){
        const { message } = req.body;
        const query = {
            text: messages.createMessage,
            values: [message]
        };
        const { rows } = await db.query(query);
        if(rows){
            return res.status(200).json({
                message: `Message with id ${rows[0].id} successfully added to queue.`,
                status: 'Success',
                statusCode: 200,
                data: rows[0]
            });
        }
        return res.status(400).json({
            message: `Message failed to save to queue.`,
            status: 'Failure',
            statusCode: 400
        });
    }
};

export default MessageController;
