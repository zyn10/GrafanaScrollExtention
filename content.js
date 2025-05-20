(function () {
  console.log("[Grafana Auto-Scroller] Starting...");

  function waitForLayoutAndScroll() {
    const layout = document.querySelector(".react-grid-layout");
    if (!layout) {
      console.log("[Grafana Auto-Scroller] Waiting for layout...");
      setTimeout(waitForLayoutAndScroll, 1000);
      return;
    }

    let node = layout;
    while (node && node !== document.body) {
      const sh = node.scrollHeight;
      const ch = node.clientHeight;
      if (sh > ch) {
        console.log(
          "[Grafana Auto-Scroller] Scrollable container found:",
          node
        );

        function scrollLoop(container) {
          const max = container.scrollHeight - container.clientHeight;

          if (container.scrollTop < max) {
            container.scrollBy(0, 1);
            setTimeout(() => scrollLoop(container), 20);
          } else {
            setTimeout(() => {
              container.scrollTo({ top: 0, behavior: "smooth" });
            }, 3000);
            setTimeout(() => scrollLoop(container), 6000);
          }
        }

        scrollLoop(node);
        return;
      }
      node = node.parentElement;
    }

    console.warn("[Grafana Auto-Scroller] No scrollable container found.");
  }

  waitForLayoutAndScroll();
})();
