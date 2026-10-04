import { onRequestGet as __api_vc_video__slug___file__js_onRequestGet } from "/private/tmp/st/functions/api/vc/video/[slug]/[file].js"
import { onRequestGet as __api_vc_unlock_js_onRequestGet } from "/private/tmp/st/functions/api/vc/unlock.js"
import { onRequestPost as __api_vc_unlock_js_onRequestPost } from "/private/tmp/st/functions/api/vc/unlock.js"
import { onRequestOptions as __api_redeem_course_js_onRequestOptions } from "/private/tmp/st/functions/api/redeem-course.js"
import { onRequestPost as __api_redeem_course_js_onRequestPost } from "/private/tmp/st/functions/api/redeem-course.js"
import { onRequestOptions as __api_subscribe_js_onRequestOptions } from "/private/tmp/st/functions/api/subscribe.js"
import { onRequestPost as __api_subscribe_js_onRequestPost } from "/private/tmp/st/functions/api/subscribe.js"
import { onRequest as __api_lists_js_onRequest } from "/private/tmp/st/functions/api/lists.js"
import { onRequest as ___middleware_js_onRequest } from "/private/tmp/st/functions/_middleware.js"

export const routes = [
    {
      routePath: "/api/vc/video/:slug/:file",
      mountPath: "/api/vc/video/:slug",
      method: "GET",
      middlewares: [],
      modules: [__api_vc_video__slug___file__js_onRequestGet],
    },
  {
      routePath: "/api/vc/unlock",
      mountPath: "/api/vc",
      method: "GET",
      middlewares: [],
      modules: [__api_vc_unlock_js_onRequestGet],
    },
  {
      routePath: "/api/vc/unlock",
      mountPath: "/api/vc",
      method: "POST",
      middlewares: [],
      modules: [__api_vc_unlock_js_onRequestPost],
    },
  {
      routePath: "/api/redeem-course",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_redeem_course_js_onRequestOptions],
    },
  {
      routePath: "/api/redeem-course",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_redeem_course_js_onRequestPost],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_subscribe_js_onRequestOptions],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_subscribe_js_onRequestPost],
    },
  {
      routePath: "/api/lists",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_lists_js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]