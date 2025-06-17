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

# Set environment variables
ENV NODE_ENV=production

EXPOSE 5100

CMD ["node", "dist/src/main"]