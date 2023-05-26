const redis = require("redis");

const channels = {
  test: "movies",
  blockchain: "blockchain",
};

class Broker {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToChannels();

    this.subscriber.on("message", (channel, message) => {
      console.log(`Got the message: ${message} on channel: ${channel}`);
    });
  }

  handleMessage(channel, message) {
    const blockchain = JSON.parse(message);
    console.log(`Got the message on channel ${channel}, ${blockchain}`);
  }

  subscribeToChannels() {
    Object.values(channels).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }
  publish(channel, message) {
    this.publisher.publish(channel, message);
  }
  broadcast() {
    this.publish(channels.blockchain, JSON.stringify(this.blockchain));
  }
}

module.exports = Broker;
