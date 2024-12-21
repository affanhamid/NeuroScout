import React from "react";

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data" + response);
  }
  return response.json();
}

type DataProviderProps<TData> = {
  endpoint: string;
  children: (data: TData) => React.ReactNode;
};

export default async function DataProvider<TData>({
  endpoint,
  children
}: DataProviderProps<TData>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const data = await fetchData<{ data: TData }>(`${baseUrl}/api/${endpoint}`);

  return <>{children(data.data)}</>;
}
