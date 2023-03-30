/** @type {import('next').NextConfig} */
const { withExpo } = require("@expo/next-adapter");

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["react-native", "react-native-web", "universal-tooltip"],
};

module.exports = withExpo(nextConfig);
