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
# https://mimirswell.ggnet.co.jp/blog-221
COPY gekko-front/package.json /usr/src/app/package.json
COPY gekko-front/package-lock.json /usr/src/app/package-lock.json
RUN cd /usr/src/app; npm install --only=production --no-optional

# Copy files
COPY gekko-front/.babelrc       /usr/src/app/.babelrc
COPY gekko-front/.eslintrc.js   /usr/src/app/.eslintrc.js
COPY gekko-front/.prettierrc    /usr/src/app/.prettierrc
COPY gekko-front/jest.config.js /usr/src/app/jest.config.js
COPY gekko-front/nuxt.config.js /usr/src/app/nuxt.config.js
COPY gekko-front/jsconfig.json  /usr/src/app/jsconfig.json
COPY gekko-front/assets         /usr/src/app/assets
COPY gekko-front/components     /usr/src/app/components
COPY gekko-front/layouts        /usr/src/app/layouts
COPY gekko-front/middleware     /usr/src/app/middleware
COPY gekko-front/models         /usr/src/app/models
COPY gekko-front/pages          /usr/src/app/pages
COPY gekko-front/plugins        /usr/src/app/plugins
COPY gekko-front/static         /usr/src/app/static
COPY gekko-front/store          /usr/src/app/store
COPY gekko-front/test           /usr/src/app/test
COPY gekko-front/utils          /usr/src/app/utils

# Listen Port
EXPOSE 5000

# Environment Variables
# APP_NAME gekko-front

CMD ["/bin/sh", "-c", "npm run build:docker && npm run start"]
