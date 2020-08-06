import db from '../../../config/connection';
import messages from '../queries/broker.queries';
import ResponseFormat from '../../utils/response.utils';

const { successResponseFormat, failureResponseFormat } = ResponseFormat;

class MessageService {
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
    const status = 'processed';
    const query = {
      text: messages.updateMessage,
      values: [status, message_id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows) {
        return successResponseFormat('Message processing.', 200, 'Success', rows[0]);
      }
      return failureResponseFormat('Message failed to process.', 400, 'Failure');
    } catch (error) {
      return failureResponseFormat('Internal server error.', 500, 'Failure', error);
    }
  }

  static async deleteMessage(params) {
    const { message_id } = params;
    const query = {
      text: messages.deleteMessage,
      values: [message_id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows) {
        return successResponseFormat('Message successfully deleted.', 200, 'Success');
      }
      return failureResponseFormat('Message failed to be deleted.', 400, 'Failure');
    } catch (error) {
      return failureResponseFormat('Internal server error.', 500, 'Failure', error);
    }
  }

  static async getMessage(userQuery) {
    const visibilityTimeout = userQuery.visibilityTimeout || 30;
    const query = {
      text: messages.getMessage,
      values: ['unprocessed'],
    };
    const lockQuery = {
      text: messages.lockTableQuery,
    };
  try {
    const startPolling = (messageId) => {
      setTimeout(async () => {
        await db.query(messages.processedUpdateMessage, [messageId]);
      }, visibilityTimeout * 1000);
    };

    try {
        await db.query('BEGIN');
        await db.query(lockQuery);
        const { rows } = await db.query(query);
        const updateQuery = {
          text: messages.updateMessage,
          values: [rows[0].id],
        };
        await db.query(updateQuery);
        await db.query('COMMIT');
        startPolling(rows[0].id);
        return successResponseFormat('Message fetched successfully', 200, 'Success', rows[0]);
      } catch (error) {
          return failureResponseFormat('Database error occured', 400, 'Failure', error);
      }
    } catch (error) {
      return failureResponseFormat('Internal server error', 500, 'Failure', error);
    }
  }
}

export default MessageService;
