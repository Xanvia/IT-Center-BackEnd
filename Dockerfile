# Base image
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads/contents uploads/courses uploads/reservations uploads/users

# Ensure the uploads directory is writable
RUN chmod -R 777 uploads

# Additional directory creation for production stability
RUN mkdir -p /app/uploads/contents /app/uploads/courses /app/uploads/reservations /app/uploads/users
RUN chmod -R 777 /app/uploads

# Set environment variables
ENV NODE_ENV=production

EXPOSE 5100

CMD ["node", "dist/src/main"]