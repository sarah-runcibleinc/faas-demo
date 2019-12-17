const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const {Firestore} = require('@google-cloud/firestore');
const db = new Firestore();
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
const {google} = require('googleapis');

exports.postTemperature = async (req, res) => {
  const reading = req.body;
  reading.ts = Date.now();
  const buffer = Buffer.from(JSON.stringify(reading));
  await pubsub.topic('readings').publish(buffer);
  res.send('OK\n');
};

exports.writeFirestore = async (pubSubMessage, context, callback) => {
  const record = decodePubSubMessage(pubSubMessage);
  const doc = db.doc(`panels/panel_${record.panel_id}`);
  await doc.set({temp: record.temp, ts: record.ts});
  callback();
};

exports.writeBigQuery = async (pubSubMessage, context, callback) => {
  const record = decodePubSubMessage(pubSubMessage);
  try {
    await bigquery.dataset('readings').table('readingss').insert([record]);
    callback();
  }
  catch(ex) {
    throw new Error(ex);
  }
}

function decodePubSubMessage(message) {
  return JSON.parse(Buffer.from(message.data, 'base64').toString());
}


