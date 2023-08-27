/** @type {import('next').NextConfig} */

// Notes:
// 1. IgnoreBuildErrors could be set to false, although i noticed some
//    desync between the IDE and the typescript versions even though it
//    ought to be using the npm library's one.

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
