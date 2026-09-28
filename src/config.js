const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://pandey-catering-api.onrender.com"
).replace(/\/$/, "");

export default API_URL;
