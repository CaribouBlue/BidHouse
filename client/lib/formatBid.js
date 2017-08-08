module.exports = (bid, format = 'str') => {
  let counter = 0;
  bid = `${bid}`.replace(/[^0-9]/g, '');
  return format === 'str' ?
    `$${
      bid
        .split('')
        .reduceRight((str, num) => {
          const val = counter % 3 === 0 && counter !== 0 ?
            `${num},${str}`
            : `${num}${str}`;
          counter += 1;
          return val;
        }, '')
    }`
    : Number(bid);
};
