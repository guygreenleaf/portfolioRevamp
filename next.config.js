/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/resume',
        destination: process.env.NEXT_PUBLIC_RESUME_LINK,
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com']
  },
}
