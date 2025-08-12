FROM python:3.9.23

RUN apt-get update && apt-get install -y net-tools postgresql-client curl sudo
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
RUN apt-get update && apt-get install -y nodejs
RUN apt-get install -y ffmpeg libgl1

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/frontend/
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm install .

WORKDIR /home/app/backend/
RUN pip3 install -r requirements.txt

