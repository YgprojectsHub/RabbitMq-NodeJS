import { rabbitMQConnection } from "./Connection.js";

export const setupRabbitMQ = async() => {
  const connection = await rabbitMQConnection()
  const channel = await connection.createChannel();

  await channel.assertExchange('orderExchange', 'direct', { durable: true });
  await channel.assertQueue('orderCreatedQueue', { durable: true });
  await channel.assertQueue('orderCancelledQueue', { durable: true });
  await channel.bindQueue('orderCreatedQueue', 'orderExchange', 'order.created');
  await channel.bindQueue('orderCancelledQueue', 'orderExchange', 'order.cancelled');

  await channel.assertExchange('campaignExchange', 'fanout', { durable: true });
  await channel.assertQueue('emailQueue', { durable: true });
  await channel.assertQueue('smsQueue', { durable: true });
  await channel.bindQueue('emailQueue', 'campaignExchange', '');
  await channel.bindQueue('smsQueue', 'campaignExchange', '');

  await channel.assertExchange('notificationExchange', 'topic', { durable: true });
  await channel.assertQueue('paymentSuccessQueue', { durable: true });
  await channel.assertQueue('shippingDelayedQueue', { durable: true });
  await channel.bindQueue('paymentSuccessQueue', 'notificationExchange', 'order.payment.success');
  await channel.bindQueue('shippingDelayedQueue', 'notificationExchange', 'order.shipping.delayed');

  console.log("RabbitMQ setup tamamlandı!");
  setTimeout(() => connection.close(), 500);
}
