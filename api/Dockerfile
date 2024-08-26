FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# RUN apt-get update && apt-get install -y \
#     build-essential \
#     python3 \
#     && npm install --only=production \
#     && npm install -g @nestjs/cli \
#     && npm rebuild bcrypt --build-from-source \
#     && apt-get remove -y build-essential python3 \
#     && apt-get autoremove -y

RUN npm install --only=production && npm install -g @nestjs/cli 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
