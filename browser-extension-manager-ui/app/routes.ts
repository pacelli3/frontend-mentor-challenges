import {index, layout, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    layout("layouts/layout.tsx", [
        index("routes/home.tsx"),
        route("/details/:extensionId", "routes/extension-details.tsx"),
    ]),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
