const getTimeStamp = (input: string) => {
  const date = input.replace(/[^0-9]/g, "");
  let tempValue = "";
  if (date.length < 5) {
    tempValue = date;
  } else if (date.length >= 5 && date.length < 7) {
    tempValue = `${date.substr(0, 4)}-${date.substr(4)}`;
  } else if (date.length >= 7 && date.length < 8) {
    tempValue = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6)}`;
  } else {
    tempValue = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6, 2)}`;
  }
  return tempValue;
};
export default getTimeStamp;
