import { rabbitMQConnection } from "../RabbitMQ-Settings/Connection.js";

const consumeCampaign = async(queue) => {
  const connection = await rabbitMQConnection()
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  console.log(`${queue} kuyruğu dinleniyor...`);

  channel.consume(queue, (msg) => {
    if (msg) {
      const campaign = JSON.parse(msg.content.toString());
      console.log(`(${queue}):`, campaign);

      channel.ack(msg);
    }
  });
}

consumeCampaign('emailQueue');

consumeCampaign('smsQueue');
