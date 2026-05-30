"use client";

import { useEffect } from "react";
import { projectAssetUrls } from "../../lib/project-data";

const WARMUP_VERSION = "ran-works-media-warmup-v3";

export function AssetWarmup() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .catch((error) => {
          console.error("Gagal menonaktifkan service worker dev:", error);
        });
      return;
    }

    let cancelled = false;

    const warmMediaCache = async () => {
      const previousVersion = window.localStorage.getItem("ran-works-media-warmup-version");
      if (previousVersion === WARMUP_VERSION) {
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        const readyRegistration = await navigator.serviceWorker.ready;
        const worker =
          readyRegistration.active ||
          registration.active ||
          registration.waiting ||
          registration.installing;

        worker?.postMessage({
          type: "WARM_PROJECT_MEDIA",
          version: WARMUP_VERSION,
          assets: projectAssetUrls,
        });

        if (!cancelled) {
          window.localStorage.setItem("ran-works-media-warmup-version", WARMUP_VERSION);
        }
      } catch (error) {
        console.error("Warmup cache gagal:", error);
      }
    };

    if (document.readyState === "complete") {
      void warmMediaCache();
    } else {
      window.addEventListener("load", warmMediaCache, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", warmMediaCache);
    };
  }, []);

  return null;
}
