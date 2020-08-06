import MessageService from '../services/broker.services';

class MessageController {
  static async createMessage(req, res) {
    try {
      const result = await MessageService.createMessage(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async updateProcessedMessage(req, res) {
    try {
      const result = await MessageService.updateProcessedMessage(req.params);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async getMessage(req, res) {
    try {
      const result = await MessageService.getMessage(req.query);
      res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async deleteMessage(req, res) {
    try {
      const result = await MessageService.deleteMessage(req.params);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default MessageController;
