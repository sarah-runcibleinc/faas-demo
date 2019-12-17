gcloud functions deploy postTemperature --runtime nodejs8 --trigger-http &
gcloud functions deploy writeFirestore --runtime nodejs8 --trigger-topic readings --retry &
gcloud functions deploy writeBigQuery --runtime nodejs8 --trigger-topic readings --retry &
