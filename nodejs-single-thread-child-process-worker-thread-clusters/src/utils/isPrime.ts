export function isPrime(n: number) {
  if (n <= 1) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

export function isPrimeEffective(n: number) {
  if (n <= 1) return false;
  if (n == 2 || n == 3) return true;
  if (n % 2 == 0 || n % 3 == 0) return false;

  const nextPrimeIterator = 6;
  const firstPrimeAfterChecks = 5;
  for (
    let i = firstPrimeAfterChecks;
    i <= Math.sqrt(n);
    i = i + nextPrimeIterator
  ) {
    const closePrime = i + 2;
    if (n % i == 0 || n % closePrime == 0) return false;
  }

  return true;
}
