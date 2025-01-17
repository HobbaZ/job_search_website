//Format Date for readability

const DateFormatter = ({ date }) => {
  const today = new Date();
  const jobPosted = new Date(date);
  let dateDifference = today - jobPosted;
  let dayDifference = dateDifference / (1000 * 60 * 60 * 24);

  if (dayDifference > 1) {
    return dayDifference.toFixed(0) + " days ago";
  } else if (dayDifference === 1) {
    return dayDifference.toFixed(0) + " day ago";
  } else {
    return "Today";
  }
};

export default DateFormatter;
