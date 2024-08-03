FROM node:18-alpine AS base

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
