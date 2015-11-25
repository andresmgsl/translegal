# Base Node image made for Pleiades nodes
# Installs main dependencies and layers used by our Node.js application containers
FROM node

# Debian dependencies
RUN apt-get update && apt-get install -y \
  libmagick++-dev \
  git \
  zsh \
  curl
RUN npm install -g grunt grunt-cli bower

# Download repository
RUN mkdir -p /home/dev/repo 
#ADD . /home/dev/repo
#RUN git clone git@github.com:archector/irbio.git

# Install app dependencies
#RUN npm install
#RUN bower install --config.interactive=false --allow-root

# Export environment variables
#ENV NODE_ENV development

# Expose ports to host
#EXPOSE 9000 3000 35729

#CMD ["grunt serve"]