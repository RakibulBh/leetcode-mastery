import { JournalEntry } from "@/types/journal";

const BASE_URL = "http://localhost:8080";

type JournalEntryResponse = {
  error: boolean;
  message: string;
  data: JournalEntry[];
};
export const getJournalEntries = async (): Promise<JournalEntryResponse> => {
  const response = await fetch(`${BASE_URL}/journal`);
  const data = await response.json();

  console.log(data);

  return {
    error: data.error,
    message: data.message,
    data: data.data,
  };
};

export const addJournalEntry = async (entry: JournalEntry) => {
  const response = await fetch(`${BASE_URL}/journal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
};
