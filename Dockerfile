# Use Node 18 for building the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Start production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder stage
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Start the app using Next.js production mode
CMD ["npm", "run", "start"]
