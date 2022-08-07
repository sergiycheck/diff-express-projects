export default function findPrimesFaster(start: number, end: number) {
  if (!end && !Number.isInteger(end) && end < 2)
    throw new Error('Please enter an integer greater than two');

  let record = [];
  let primes = [2];
  let max = Math.sqrt(end);

  for (let number = 0; number < end; number++) {
    record.push(1);
  }

  for (let prime = start; prime <= max; prime += 2) {
    if (record[prime]) {
      for (
        let multiple = prime * prime;
        multiple < end;
        multiple += prime + 2
      ) {
        record[multiple] = 0;
      }
    }
  }

  for (let sievedNumber = start; sievedNumber < end; sievedNumber += 2) {
    if (record[sievedNumber]) {
      primes.push(sievedNumber);
    }
  }
  return primes;
}
