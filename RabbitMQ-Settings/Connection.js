dotenv.config()
import dotenv from "dotenv"
import { connect } from 'amqplib';

// process.env.RABBITMQ_LINK

export const rabbitMQConnection = async() => {
    const connection = await connect('amqp://guest:*.r-mq.yg.3169.*@localhost:5672')
    return connection
}