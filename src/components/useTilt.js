import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

export function useTilt(ref, options) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return; // disable on touch devices
    VanillaTilt.init(node, options);
    return () => {
      try {
        node.vanillaTilt?.destroy();
      } catch {}
    };
  }, [ref, options]);
}

