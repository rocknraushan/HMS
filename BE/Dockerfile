# Use the Node.js LTS version as the base image
FROM node:22.8.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . ./

# Ensure firebase-services.json is included in the copy
COPY firebase_services.json ./  
# Add this line if not already covered by the previous COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
