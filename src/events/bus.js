export const bus = {
  on(type, handler) {
    window.addEventListener(type, handler);
    return () => window.removeEventListener(type, handler);
  },
  emit(type, detail) {
    window.dispatchEvent(new CustomEvent(type, { detail }));
  },
};
