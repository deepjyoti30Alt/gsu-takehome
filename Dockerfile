FROM node:18 AS base

# Set the working directory
WORKDIR /usr/src/app

# Install Bun
RUN npm install -g bun

# Multi-stage build for API
FROM base AS api-build

# Set the working directory for the API
WORKDIR /usr/src/app/api

# Copy API package files
COPY api/package*.json ./

# Install API dependencies
RUN bun install

# Copy the rest of the API code
COPY api ./

# Multi-stage build for tasks-app
FROM base AS tasks-app-build

# Set the working directory for the tasks-app
WORKDIR /usr/src/app/tasks-app

# Copy tasks-app package files
COPY tasks-app/package*.json ./

# Install tasks-app dependencies
RUN bun install

# Copy the rest of the tasks-app code
COPY tasks-app ./

# Set the API URL
ENV NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Build the tasks-app
RUN bun run build

# Final stage to run both applications
FROM base

# Set the working directory
WORKDIR /usr/src/app

# Copy API and tasks-app from the previous stages
COPY --from=api-build /usr/src/app/api ./api
COPY --from=tasks-app-build /usr/src/app/tasks-app ./tasks-app

# Copy the entrypoint script
COPY entrypoint.sh .

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose the port for the tasks-app
EXPOSE 3000

# Run the entrypoint script
CMD ["./entrypoint.sh"]

