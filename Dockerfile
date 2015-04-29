FROM ubuntu:trusty
MAINTAINER Philippe Pepos Petitclerc <philippe.pepos-petitclerc@savoirfairelinux.com>

# Set the locale
RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

RUN apt-get update && apt-get install -yq git apache2 npm nodejs-legacy ruby
RUN npm install -g grunt-cli bower
RUN gem install sass
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd

# Configure Apache2 for reverse-proxying
ADD container/000-default.conf etc/apache2/sites-enabled/000-default.conf
ADD container/ports.conf etc/apache2/ports.conf
RUN a2enmod proxy
RUN a2enmod proxy_http

# configure script
ADD container/configure.sh /configure.sh

# Bansho files
ADD /package.json /opt/adagios-frontend/package.json
ADD /.bowerrc /opt/adagios-frontend/.bowerrc
ADD /.jshintrc /opt/adagios-frontend/.jshintrc
ADD /Gruntfile.js /opt/adagios-frontend/Gruntfile.js
ADD /bower.json /opt/adagios-frontend/bower.json
RUN cd /opt/adagios-frontend/ && npm install --unsafe-perm
ADD /app /opt/adagios-frontend/app

# Override those variables at runtime to point Bansho to another backend
ENV BANSHO_BACKEND surveil
ENV BANSHO_PROD true
ENV BANSHO_SURVEIL_URL http://surveil:8080/
ENV BANSHO_ADAGIOS_URL http://demo.kaji-project.org/

CMD ./configure.sh && \
    cd /opt/adagios-frontend && \
    bash -c "if [ $BANSHO_PROD = true ] ; then grunt production:$BANSHO_BACKEND ; fi" && \
    bash -c "source /etc/apache2/envvars && exec /usr/sbin/apache2 -DFOREGROUND"
