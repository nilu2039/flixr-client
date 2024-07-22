export const byteToMb = (bytes: number) => {
  if (!bytes) return 0;
  const res = bytes / (1024 * 1024);
  return res.toFixed(2);
};
