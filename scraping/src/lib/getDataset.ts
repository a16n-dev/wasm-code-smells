import { Repository } from '../db/model/Repository';

export const getDataset = async () => {
  const repos = await Repository.find({
    exclude: { $in: [false, undefined] },
  });

  const byLang = repos.filter((r) => {
    const langTotal: number = (r.languages || []).reduce(
      (acc, cur) => acc + (cur as any).size,
      0,
    ) as any;
    const cTotal = (
      (r.languages || []).find((l) => (l as any).name === 'C') as any
    )?.size;
    const cppTotal = (
      (r.languages || []).find((l) => (l as any).name === 'C++') as any
    )?.size;

    let valid = false;
    if (cTotal) {
      const cPercentTotal = (cTotal / langTotal) * 100;
      if (cPercentTotal > 50) {
        valid = true;
      }
    }
    if (cppTotal) {
      const cppPercentTotal = (cppTotal / langTotal) * 100;
      if (cppPercentTotal > 50) {
        valid = true;
      }
    }
    return valid;
  });

  console.log(
    `num with 0 stars: ${byLang.filter((r) => r.stars === 0).length} (${(
      (byLang.filter((r) => r.stars === 0).length / byLang.length) *
      100
    ).toFixed(0)}%)`,
  );

  console.log(byLang.length);
};
