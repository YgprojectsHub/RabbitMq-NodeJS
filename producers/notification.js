import { rabbitMQConnection } from "../RabbitMQ-Settings/Connection.js";

export const sendNotification = async(routingKey, notificationData) => {
  const connection = await rabbitMQConnection()
  const channel = await connection.createChannel();

  const exchange = 'notificationExchange';

  await channel.assertExchange(exchange, 'topic', { durable: true });
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(notificationData)));

  setTimeout(() => connection.close(), 500);
}

// sendNotification('order.payment.success', { orderId: 101, status: 'success' });

// sendNotification('order.shipping.delayed', { orderId: 102, status: 'delayed' });
