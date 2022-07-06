export const wait = (s: number) =>
  new Promise((resolve) => {
    console.log(`waiting for ${s}s...`);
    setTimeout(resolve, s * 1000);
  });
