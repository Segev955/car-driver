# CarDriver

CarDriver is part of a comprehensive solution aimed at detecting vehicle theft by analyzing driver behavior. This project involves a web application and backend that work alongside an Android app to interact with real-time data, helping to identify drivers and detect potential car theft.

## Features

- Web-based interface for managing OBD-II data.
- Real-time notifications for theft detection.
- Firebase integration for data handling and storage.
- Backend support for running machine learning algorithms to detect driver patterns.
- Vercel deployment for the backend.

## Technologies Used

- **Node.js**: Backend server implementation.
- **Firebase**: Database for real-time data storage.
- **Vercel**: Deployment platform for the backend.
- **JavaScript, CSS, HTML**: Frontend of the web interface.

## How to Use

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Segev955/car-driver.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Configure Firebase to handle real-time database needs for storing and retrieving OBD-II data.

4. **Run the development server**:
    ```bash
    npm start
    ```
    - The app will run on `http://localhost:3000`. Open this URL in your browser to use the web interface.

5. **Backend Setup**:
    - The backend code for notifications and data management is located in the `notification-backend` folder.
    - To run the backend on Vercel, follow Vercel's deployment steps.

## Project Structure

- `src/`: Contains the main frontend code.
- `notification-backend/`: Contains the backend for handling notifications and Firebase interaction.
- `public/`: Public resources for the web app.

## Contributors

- **Segev Tzabar**
- **Yasmin Cohen**
