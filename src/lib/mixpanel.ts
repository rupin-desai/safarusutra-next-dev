import mixpanel from "mixpanel-browser";

const DEFAULT_MIXPANEL_TOKEN = "083f66e3d7d2aa4459f42b3b203f133d";

export const initMixpanel = (token?: string) => {
  const t = token ?? DEFAULT_MIXPANEL_TOKEN;
  if (!t) return;
  try {
    mixpanel.init(t, { debug: process.env.NODE_ENV === "development" });
  } catch {}
};

export const track = (event: string, props?: Record<string, unknown>) => {
  try {
    mixpanel.track(event, props);
  } catch {}
};

export const identify = (id?: string) => {
  try {
    if (id) mixpanel.identify(id);
  } catch {}
};

export default mixpanel;