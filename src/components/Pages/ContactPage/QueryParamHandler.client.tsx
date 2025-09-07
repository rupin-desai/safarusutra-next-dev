"use client";

import { useEffect } from "react";

/**
 * Reads ?subject=...&message=... from location.search and copies values into
 * localStorage keys used by ContactCard:
 *  - contactFormSubject
 *  - contactFormMessage
 *  - scrollToContactForm = "true"
 *  - contactFormScrollBehavior = "smooth"
 *
 * Then removes the query params from the URL (history.replaceState) to keep UX clean.
 */
export default function QueryParamHandler(): null {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const search = window.location.search;
      if (!search) return;

      const params = new URLSearchParams(search);
      const subject = params.get("subject") ?? params.get("Subject");
      const message = params.get("message") ?? params.get("Message");

      if (subject || message) {
        if (subject != null) localStorage.setItem("contactFormSubject", decodeURIComponent(subject));
        if (message != null) localStorage.setItem("contactFormMessage", decodeURIComponent(message));
        // flag the contact form to scroll-to on mount
        localStorage.setItem("scrollToContactForm", "true");
        localStorage.setItem("contactFormScrollBehavior", "smooth");

        // remove the subject/message params from the URL without causing a navigation
        const url = new URL(window.location.href);
        params.delete("subject");
        params.delete("message");
        // keep other params intact
        url.search = params.toString();
        window.history.replaceState({}, document.title, url.toString());
      }
    } catch (e) {
      console.warn("QueryParamHandler: failed to read query params", e);
    }
  }, []);

  return null;
}