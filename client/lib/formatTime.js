exports.fromMS = (num) => {
  const now = Date.now();
  const diff = num - now;
  if (diff < 0) return 'CLOSED';
  const hrs = Math.floor(diff / 3600000);
  let min = Math.floor((diff - hrs * 3600000) / 60000);
  min = `${min}`.length < 2 ? `0${min}` : `${min}`;
  let sec = Math.floor(((diff - hrs * 3600000) - min * 60000) / 1000);
  sec = `${sec}`.length < 2 ? `0${sec}` : `${sec}`;
  return `${hrs}:${min}:${sec}`;
};

exports.getLength = (str) => {
  let length = str.replace(/[^0-9]/g, '');
  length = length.split('');
  while (length[0] === '0') {
    length.shift();
  }
  length = length.join('');
  while (length.length < 4) {
    length = `0${length}`;
  }
  length = `${length.slice(0, length.length - 2)}:${length.slice(length.length - 2)}`;
  return length;
};
