/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites(){
    return [{
      source: "/(r|R)(e|E)(s|S)(u|U)(m|M)(e|E)",
      destination: "/resume"
    }]
  },
  images: {
    domains: ['i.imgur.com']
  },
}
