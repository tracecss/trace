// Lightning CSS encodes versions as major << 16 | minor << 8 | patch.
export const browserTargets = {
  chrome: 123 << 16,
  edge: 123 << 16,
  firefox: 146 << 16,
  safari: (17 << 16) | (5 << 8),
  ios_saf: (17 << 16) | (5 << 8),
};
