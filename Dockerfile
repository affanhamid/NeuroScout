# Use the official Node.js 23 image
FROM node:23

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app in development mode
CMD ["npm", "run", "dev"]
