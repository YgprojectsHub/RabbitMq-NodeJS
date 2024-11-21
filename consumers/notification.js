import { rabbitMQConnection } from "../RabbitMQ-Settings/Connection.js";

const consumeNotification = async(queue) => {
  const connection = await rabbitMQConnection()
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  console.log(`${queue} kuyruğu dinleniyor...`);

  channel.consume(queue, (msg) => {
    if (msg) {
      const notification = JSON.parse(msg.content.toString());
      console.log(`(${queue}):`, notification);

      channel.ack(msg);
    }
  });
}

consumeNotification('paymentSuccessQueue');

consumeNotification('shippingDelayedQueue');
