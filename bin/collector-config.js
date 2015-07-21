// Default configuration for development.

module.exports = {
  "mongo-url": process.env.MONGO_URL || "mongodb://127.0.0.1:27017,127.0.0.1:27018/cube_development?replicaSet=troupeSet",
  "http-port": process.env.COLLECTOR_HTTP_PORT || 1080,
  "udp-port": process.env.COLLECTOR_UDP_PORT || 1180
};
