/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(glsl|vfx|ffx)$/,
            use: ['raw-loader', 'glslify-loader'],
        });
        return config;
    },
    eslint: {
        "ignoreDuringBuilds": true
    },
    typescript: {
        "ignoreBuildErrors": true,
    }
}

module.exports = nextConfig
