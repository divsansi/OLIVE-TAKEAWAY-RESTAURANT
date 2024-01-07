FROM node:latest

WORKDIR /usr/src/app

ENV DATABASE_URL "mongodb+srv://divyangi:Fullstack3120@cluster0.1ke3zki.mongodb.net/Buona"
ENV AWS_REGION "us-west-1"
ENV AMPLIFY_BUCKET "diwi-fullstack-bucket"
ENV AWS_ACCESS_KEY_ID "AKIA4MTWMJCK4C5ICBOS"
ENV AWS_SECRET_ACCESS_KEY "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"
ENV DB_NAME points
ENV COL_NAME dataPoints

COPY . /usr/src/app

RUN npm install -g bun

RUN bun install

CMD ["npm", "run", "start"]