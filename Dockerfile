FROM ubuntu:trusty
MAINTAINER Philippe Pepos Petitclerc <philippe.pepos-petitclerc@savoirfairelinux.com>

# Set the locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN apt-get update && apt-get install -yq git apache2 npm nodejs-legacy ruby curl
RUN npm install -g grunt-cli bower
RUN gem install sass
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd

# Configure Apache2 for reverse-proxying
ADD container/000-default.conf etc/apache2/sites-enabled/000-default.conf
ADD container/ports.conf etc/apache2/ports.conf
RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod headers

# configure script
ADD container/configure.sh /configure.sh
ADD container/configure-dashboard.sh /configure-dashboard.sh

# Bansho files
ADD /package.json /opt/bansho/package.json
ADD /.bowerrc /opt/bansho/.bowerrc
ADD /.jshintrc /opt/bansho/.jshintrc
ADD /Gruntfile.js /opt/bansho/Gruntfile.js
ADD /bower.json /opt/bansho/bower.json
RUN cd /opt/bansho/ && npm install --unsafe-perm
ADD /app /opt/bansho/app

# Override those variables at runtime to point Bansho to another backend
ENV BANSHO_PROD true
ENV BANSHO_SURVEIL_URL http://surveil:5311/
ENV BANSHO_AUTH_URL http://surveil:5311/v2/auth/

ENV INFLUXDB_HOST influxdb
ENV INFLUXDB_PORT 8086
ENV INFLUXDB_NAME db
ENV INFLUXDB_USER root
ENV INFLUXDB_PASS root

CMD ./configure.sh && \
    cd /opt/bansho && \
    bash -c "if [ $BANSHO_PROD = true ] ; then grunt production ; fi" && \
    bash -c "source /etc/apache2/envvars && exec /usr/sbin/apache2 -DFOREGROUND"
