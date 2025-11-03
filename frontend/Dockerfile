# Multi-stage Dockerfile for Angular Frontend
# 
# This Dockerfile uses a multi-stage build pattern:
# Stage 1: Build the Angular application
# Stage 2: Serve the built application with nginx

# ============================================
# Stage 1: Build
# ============================================
# Use Node.js image to build the Angular application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
# These are copied first to leverage Docker's layer caching
# If package.json doesn't change, Docker will reuse the cached layer
COPY package*.json ./

# Install dependencies
# npm ci is faster and more reliable than npm install for production builds
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the Angular application for production
# --configuration=production enables optimizations
# Output goes to dist/frontend/browser
RUN npm run build -- --configuration=production

# ============================================
# Stage 2: Serve with nginx
# ============================================
# Use nginx to serve the static files
FROM nginx:alpine

# Copy the built application from the build stage
# Angular's production build creates static files in dist/frontend/browser
# Note: With outputMode: "static", files are in dist/frontend/browser
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx configuration
# This replaces the default nginx configuration for SPA routing
# We need to remove the default config first, then copy ours
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (nginx default HTTP port)
EXPOSE 80

# nginx runs in the foreground by default, so no CMD needed
# But we can specify it explicitly for clarity
CMD ["nginx", "-g", "daemon off;"]

