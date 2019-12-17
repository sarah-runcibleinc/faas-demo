a=1

while [ $a -lt 11 ]
do
  sleep 1
  echo "Making post $a"

  curl -H "Content-Type:application/json" \
    -X POST \
    -d "{\"panel_id\":$(((RANDOM%900)+99)), \"temp\":$(((RANDOM%110)+30))}" \
    http://us-central1-prod-261517.cloudfunctions.net/postTemperature
      
  a=`expr $a + 1`
done
