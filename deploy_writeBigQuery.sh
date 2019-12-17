set -x
gcloud functions deploy writeBigQuery --runtime nodejs8 --trigger-topic readings --retry
