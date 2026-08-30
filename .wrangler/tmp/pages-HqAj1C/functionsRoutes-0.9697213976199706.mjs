import { onRequestOptions as __api_chat_ts_onRequestOptions } from "C:\\Users\\user\\Documents\\GitHub\\neurora-website-footer-experiment\\functions\\api\\chat.ts"
import { onRequestPost as __api_chat_ts_onRequestPost } from "C:\\Users\\user\\Documents\\GitHub\\neurora-website-footer-experiment\\functions\\api\\chat.ts"
import { onRequestPost as __api_contact_ts_onRequestPost } from "C:\\Users\\user\\Documents\\GitHub\\neurora-website-footer-experiment\\functions\\api\\contact.ts"

export const routes = [
    {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_chat_ts_onRequestOptions],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_ts_onRequestPost],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  ]