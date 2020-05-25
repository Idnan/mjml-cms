#
# ---- Base Node ----
# https://hub.docker.com/_/node/?tab=description
FROM node:14.2.0-alpine3.11

ARG GH_PAT
ENV GH_PAT=${GH_PAT}

# todo need to be removed from here
ARG API_URL=https://mjml-cms-api.herokuapp.com

# set working directory
WORKDIR /home/node/app

RUN apk add --no-cache git openssh && \
 git config --global url."https://$GH_PAT:x-oauth-basic@github.com/".insteadOf "https://github.com/" && \
 git config --global url."https://$GH_PAT:x-oauth-basic@github.com/".insteadOf "ssh://git@github.com/"

COPY . .

RUN yarn global add serve

RUN yarn

RUN REACT_APP_API_URL=${API_URL} yarn build

# expose port and define CMD
# USER node
EXPOSE 3000
CMD serve -s build
