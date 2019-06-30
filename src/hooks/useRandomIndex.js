import {useState, useEffect} from 'react';

/**
 * Creates an array with the given length. Each value will correspond to their
 * position in the array:
 *
 * length = 5 returns [0, 1, 2, 3, 4]
 *
 * @param {number} length The length of the array
 */
const initArray = length => [...new Array(length)].map((v, i) => i);

/**
 * Maintains an array of indexes. Randomly removing and returning index until
 * there are no more items, then it resets to the initial full array, cycling
 * indefinitely.
 *
 * This hook is used in the practice screen to display a random, non-repeating
 * sequence of words for the user. Avoiding the case where a word would take a
 * lot of time to show up in a training session.
 *
 * @param {number} length The length of the array
 */
const useRandomIndex = length => {
  const [indexList, setIndexList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const indexes = initArray(length);

    const index = Math.floor(Math.random() * indexes.length);
    setCurrentIndex(indexes[index]);
    setIndexList([...indexes.slice(0, index), ...indexes.slice(index + 1)]);
  }, [length]);

  const toNextIndex = () => {
    const indexes = indexList.length > 0 ? indexList : initArray(length);

    const index = Math.floor(Math.random() * indexes.length);
    const nextIndex = indexes[index];

    setCurrentIndex(nextIndex);
    setIndexList([...indexes.slice(0, index), ...indexes.slice(index + 1)]);

    return nextIndex;
  };

  return {currentIndex, toNextIndex};
};

export default useRandomIndex;
