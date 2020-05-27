FROM node:12

# Documents
# http://docs.docker.jp/engine/articles/dockerfile_best-practice.html

# Working Directory
WORKDIR /usr/src/app

# Install dependency package
RUN apt-get update \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install app dependencies
COPY gekko-api/package.json /usr/src/app/package.json
COPY gekko-api/package-lock.json /usr/src/app/package-lock.json
RUN cd /usr/src/app; npm install --only=production

# Copy files
COPY gekko-api/common /usr/src/app/common
COPY gekko-api/config /usr/src/app/config
COPY gekko-api/models /usr/src/app/models
COPY gekko-api/routes /usr/src/app/routes
COPY gekko-api/app.js /usr/src/app/app.js

# Listen Port
EXPOSE 3000

# Environment Variables
# APP_NAME gekko-api

CMD ["/bin/sh", "-c", "npm run start"]
