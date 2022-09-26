FROM node:16
#get Imaage from docker hub

WORKDIR /usr/src/app

COPY package*.json .  
COPY yarn.lock .
#copy package & packagelock files to WORKDIR specified 

RUN npm ci
#ci means continous integration - recommended {do not run npm install}

COPY . .
#copy all from local working dir to WORKDIR

# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]