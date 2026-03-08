export const withViewTransition = (callback: () => void) => {
  const startViewTransition = (
    document as Document & {
      startViewTransition?: (updateCallback: () => void) => unknown;
    }
  ).startViewTransition;

  if (typeof document !== "undefined" && startViewTransition) {
    startViewTransition(callback);
    return;
  }

  callback();
};
