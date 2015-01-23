FROM ubuntu:trusty
MAINTAINER Philippe Pepos Petitclerc <philippe.pepos-petitclerc@savoirfairelinux.com>

RUN apt-get update
RUN apt-get install -yq apache2 npm nodejs-legacy supervisor
RUN npm install -g grunt-cli
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd /var/log/supervisor

# Add supervisor config files
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Configure Apache2 for reverse-proxying
ADD 000-default.conf etc/apache2/sites-enabled/000-default.conf
RUN a2enmod proxy
RUN a2enmod proxy_http

# Expose appropriate ports
EXPOSE 80 8000

CMD ["/usr/bin/supervisord"]
