import { rabbitMQConnection } from "../RabbitMQ-Settings/Connection.js";

const consumeOrder = async(queue) => {
  const connection = await rabbitMQConnection()
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  console.log(`${queue} kuyruğu dinleniyor...`);

  channel.consume(queue, (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log(`(${queue}):`, order);

      // Mesaj işlenmişse kuyruktan kaldır
      channel.ack(msg);
    }
  });
}

consumeOrder('orderCreatedQueue');

consumeOrder('orderCancelledQueue');
