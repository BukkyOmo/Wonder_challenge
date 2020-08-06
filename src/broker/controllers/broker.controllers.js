import db from '../../../config/connection';
import messages from '../queries/broker.queries';
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

  static async updateMessage(req, res) {
      try {
        const result = await MessageService.updateMessage(req.params);
        return res.status(200).json(result);  
      } catch (error) {
         return res.status(400).json(error); 
      }
  }

  static async getMessage(req, res){
      const visibility_timeout = req.query.visibility_timeout || 30;
      const getTime = new Date;
      const query = {
          text: messages.getMessage,
          values: ['unprocessed']
      };
      
      const startPolling = setInterval(async() => {
        const { rows } = await db.query(query);
        // console.log(rows)
        const visibility_countdown = getTime.setSeconds( getTime.getSeconds() + 10 );
        if(rows || visibility_countdown){

        }
        console.log(visibility_countdown);
      }, 3000);

  }

  static async deleteMessage(req, res){
      try {
        const result = await MessageService.deleteMessage(req.params);
        return res.status(200).json(result); 
      } catch (error) {
        return res.status(400).json(error); 
      }
  }
}

export default MessageController;
