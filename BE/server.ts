import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db';
import patientRoutes from './src/routes/PateintRoutes';
import doctorRoutes from './src/routes/doctorRoutes';
import appointmentRoutes from './src/routes/appointmentRoutes';

dotenv.config();
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Hospital Management Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
