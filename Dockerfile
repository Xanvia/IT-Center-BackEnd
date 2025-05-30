# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app listens on
EXPOSE 3001

# Set the environment variable (optional)
ENV PORT=3001

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
