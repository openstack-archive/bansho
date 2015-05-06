#!/bin/bash

CONFIG_FILE="/etc/apache2/sites-enabled/000-default.conf"

echo "=> Configuring apache ProxyPass ..."

# Surveil URLS
sed -i "s|ProxyPass /surveil/ .*|ProxyPass /surveil/ ${BANSHO_SURVEIL_URL}|g" ${CONFIG_FILE}
sed -i "s|ProxyPassReverse /surveil/ .*|ProxyPassReverse /surveil/ ${BANSHO_SURVEIL_URL}|g" ${CONFIG_FILE}

# Adagios URLS
sed -i "s|ProxyPass /adagios/.*|ProxyPass /adagios/ ${BANSHO_ADAGIOS_URL}|g" ${CONFIG_FILE}
sed -i "s|ProxyPassReverse /adagios/.*|ProxyPassReverse /adagios/ ${BANSHO_ADAGIOS_URL}|g" ${CONFIG_FILE}

# Bansho auth URL
sed -i "s|ProxyPass /surveil/v2/auth/.*|ProxyPass /surveil/v2/auth/ ${BANSHO_AUTH_URL}|g" ${CONFIG_FILE}
sed -i "s|ProxyPassReverse /surveil/v2/auth/.*|ProxyPass /surveil/v2/auth/ ${BANSHO_AUTH_URL}|g" ${CONFIG_FILE}
