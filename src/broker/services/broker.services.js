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

  static async updateProcessedMessage(params) {
    const { message_id } = params;
    const query = {
      text: messages.updateMessageToProcessed,
      values: [message_id],
    };
    try {
      const { rows } = await db.query(query);
      if (rows) {
        return successResponseFormat('Message processed successfully.', 200, 'Success', rows[0]);
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
    const messageSize = userQuery.size || 1;
    const visibilityTimeout = userQuery.visibilityTimeout || 30;
    const query = {
      text: messages.getMessage,
      values: ['unprocessed', messageSize],
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

        // update status of all the messages polled to processing
        for (const row of rows) {
          await db.query({
            text: messages.updateMessageToProcessing,
            values: [row.id],
          });
        }

        await db.query('COMMIT');
        // loop through the array of messages polled and pick the id of each while also calling the startPoll function on each item
        const result = rows.map((elem) => {
          startPolling(elem.id);
          return elem.id;
        });
        return successResponseFormat('Message fetched successfully.', 200, 'Success', result);
      } catch (error) {
        return failureResponseFormat('Database error occured', 400, 'Failure', error);
      }
    } catch (error) {
      return failureResponseFormat('Internal server error', 500, 'Failure', error);
    }
  }
}

export default MessageService;
