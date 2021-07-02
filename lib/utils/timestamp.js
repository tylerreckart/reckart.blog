const timestamp = () => {
  const now = Date.now();
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  }).format(now);
};

module.exports = timestamp;
