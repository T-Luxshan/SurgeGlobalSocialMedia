import { format, formatDistanceToNow, parseISO } from "date-fns";

export const DateFormatter = (postedTime) => {
  const parsedDate = parseISO(postedTime);

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
  ); // 1 year ago

  if (parsedDate > sevenDaysAgo) {
    // Less than 7 days ago: show relative time
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } else if (parsedDate > oneYearAgo) {
    // Between 7 days and 1 year ago: show "30 May" format
    return format(parsedDate, "dd MMM");
  } else {
    // More than 1 year ago: show "30 May, 2020" format
    return format(parsedDate, "dd MMM, yyyy");
  }
};
