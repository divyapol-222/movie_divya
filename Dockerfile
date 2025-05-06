FROM node:18-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

EXPOSE 3001
CMD ["npm", "start"]