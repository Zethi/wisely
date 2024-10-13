FROM node:21

WORKDIR /app

COPY . .

RUN  npm install && npm run build

EXPOSE 3000
CMD ["./wait-for-it.sh", "database:3306", "--", "npm", "run", "start:production"]