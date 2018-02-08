FROM node:8-alpine
ADD ./ /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["/app/docker-entrypoint.sh"]
