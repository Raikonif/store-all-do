export const withViewTransition = (callback: () => void) => {
  const doc = document as Document & {
    startViewTransition?: (updateCallback: () => void) => unknown;
  };

  if (typeof document !== "undefined" && doc.startViewTransition) {
    doc.startViewTransition(callback);
    return;
  }

  callback();
};
