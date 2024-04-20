# Use the official Apache image as base image
FROM httpd:latest

# Install git and node.js
RUN apt-get update && apt-get install -y git nodejs npm

WORKDIR /app

# Clone the GitHub repository
RUN git clone -b user-profile https://github.com/chauhanmahavir/Virtual-Psychiatrist.git

# Change Working Directory
WORKDIR /app/Virtual-Psychiatrist/Frontend

# Set Legecy-peer-deps True
RUN npm config set legacy-peer-deps true

# Install Modules
RUN npm install

# Build React Project
RUN npm run build

# Copy Build File From build to apache Server
RUN cp -r build/* /usr/local/apache2/htdocs/

# Open 80 Port
EXPOSE 3000

# Run Apache Server
# CMD ["httpd", "-D", "FOREGROUND"]

CMD ["npm", "start"]