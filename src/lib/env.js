const canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
);
const canUseWorkers = typeof Worker !== 'undefined';
const canUseEventListeners =
			canUseDOM && !!(window.addEventListener || window.attachEvent);
const canUseViewport = canUseDOM && !!window.screen;

export {
  canUseDOM,
  canUseWorkers,
  canUseEventListeners,
  canUseViewport,
};
