export function selectPicturesForModal(data) {
  // console.log(data.images);
  // data.images.map(elem => console.log(elem));
  let arr = data.images
    .filter(array => {
      if (array.ratio === '3_2') return true;
      return false;
    })
    .sort((a, b) => {
      if (b.width > a.width) return 1;
      return -1;
    });
  //   console.log(arr);
  return arr;
}
