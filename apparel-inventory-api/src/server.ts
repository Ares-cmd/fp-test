import express from 'express';
import apparelRoutes from './routes/apparel';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apparelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

