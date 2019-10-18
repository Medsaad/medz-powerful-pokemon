FROM node:alpine

RUN npm init -y
RUN npm install express async request request-promise