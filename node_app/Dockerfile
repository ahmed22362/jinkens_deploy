# Use official Node.js LTS (18) image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
