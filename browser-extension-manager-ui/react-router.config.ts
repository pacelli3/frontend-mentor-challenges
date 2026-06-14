import type {Config} from "@react-router/dev/config";

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: true,
    future: {
        v8_middleware: true,
        v8_passThroughRequests: true,
        v8_splitRouteModules: true,
        v8_trailingSlashAwareDataRequests: true,

        // Not supported by Netlify, setting it to `true` prevents the creation of Functions on the build step
        v8_viteEnvironmentApi: false,
    },
} satisfies Config;
