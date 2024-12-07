import { DateFormatter } from "./DateFormatter";

//  Test for Dates Less Than 7 Days Ago
test("returns relative time for dates less than 7 days ago", () => {
    const mockDate = new Date("2024-12-07T12:00:00Z"); // Mock today's date
    jest.useFakeTimers().setSystemTime(mockDate);
  
    const postedTime = "2024-12-03T12:00:00Z"; // 4 days ago
    const result = DateFormatter(postedTime);
  
    expect(result).toBe("4 days ago");
    jest.useRealTimers();
  });

//   Test for Dates Between 7 Days and 1 Year Ago
  test("returns 'dd MMM' format for dates between 7 days and 1 year ago", () => {
    const mockDate = new Date("2024-12-07T12:00:00Z"); // Mock today's date
    jest.useFakeTimers().setSystemTime(mockDate);
  
    const postedTime = "2024-05-15T12:00:00Z"; // A date in the same year
    const result = DateFormatter(postedTime);
  
    expect(result).toBe("15 May");
    jest.useRealTimers();
  });


// Test for Dates Older Than 1 Year
  test("returns 'dd MMM, yyyy' format for dates older than 1 year", () => {
    const mockDate = new Date("2024-12-07T12:00:00Z"); // Mock today's date
    jest.useFakeTimers().setSystemTime(mockDate);
  
    const postedTime = "2020-05-15T12:00:00Z"; // Older than 1 year
    const result = DateFormatter(postedTime);
  
    expect(result).toBe("15 May, 2020");
    jest.useRealTimers();
  });
  
  