// Module Start
// JS imports
import { ReportHandler, Metric } from 'web-vitals';
import TagManager from 'react-gtm-module';

// Web Vitals
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

/**
 * @description Web Vitals + app metrics
 * @author Luca Cattide
 * @date 2020-12-17
 * @param {Metric} metric
 */
function sendToGTM(metric: Metric): void {
  const { id, name, value }: Metric = metric;

  // Assumes the global `dataLayer` array exists, see:
  // https://developers.google.com/tag-manager/devguide
  TagManager.dataLayer({
    dataLayer: {
      event: 'web-vitals',
      event_category: 'Web Vitals',
      event_action: name,
      // Google Analytics metrics must be integers, so the value is rounded.
      // For CLS the value is first multiplied by 1000 for greater precision
      // (note: increase the multiplier for greater precision if needed).
      event_value: Math.round(name === 'CLS' ? value * 1000 : value),
      // The `id` value will be unique to the current page load. When sending
      // multiple values from the same page (e.g. for CLS), Google Analytics can
      // compute a total by grouping on this ID (note: requires `eventLabel` to
      // be a dimension in your report).
      event_label: id,
    },
  });
}

// Module export
export { sendToGTM, reportWebVitals };
// Module End
