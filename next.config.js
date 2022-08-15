/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || null,
    PKG_VERSION: require("./package.json").version,
    BASE_URL: process.env.IS_TAURI ? "https://tooling.one" : "",
  },
  webpack(config, { dev, isServer }) {
    config.experiments = config.experiments || {}
    Object.assign(config.experiments, {
      asyncWebAssembly: true,
    })

    return config
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          // enable cors
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
