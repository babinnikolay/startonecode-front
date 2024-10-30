#PREPARE
FROM node:20.18-alpine as build
RUN mkdir /usr/src
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
#RUN NGINX
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/startonecode-front/browser /usr/share/nginx/html
