import 'dotenv/config'
import pdf from 'pdf-extraction'

import { microservice, channel } from '@providers/rabbitmq'

(async () => {
  try {
    await microservice('rpc_extract')
    channel.consume('rpc_extract', async (msg) => {
      await pdf(msg.content)
        .then((data) => {
          channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(data)), {
            correlationId: msg.properties.correlationId
          })
          channel.ack(msg)
        })
        .catch((err) => console.log(err))
    }, { noAck: false })
  } catch (err) {
    console.log(err)
  }
})()
