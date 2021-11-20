export default function computeEmd(distr1, distr2) {
  if (distr1.length > distr2.length) {
    makeArraysEqualLength(distr1, distr2);
  } else if (distr2.length > distr1.length) {
    makeArraysEqualLength(distr2, distr1);
  }
  const dif = distr1.map((n, i) => n - distr2[i]);
  let result = 0;
  for (let i = 1; i < dif.length; ++i) {
    // sum dif elements up to i
    let sum0ToI = dif.slice(0, i).reduce((a, b) => a + b);
    result += Math.abs(sum0ToI);
  }
  return result;
}

function makeArraysEqualLength(longer, shorter) {
  for (let i = shorter.length; i < longer.length; ++i) {
    shorter.push(0);
  }
}
