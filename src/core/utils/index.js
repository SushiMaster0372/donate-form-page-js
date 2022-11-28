import moment from "moment";

export const calculateSumOfNumbers = (numbers) => {
  const sumOfNumbers = numbers.reduce((acc, number) => {
    return acc + number;
  }, 0);
  return sumOfNumbers;
};

export const getFormattedTime = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};
