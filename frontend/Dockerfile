# Build stage
FROM node:18 AS build

WORKDIR /app

# Install deps first (better caching + fewer failures)
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Build app
RUN npm run build

# Serve stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]