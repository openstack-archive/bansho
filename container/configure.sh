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

    curl 'http://localhost:8888/grafana/api/dashboards/db/' --data-binary $'{"dashboard":{"id":1,"title":"New dashboard","originalTitle":"New dashboard","tags":[],"style":"dark","timezone":"browser","editable":true,"hideControls":false,"sharedCrosshair":false,"rows":[{"collapse":false,"editable":true,"height":"250px","panels":[{"aliasColors":{},"bars":false,"datasource":null,"editable":true,"error":false,"fill":1,"grid":{"leftLogBase":1,"leftMax":null,"leftMin":null,"rightLogBase":1,"rightMax":null,"rightMin":null,"threshold1":null,"threshold1Color":"rgba(216, 200, 27, 0.27)","threshold2":null,"threshold2Color":"rgba(234, 112, 112, 0.22)"},"id":1,"legend":{"avg":false,"current":false,"max":false,"min":false,"show":true,"total":false,"values":false},"lines":true,"linewidth":2,"links":[],"nullPointMode":"connected","percentage":false,"pointradius":5,"points":false,"renderer":"flot","seriesOverrides":[],"span":12,"stack":false,"steppedLine":false,"targets":[{"function":"mean","groupByTags":[],"measurement":"$metric","query":"SELECT mean(value) FROM \\"$metric\\" WHERE host_name=\'$host_name\' AND service_description=\'$service_description\' AND $timeFilter GROUP BY time($interval) ORDER BY asc","tags":[{"key":"host_name","value":"$host_name"},{"condition":"AND","key":"service_description","value":"$service_description"}]}],"timeFrom":null,"timeShift":null,"title":"","tooltip":{"shared":true,"value_type":"cumulative"},"type":"graph","x-axis":true,"y-axis":true,"y_formats":["short","short"]}],"title":"Row"}],"nav":[{"collapse":false,"enable":true,"notice":false,"now":true,"refresh_intervals":["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"],"status":"Stable","time_options":["5m","15m","1h","6h","12h","24h","2d","7d","30d"],"type":"timepicker"}],"time":{"from":"now-6h","to":"now"},"templating":{"list":[{"type":"query","datasource":null,"refresh_on_load":false,"name":"metric","options":[],"includeAll":false,"allFormat":"glob","multi":false,"multiFormat":"glob"},{"type":"query","datasource":null,"refresh_on_load":false,"name":"host_name","options":[],"includeAll":false,"allFormat":"glob","multi":false,"multiFormat":"glob","query":""},{"type":"query","datasource":null,"refresh_on_load":false,"name":"service_description","options":[],"includeAll":false,"allFormat":"glob","multi":false,"multiFormat":"glob"}]},"annotations":{"list":[]},"schemaVersion":6,"version":1,"links":[]},"overwrite":false}' --compressed
}

configure_proxy

if [ -f "/.grafana_setup" ]; then
    echo "=> Data sources had been created before, skipping ..."
else
    (sleep 60 && configure_grafana && touch "/.grafana_setup")&
fi


