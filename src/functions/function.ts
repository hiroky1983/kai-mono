export const makeId = () => {
  const S = "0123456789";
  const N = 16;
  const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  const fileName = randomChar;
  return parseInt(fileName);
};
