import db from '../../../config/connection';
import messages from '../queries/broker.queries';
import ResponseFormat from '../../utils/response.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

class MessageService{
    static async createMessage(body) {
        const { message } = body;
        const query = {
          text: messages.createMessage,
          values: [message],
        };
        try {
            const { rows } = await db.query(query);
            if (rows) {
                return successResponseFormat(`Message with id ${rows[0].id} successfully added to queue.`, 201, 'Success', rows[0].id);
            }
            return failureResponseFormat('Message failed to save to queue.', 400, 'Failure'); 
        } catch (error) {
            return failureResponseFormat('Internal server error.', 500, 'Failure', error); 
        }
      }

      static async updateMessage(params) {
        const { message_id } = params;
        const status = 'processing';
        const query = {
            text: messages.updateMessage,
            values: [status, message_id]
        };
        try {
            const { rows } = await db.query(query);
            if(rows){
                return successResponseFormat(`Message processing.`, 200, 'Success', rows[0]);
            }
            return failureResponseFormat('Message failed to process.', 400, 'Failure');   
        } catch (error) {
            return failureResponseFormat('Internal server error.', 500, 'Failure', error); 
        }
      }

      static async deleteMessage(params){
        const { message_id } = params;
        const query = {
            text: messages.deleteMessage,
            values: [message_id]
        };
        try {
            const { rows } = await db.query(query);
            if(rows){
                return successResponseFormat(`Message successfully deleted.`, 200, 'Success');
            }
            return failureResponseFormat(`Message failed to be deleted.`, 400, 'Failure'); 
        } catch (error) {
            return failureResponseFormat('Internal server error.', 500, 'Failure', error); 
        }
    }
}

export default MessageService;
