# Use nginx to serve the static content
FROM nginx:alpine

# Copy the static files
COPY . /usr/share/nginx/html

# Cloud Run expects the container to listen on the port defined by the PORT environment variable (default 8080)
# We update the default nginx config to use port 8080
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
