FROM node:16.15-slim
WORKDIR /srv/express
COPY ./Express .
COPY ./Express/package.json .
RUN npm install 
RUN npm build
COPY .env.development ./dist
WORKDIR /srv/app/dist
EXPOSE 8100
CMD npx knex migrate:latest &&\
    npx knex seed:run &&\
    node server.js 

############################################################################


FROM python:3.8
WORKDIR /srv/sanic
COPY ./Sanic .
COPY ./Sanic/requirements.txt .
RUN python3 -m pip install --upgrade pip
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
EXPOSE 5010
CMD python3 server.py
