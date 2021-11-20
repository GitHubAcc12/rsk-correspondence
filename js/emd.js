export default function computeEmd(distr1, distr2) {
  const dif = distr1.map((n, i) => n - distr2[i]);
  let result = 0;
  for (let i = 1; i < dif.length; ++i) {
    // sum dif elements up to i
    let sum0ToI = dif.slice(0, i).reduce((a, b) => a + b);
    result += Math.abs(sum0ToI);
  }
  return result;
}
