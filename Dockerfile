FROM ubuntu: lite
WORKDIR /root
RUN apt-get update
RUN python --version