const mqtt = require('mqtt');

// Configuration
const brokerUrl = 'mqtt://localhost:1883'; // URL of the Mosquitto broker
const topic = 'test/topic';               // Topic to subscribe and publish to

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log('Connected to Mosquitto MQTT Broker');

    // Subscribe to the topic
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Subscription error:', err.message);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });

    // Publish a test message
    const message = 'are you in work now ?';
    client.publish(topic, message, (err) => {
        if (err) {
            console.error('Publish error:', err.message);
        } else {
            console.log(`Message published: "${message}"`);
        }
    });
});

// Handle incoming messages
client.on('message', (topic, message) => {
    console.log(`Received message on topic "${topic}": ${message.toString()}`);
});

// Handle errors
client.on('error', (err) => {
    console.error('Error:', err.message);
    client.end();
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Disconnecting...');
    client.end();
    process.exit();
});
