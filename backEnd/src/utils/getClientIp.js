// Needs app.set("trust proxy", 1) in app.js when hosted behind
// a proxy (Render, Railway, etc.), otherwise req.ip is the proxy's IP.
const getClientIp = (req) => {
  const ip = req.ip || req.socket?.remoteAddress || "";
  return ip.replace("::ffff:", "");
};

export default getClientIp;