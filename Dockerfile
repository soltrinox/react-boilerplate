# Docker - Configuration
# Base Image
# Better than alpine due to C library dependency
# It may causes problems with Node
# See https://www.rockyourcode.com/dockerize-a-react-app/
FROM node:12.16.1-buster-slim
# Working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# PORT setting
ENV PORT 3000
# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Install and cache app dependencies
COPY package*.json /usr/src/app/
# Install dependencies
RUN npm install --silent
# Fix peer dependencies
RUN npm audit fix
# Clean dependencies cache
RUN npm cache clean --force
# Copy source files
COPY . /usr/src/app/
# Build client production version
RUN npm run build
# PORT exposing
EXPOSE 3000
# Start app
CMD ["npm", "run", "start"]
