"use client";

import Navbar from "../../components/components/Navbar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TableRow {
  [key: string]: any;
  id: number;
  inUse?: boolean;
}

const Admin = () => {
  const [data, setData] = useState<TableRow[]>([]); // State for the table data

  const { data: session } = useSession();

  // Fetch data for the selected table
  const fetchData = async (): Promise<void> => {
    const url = `/api/data/get-data`;
    try {
      const response = await fetch(url);
      const result: TableRow[] = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = (tableData: TableRow[]): JSX.Element => {
    if (tableData.length === 0) return <p>No data available</p>;
    if (tableData[0] === undefined) return <p>No data available</p>;

    const headers = Array.from(
      tableData.reduce((set, row) => {
        Object.keys(row).forEach((key) => set.add(key));
        return set;
      }, new Set()),
    );

    return (
      <table className="table-fixed bg-white border border-gray-200 mt-5">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border-b">
                {header.replace(/_/g, " ")}
              </th>
            ))}
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {headers.map((header, i) => (
                <td
                  key={i}
                  className="px-4 py-2 border-b  whitespace-nowrap truncate"
                >
                  {Array.isArray(row[header])
                    ? row[header].join(",")
                    : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <main className="py-32">
      <Navbar />
      {["affanhamid007@gmail.com", "zainmirza1008@gmail.com"].includes(
        session?.user?.email || "",
      ) ? (
        <>
          <section className="px-40">
            <h2 className="text-3xl mb-5">Data</h2>
            {renderTable(data)}
          </section>
        </>
      ) : (
        <div className="text-3xl text-red-500 text-center">
          You are not authorized for this route
        </div>
      )}
    </main>
  );
};

export default Admin;
