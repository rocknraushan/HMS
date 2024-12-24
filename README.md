# Hospital Management System

A comprehensive Hospital Management System built using **React Native** for the mobile front-end and **Node.js** for the back-end. This system streamlines hospital operations, providing modules for patient management, doctor scheduling, appointment booking, and more.

---

## Features

### Patient Management
- Add, update, and view patient details.
- Maintain medical history records.

### Appointment Scheduling
- Book and manage appointments.
- Notify patients and doctors about scheduled appointments.

### Doctor Management
- Manage doctor profiles and availability.
- Assign doctors to specific departments or patients.

### Admin Dashboard
- View and manage hospital data.
- Generate reports on patients, doctors, and appointments.

### Notifications
- Push notifications for appointments and reminders.
- Email alerts for critical updates.

---

## Tech Stack

### Front-end (Mobile Application)
- **React Native**
  - Navigation: React Navigation
  - State Management: Redux
  - UI Library: React Native Paper / Native Base

### Back-end (API and Database)
- **Node.js** with Express.js
- **Database:**
  - MongoDB for data storage
  - Mongoose for schema management

### Others
- **Authentication:** JSON Web Tokens (JWT)
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **Version Control:** Git/GitLab

---

## Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** (local or cloud instance)
- **React Native CLI**
- **Android Studio** / **Xcode** for running mobile applications

---

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hospital-management-system.git
   cd hospital-management-system/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the mobile directory:
   ```bash
   cd ../mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `config.js` with your backend API URL:
   ```javascript
   export const API_URL = 'http://<your-backend-url>:5000';
   ```

4. Run the app:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```

---

## Project Structure

```plaintext
hospital-management-system/
|-- backend/
|   |-- models/
|   |-- routes/
|   |-- controllers/
|   |-- app.js
|   |-- package.json
|
|-- frontend/Mediverse
|   |-- src/
|   |-- components/
|   |-- screens/
|   |-- App.js
|   |-- package.json
```

---

## APIs

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user and generate token

### Patients
- **GET** `/api/patients` - Get all patients
- **POST** `/api/patients` - Add a new patient

### Appointments
- **GET** `/api/appointments` - Get all appointments
- **POST** `/api/appointments` - Create a new appointment

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries or feedback, please contact:
- **Email:** raushan.rkp1@gmail.com
- **LinkedIn:** [raushan-pandey-583182240]([https://www.linkedin.com/in/your-profile](https://www.linkedin.com/in/raushan-pandey-583182240))

---

## Acknowledgments

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
