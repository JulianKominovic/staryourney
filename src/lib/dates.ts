export function getMonthName(month: number) {
  return new Date(2021, month).toLocaleString("default", { month: "long" });
}
export function getDayOfWeek(date: Date) {
  return date.toLocaleString("default", { weekday: "long" });
}

// example: const mydate = getRelativeTime('Sat Apr 02 2022 14:00:00 GMT');
// console.log(getRelativeTime(mydate);
// output: 4 hr. ago
// (while current time is 18:00)

export const getRelativeTime = (date: Date): string => {
  const unix = date.getTime();

  type Periods = [string, number][];
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  const periods = [
    ["minute", minute],
    ["hour", hour],
    ["day", day],
    ["week", week],
    ["month", month],
    ["year", year],
  ] as Periods;

  const now = new Date().getTime();
  let diff = now - unix;
  let output_period: [Intl.RelativeTimeFormatUnit, number] = ["second", 1];

  for (const [unit, period] of periods) {
    if (diff < period) {
      break;
    }
    output_period = [unit, period] as [Intl.RelativeTimeFormatUnit, number];
  }
  diff = Math.round(diff / output_period[1]);

  const rtf = new Intl.RelativeTimeFormat("en", {
    style: "narrow",
    numeric: "auto",
  });
  return rtf.format(-diff, output_period[0]);
};
