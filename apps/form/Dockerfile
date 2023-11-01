# FROM node:18 AS builder

# # Create app directory
# WORKDIR /app

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./
# COPY prisma ./prisma/

# # Install app dependencies
# RUN npm install
# # Generate prisma client, leave out if generating in `postinstall` script
# RUN npx prisma generate

# COPY . .

# RUN npm run build

# FROM node:18

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

# EXPOSE 3000
# CMD ["npm", "run", "start:prod"]


FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate


COPY . .

RUN npm run build form

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/form/main"]