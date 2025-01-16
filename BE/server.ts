import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db';
import patientRoutes from './src/routes/PateintRoutes';
import doctorRoutes from './src/routes/doctorRoutes';
import appointmentRoutes from './src/routes/appointmentRoutes';
import bodyParser from 'body-parser';
import adminRoutes from './src/routes/admin';
import authRoutes from './src/routes/auth';
import genericRoute from './src/routes/genericRoute'
import { getApk, uploadApk } from './src/controllers/genericController';
import { uploadMiddleware } from './src/middleware/uploadMiddleware';

dotenv.config();
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("api/uploads", genericRoute);
app.post('/api/upload', uploadMiddleware, uploadApk);
app.get("/api/uploads/apk/:apkType", getApk);
// Default Route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Hospital Management System</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .container {
                        text-align: center;
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to the Hospital Management System</h1>
                    <p>The backend server is running!</p>
                </div>
            </body>
        </html>
    `);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
