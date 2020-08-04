import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

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
