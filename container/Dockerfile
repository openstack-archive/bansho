FROM ubuntu:trusty
MAINTAINER Philippe Pepos Petitclerc <philippe.pepos-petitclerc@savoirfairelinux.com>

# Set the locale
RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

RUN apt-get update
RUN apt-get install -yq apache2 npm nodejs-legacy supervisor ruby
RUN npm install -g grunt-cli
RUN gem install sass
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd /var/log/supervisor

# Add supervisor config files
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Configure Apache2 for reverse-proxying
ADD 000-default.conf etc/apache2/sites-enabled/000-default.conf
ADD ports.conf etc/apache2/ports.conf
RUN a2enmod proxy
RUN a2enmod proxy_http

# Expose appropriate ports
EXPOSE 8080

CMD ["/usr/bin/supervisord"]
