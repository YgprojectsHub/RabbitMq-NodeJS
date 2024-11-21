import { rabbitMQConnection } from '../RabbitMQ-Settings/Connection.js';

export const sendOrder = async(orderData) => {
  const connection = await rabbitMQConnection()
  const channel = await connection.createChannel();

  const exchange = 'orderExchange';
  const routingKey = orderData.status === 'created' ? 'order.created' : 'order.cancelled';

  await channel.assertExchange(exchange, 'direct', { durable: true });
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(orderData)));

  setTimeout(() => connection.close(), 500);
}

// sendOrder({ orderId: 101, userId: 42, status: 'created', amount: 250 });
