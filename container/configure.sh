#!/bin/bash

CONFIG_FILE="/etc/apache2/sites-enabled/000-default.conf"

function configure_proxy {
    echo "=> Configuring apache ProxyPass ..."

    # Surveil URLS
    sed -i "s|ProxyPass /surveil/ .*|ProxyPass /surveil/ ${BANSHO_SURVEIL_URL}|g" ${CONFIG_FILE}
    sed -i "s|ProxyPassReverse /surveil/ .*|ProxyPassReverse /surveil/ ${BANSHO_SURVEIL_URL}|g" ${CONFIG_FILE}

    # Bansho auth URL
    sed -i "s|ProxyPass /surveil/v2/auth/.*|ProxyPass /surveil/v2/auth/ ${BANSHO_AUTH_URL}|g" ${CONFIG_FILE}
    sed -i "s|ProxyPassReverse /surveil/v2/auth/.*|ProxyPass /surveil/v2/auth/ ${BANSHO_AUTH_URL}|g" ${CONFIG_FILE}
}

function configure_grafana {
    echo "=> Configuring InfluxDB datasources."

    curl 'http://localhost:8888/grafana/api/datasources' -X PUT -H 'Content-Type: application/json;charset=utf-8' --data '{"name":"influxdb","type":"influxdb","url":"http://'${INFLUXDB_HOST}':'${INFLUXDB_PORT}'","access":"proxy","isDefault":true,"database":"'${INFLUXDB_NAME}'","user":"'${INFLUXDB_USER}'","password":"'${INFLUXDB_PASS}'"}'
}

configure_proxy

if [ -f "/.grafana_setup" ]; then
    echo "=> Data sources had been created before, skipping ..."
else
    (sleep 60 && configure_grafana && touch "/.grafana_setup")&
fi
