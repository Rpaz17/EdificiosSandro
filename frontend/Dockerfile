# ---------------------------
# FRONTEND DEVELOPMENT DOCKERFILE
# ---------------------------

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./

RUN npm install

# Copy the rest of the project
COPY . .

# Expose Vite dev server port
EXPOSE 5173


# Enable hot reload in Docker
ENV HOST=0.0.0.0
ENV PORT=5173

# Start development server
CMD ["npm", "run", "dev"]
