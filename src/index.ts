import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = 3000;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster01.8ffgk.mongodb.net/Trullo?retryWrites=true&w=majority
`)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/users', router)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})