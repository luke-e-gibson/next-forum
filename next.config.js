/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        dynamicIO: true,
        cacheLife: {
            functions: {
                stale: 60 * 2, // 2min
                revalidate: 30, // 30s
                expire: 86400, //1day
            },
            functionsComments: {
                stale: 60 * 2, // 2min
                revalidate: 30, // 30s
                expire: 86400, //1day
            },
            pages: {
                stale: 60 * 4, // 2min
                revalidate: 30, // 30s
                expire: 86400 * 2, //1day
            }
        }
    }
};

export default config;
