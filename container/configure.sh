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

    curl 'http://localhost:8888/grafana/api/dashboards/db/' -H 'Origin: http://localhost:8888' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en,en-GB;q=0.8,en-US;q=0.6,fr-CA;q=0.4,fr;q=0.2' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Referer: http://localhost:8888/grafana/dashboard-import/dashboardmetrichostnameservicedescription' -H 'Cookie: user="!FDmXQdbvh6g4wLt8w+3Www==?gAJVBHVzZXJxAVUFYWRtaW5xAoZxAy4="; connected=true; host=%22localhost%22; ssl=false' -H 'Connection: keep-alive' -H 'DNT: 1' --data-binary $'{"dashboard":{"id":null,"title":"dashboardMetricHostnameServicedescription","originalTitle":"dashboardMetricHostnameServicedescription","tags":[],"style":"dark","timezone":"browser","editable":true,"hideControls":false,"sharedCrosshair":false,"rows":[{"collapse":false,"editable":true,"height":"250px","panels":[{"aliasColors":{},"bars":false,"datasource":null,"editable":true,"error":false,"fill":1,"grid":{"leftLogBase":1,"leftMax":null,"leftMin":null,"rightLogBase":1,"rightMax":null,"rightMin":null,"threshold1":null,"threshold1Color":"rgba(216, 200, 27, 0.27)","threshold2":null,"threshold2Color":"rgba(234, 112, 112, 0.22)"},"id":1,"legend":{"avg":false,"current":false,"max":false,"min":false,"show":true,"total":false,"values":false},"lines":true,"linewidth":2,"links":[],"nullPointMode":"connected","percentage":false,"pointradius":5,"points":false,"renderer":"flot","seriesOverrides":[],"span":6,"stack":false,"steppedLine":false,"targets":[{"function":"mean","groupByTags":[],"hide":true,"measurement":"$measurements","query":"SELECT mean(value) FROM \\"metric_load1\\" WHERE host_name=\'$host_name\' AND service_description=\'$service_description\' AND $timeFilter GROUP BY time($interval) ORDER BY asc","tags":[{"key":"host_name","value":"$host_name"},{"condition":"AND","key":"service_description","value":"$service_description"}]}],"timeFrom":null,"timeShift":null,"title":"","tooltip":{"shared":true,"value_type":"cumulative"},"type":"graph","x-axis":true,"y-axis":true,"y_formats":["short","short"]}],"title":"Row"}],"nav":[{"collapse":false,"enable":true,"notice":false,"now":true,"refresh_intervals":["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"],"status":"Stable","time_options":["5m","15m","1h","6h","12h","24h","2d","7d","30d"],"type":"timepicker"}],"time":{"from":"now-6h","to":"now"},"templating":{"list":[{"allFormat":"glob","current":{"text":"metric_time","value":"metric_time"},"datasource":null,"includeAll":false,"multi":false,"multiFormat":"glob","name":"measurements","options":[{"text":"ALERT","value":"ALERT"},{"text":"HOST_STATE","value":"HOST_STATE"},{"text":"SERVICE_STATE","value":"SERVICE_STATE"},{"text":"metric_pl","value":"metric_pl"},{"text":"metric_rta","value":"metric_rta"},{"text":"metric_rtmax","value":"metric_rtmax"},{"text":"metric_rtmin","value":"metric_rtmin"},{"text":"metric_time","value":"metric_time"}],"query":"SHOW measurements","refresh_on_load":false,"type":"query"},{"allFormat":"glob","current":{"text":"srv-monitoring-01","value":"srv-monitoring-01"},"datasource":null,"includeAll":false,"multi":false,"multiFormat":"glob","name":"host_name","options":[{"selected":false,"text":"google.com","value":"google.com"},{"selected":false,"text":"localhost","value":"localhost"},{"selected":false,"text":"myparentisdown","value":"myparentisdown"},{"selected":false,"text":"myserviceisdown","value":"myserviceisdown"},{"selected":false,"text":"openstackceilometer-host","value":"openstackceilometer-host"},{"selected":false,"text":"srv-apache-01","value":"srv-apache-01"},{"selected":false,"text":"srv-ldap-01","value":"srv-ldap-01"},{"selected":true,"text":"srv-monitoring-01","value":"srv-monitoring-01"},{"selected":false,"text":"sw-iwebcore-01","value":"sw-iwebcore-01"},{"selected":false,"text":"test_keystone","value":"test_keystone"},{"selected":false,"text":"ws-arbiter","value":"ws-arbiter"}],"query":"SHOW tag values With key in (host_name) ","refresh_on_load":false,"regex":"","type":"query"},{"allFormat":"glob","current":{"text":"load","value":"load"},"datasource":null,"includeAll":false,"multi":false,"multiFormat":"glob","name":"service_description","options":[{"selected":false,"text":"Check KeyStone service.","value":"Check KeyStone service."},{"selected":false,"text":"check-ws-arbiter","value":"check-ws-arbiter"},{"selected":false,"text":"check_ceilometer_cpu","value":"check_ceilometer_cpu"},{"selected":false,"text":"check_ceilometer_memory","value":"check_ceilometer_memory"},{"selected":false,"text":"cpu","value":"cpu"},{"selected":false,"text":"disk","value":"disk"},{"selected":false,"text":"iamadownservice","value":"iamadownservice"},{"selected":true,"text":"load","value":"load"},{"selected":false,"text":"memory","value":"memory"},{"selected":false,"text":"swap","value":"swap"},{"selected":false,"text":"users","value":"users"}],"query":"SHOW tag values With key in (service_description) ","refresh_on_load":false,"regex":"","type":"query"}]},"annotations":{"list":[]},"schemaVersion":6,"version":2,"links":[]},"overwrite":false}' --compressed
}

configure_proxy

if [ -f "/.grafana_setup" ]; then
    echo "=> Data sources had been created before, skipping ..."
else
    (sleep 60 && configure_grafana && touch "/.grafana_setup")&
fi


