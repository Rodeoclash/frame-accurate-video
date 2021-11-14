FROM node:16-bullseye as development

EXPOSE 3000

ENV APP_HOME=/usr/src/app \
  LANG=C.UTF-8

WORKDIR $APP_HOME

COPY ./ ./

# build frontend
RUN npm install

CMD npm run dev
