# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve the build using nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
