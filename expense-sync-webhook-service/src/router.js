// A router small enough to not need a framework: match method + path
// (with ":param" segments) against a list of registered routes.
export class Router {
  constructor() {
    this.routes = [];
  }

  add(method, pattern, handler) {
    const paramNames = [];
    const regexSource = pattern
      .split("/")
      .map((segment) => {
        if (segment.startsWith(":")) {
          paramNames.push(segment.slice(1));
          return "([^/]+)";
        }
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("/");
    this.routes.push({ method, regex: new RegExp(`^${regexSource}$`), paramNames, handler });
  }

  get(pattern, handler) {
    this.add("GET", pattern, handler);
  }

  post(pattern, handler) {
    this.add("POST", pattern, handler);
  }

  match(method, pathname) {
    for (const route of this.routes) {
      if (route.method !== method) continue;
      const match = route.regex.exec(pathname);
      if (!match) continue;
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      return { handler: route.handler, params };
    }
    return null;
  }
}
