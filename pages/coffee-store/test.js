let yeller = (words) => {
  let yelledArr = [];
  words.forEach((word) => {
    yelledArr.push(word.toUpperCase() + '!');
  })
  return yelledArr;
}
