import express from 'express';
import routes from './src/broker/routes/broker.routes';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", routes);

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
