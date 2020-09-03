class PerfAnalyticsLibrary {
  constructor(options = {}) {
    if (!options.apiUrl) throw Error("apiUrl required");
    this.apiUrl = options.apiUrl;
  }

  init() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const performanceTiming = performance.getEntriesByType("navigation")[0];
        const paintTiming = performance.getEntriesByType("paint")[1];
        const ttfb =
            performanceTiming.responseStart - performanceTiming.requestStart;
        const fcp = paintTiming?.startTime;
        const domComplete = performanceTiming.domComplete;
        const windowLoad =
            performanceTiming.domContentLoadedEventEnd -
            performanceTiming.domContentLoadedEventStart;
        const analyticData = {
          ttfb,
          fcp,
          dom_load: domComplete,
          window_load: windowLoad,
        };

        this.sendAnalyticData(analyticData);
      }, 0);
    });
  }

  sendAnalyticData(analyticData) {
    fetch(this.apiUrl, {
      method: "PUT",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify(analyticData),
    }).then((response) => console.log(response.body));
  }
}

module.exports = PerfAnalyticsLibrary;
