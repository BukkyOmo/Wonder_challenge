import DevService from '../services/dev.services';

class DevController {
  static async getAllMessages(req, res) {
    try {
      const result = await DevService.getAllMessages(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async getMessagesByStatus(req, res) {
    try {
      const result = await DevService.getMessagesByStatus(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async getCountOfMessages(req, res) {
    try {
      const result = await DevService.getCountOfMessages(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default DevController;
