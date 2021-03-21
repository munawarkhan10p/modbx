FROM node:12

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .

ENTRYPOINT ["./entrypoint.sh"]

CMD ["yarn", "watch", "|", "yarn", "run", "bunyan", "-o", "simple"]
