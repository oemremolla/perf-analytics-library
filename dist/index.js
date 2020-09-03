"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var PerfAnalyticsLibrary = /*#__PURE__*/function () {
  function PerfAnalyticsLibrary() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, PerfAnalyticsLibrary);
    if (!options.apiUrl) throw Error("apiUrl required");
    this.apiUrl = options.apiUrl;
  }

  (0, _createClass2["default"])(PerfAnalyticsLibrary, [{
    key: "init",
    value: function init() {
      var _this = this;

      window.addEventListener("load", function () {
        setTimeout(function () {
          var performanceTiming = performance.getEntriesByType("navigation")[0];
          var paintTiming = performance.getEntriesByType("paint")[1];
          var ttfb = performanceTiming.responseStart - performanceTiming.requestStart;
          var fcp = paintTiming === null || paintTiming === void 0 ? void 0 : paintTiming.startTime;
          var domComplete = performanceTiming.domComplete;
          var windowLoad = performanceTiming.domContentLoadedEventEnd - performanceTiming.domContentLoadedEventStart;
          var analyticData = {
            ttfb: ttfb,
            fcp: fcp,
            dom_load: domComplete,
            window_load: windowLoad
          };

          _this.sendAnalyticData(analyticData);
        }, 0);
      });
    }
  }, {
    key: "sendAnalyticData",
    value: function sendAnalyticData(analyticData) {
      fetch(this.apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(analyticData)
      }).then(function (response) {
        return console.log(response.body);
      });
    }
  }]);
  return PerfAnalyticsLibrary;
}();

module.exports = PerfAnalyticsLibrary;