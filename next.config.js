/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig;

// const withTM = require("next-transpile-modules")([
//   "@fullcalendar/common",
//   "@babel/preset-react",
//   "@fullcalendar/common",
//   "@fullcalendar/daygrid",
//   "@fullcalendar/interaction",
//   "@fullcalendar/react",
//   "@fullcalendar/timegrid",
// ]);

// module.exports = withTM({
//   nextConfig
// });
