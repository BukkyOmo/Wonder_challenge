import express from 'express';
import bodyParser from 'body-parser';
import MessagesRoutes from './src/broker/routes/broker.routes';
import DevRoutes from './src/dev_tool/routes/dev.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/messages', MessagesRoutes);
app.use('/api/v1/dev', DevRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Wonder!!!',
    status: 'Success',
    statusCode: 200,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
