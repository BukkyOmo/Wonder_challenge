import db from '../../../config/connection';
import devQueries from '../queries/dev.queries';
import ResponseFormat from '../../utils/response.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

class DevService{
    static async getAllMessages(userQuery){
        const { limit } = userQuery;
        const query = {
            text: devQueries.getMessages,
            values: [limit]
        };
        try {
            const { rows } = await db.query(query);
            return successResponseFormat(`Messages in queue successfully fetched`, 200, 'Success', rows);  
        } catch (error) {
            return failureResponseFormat('Internal server error', 500, 'Failure', error);
        }
    }

    static async getMessagesByStatus(userQuery){
        const { status } = userQuery;
        const query = {
            text: devQueries.getMessagesByStatus,
            values: [status]
        };
        try {
            const { rows } = await db.query(query);
            return successResponseFormat(`Messages with status ${status} successfully fetched`, 200, 'Success', rows); 
        } catch (error) {
            return failureResponseFormat('Internal server error', 500, 'Failure', error); 
        }
    }

    static async getCountOfMessages(userQuery){
        const { status } = userQuery;
        const query = {
            text: devQueries.getCount,
            values: [status]
        };
        try {
            const { rowCount } = await db.query(query);
            return successResponseFormat(`Count of ${status} messages successfully fetched`, 200, 'Success', rowCount); 
        } catch (error) {
            return failureResponseFormat('Internal server error', 500, 'Failure', error); 
        }
    }
}

export default DevService;
