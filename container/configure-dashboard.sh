#!/bin/bash

GRAFANA_URL="http://localhost:8888/grafana"

# Get opt
while getopts "H:U:P:p:g:" o; do
    case "${o}" in
        H)
            INFLUXDB_HOST=${OPTARG}
            ;;
        U)
            INFLUXDB_USER=${OPTARG}
            ;;
        P)
            INFLUXDB_PASS=${OPTARG}
           ;;
        p)
            INFLUXDB_PORT=${OPTARG}
           ;;
        g)
            GRAFANA_URL=${OPTARG}
           ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

echo "=> Configuring InfluxDB datasources."
curl ${GRAFANA_URL}'/api/datasources' -X PUT -H 'Content-Type: application/json;charset=utf-8' --data '{"name":"influxdb","type":"influxdb","url":"http://'${INFLUXDB_HOST}':'${INFLUXDB_PORT}'","access":"proxy","isDefault":true,"database":"'${INFLUXDB_NAME}'","user":"'${INFLUXDB_USER}'","password":"'${INFLUXDB_PASS}'"}'

echo "=> Configuring Grafana dashboard."
# Save dashboard
curl ${GRAFANA_URL}'/api/dashboards/db/' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Connection: keep-alive' -H 'DNT: 1' --data-binary $'{"dashboard":{"id":null,"title":"templateHostNameServiceDescriptionOneMetric","originalTitle":"templateHostNameServiceDescriptionOneMetric","tags":[],"style":"dark","timezone":"browser","editable":true,"hideControls":false,"rows":[{"collapse":false,"editable":true,"height":"250px","panels":[{"aliasColors":{},"bars":false,"datasource":null,"editable":true,"error":false,"fill":1,"grid":{"leftLogBase":1,"leftMax":null,"leftMin":null,"rightLogBase":1,"rightMax":null,"rightMin":null,"threshold1":null,"threshold1Color":"rgba(216, 200, 27, 0.27)","threshold2":null,"threshold2Color":"rgba(234, 112, 112, 0.22)"},"id":1,"interval":"20s","legend":{"avg":false,"current":false,"max":false,"min":false,"show":true,"total":false,"values":false},"lines":true,"linewidth":2,"links":[],"nullPointMode":"connected","percentage":false,"pointradius":5,"points":false,"renderer":"flot","seriesOverrides":[],"span":12,"stack":false,"steppedLine":false,"targets":[{"function":"mean","groupByTags":[],"measurement":"$metric1","query":"SELECT mean(value) FROM \\"$metric1\\" WHERE host_name=\'$host_name\' AND service_description=\'$service_description\' AND $timeFilter GROUP BY time($interval) ORDER BY asc","tags":[{"key":"host_name","value":"$host_name"},{"condition":"AND","key":"service_description","value":"$service_description"}]}],"timeFrom":null,"timeShift":null,"title":"","tooltip":{"shared":true,"value_type":"cumulative"},"type":"graph","x-axis":true,"y-axis":true,"y_formats":["short","short"]}],"title":"Row"}],"nav":[{"collapse":false,"enable":true,"notice":false,"now":true,"refresh_intervals":["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"],"status":"Stable","time_options":["5m"],"type":"timepicker"}],"time":{"from":"now-6h","to":"now"},"templating":{"list":[{"allFormat":"glob","datasource":null,"includeAll":false,"multi":false,"multiFormat":"glob","name":"metric1","query":"SHOW measurements","refresh_on_load":false,"type":"query"},{"allFormat":"glob","datasource":null,"includeAll":false,"multi":false,"multiFormat":"glob","name":"host_name","query":"SHOW tag values With key in (host_name) ","refresh_on_load":false,"type":"query"},{"allFormat":"glob","datasource":null,"includeAll":false,"multi":false,"multiFormat":"glob","name":"service_description","query":"SHOW tag values With key in (service_description) ","refresh_on_load":false,"type":"query"}]},"annotations":{"list":[]},"schemaVersion":6,"version":0,"links":[]},"overwrite":true}' --compressed

