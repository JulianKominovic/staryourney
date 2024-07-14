import { getSnapshots, SnapshotModel } from "@/database/editor";
import { getDayOfWeek, getMonthName } from "@/lib/dates";

export async function getEntriesGrouppedByDate() {
  const entries = await getSnapshots();
  const groups: Record<
    number,
    Record<string, Record<string, SnapshotModel[]>>
  > = {};
  entries.forEach((entry) => {
    const date = new Date(entry.created_at);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = getMonthName(month);
    const day = date.getDate();
    const dayOfWeek = getDayOfWeek(date);
    const formattedDate = `${dayOfWeek} ${day}`;

    if (!groups[year]) {
      groups[year] = {};
    }
    if (!groups[year][monthName]) {
      groups[year][monthName] = {};
    }
    if (!groups[year][monthName][formattedDate]) {
      groups[year][monthName][formattedDate] = [];
    }
    groups[year][monthName][formattedDate].push(entry);
  });

  return groups;
}

export async function getEntriesTitles() {
  const entries = await getSnapshots();
  return entries.map((entry) => {
    return {
      id: entry.id,
      title: JSON.parse(entry.data)[0].content[0].text,
    };
  });
}
