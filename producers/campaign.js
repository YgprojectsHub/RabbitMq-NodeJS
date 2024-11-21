import { rabbitMQConnection } from "../RabbitMQ-Settings/Connection.js";

export const sendCampaign = async(campaignData) => {
  const connection = await rabbitMQConnection();
  const channel = await connection.createChannel();

  const exchange = 'campaignExchange';

  await channel.assertExchange(exchange, 'fanout', { durable: true });
  channel.publish(exchange, '', Buffer.from(JSON.stringify(campaignData)));

  setTimeout(() => connection.close(), 500);
}

// sendCampaign({ campaignId: 1, message: 'Black Friday İndirimi!' });
