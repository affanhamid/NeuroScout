"use client";

import Navbar from "@/components/components/Navbar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TableRow {
  [key: string]: any;
  id: number;
  inUse?: boolean;
}

interface TableData {
  name: string;
}

const Admin = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedParam, setSelectedParam] = useState<string>("");
  const [selectedData, setSelectedData] = useState<string>("");
  const [params, setParams] = useState<TableRow[]>([]); // State for the parameters data
  const [data, setData] = useState<TableRow[]>([]); // State for the table data
  const [newRow, setNewRow] = useState<Partial<TableRow>>({}); // State for new row data inputs

  const { data: session } = useSession();

  // Fetch list of tables
  const fetchTables = async (): Promise<void> => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/data/get-tables`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data: string[] = await response.json();
      setTables(data);
      setSelectedParam(data[0]);
      setTimeout(() => {
        fetchParams();
      }, 100);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  // Fetch parameters for the selected table
  const fetchParams = async (): Promise<void> => {
    if (selectedParam) {
      const url = `/api/data/get-data?dataTable=${selectedParam}`;
      try {
        const response = await fetch(url);
        const data: TableRow[] = await response.json();
        setParams(data); // Set fetched parameters to state
      } catch (error) {
        console.error("Error fetching params:", error);
      }
    }
  };

  // Fetch data for the selected table
  const fetchData = async (): Promise<void> => {
    if (selectedData) {
      const url = `/api/data/get-data?dataTable=${selectedData}`;
      try {
        const response = await fetch(url);
        const data: TableRow[] = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // Initial fetch of tables
  useEffect(() => {
    fetchTables();
  }, []);

  // Fetch parameters and data when selectedParam changes
  useEffect(() => {
    fetchParams();
  }, [selectedParam]);

  useEffect(() => {
    fetchData();
  }, [selectedData]);

  // Handle new row input changes
  const handleNewRowChange = (
    header: string,
    value: string | boolean,
  ): void => {
    setNewRow((prev) => ({
      ...prev,
      [header]: value,
    }));
  };

  // Function to add a new row
  const addNewRow = async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/params/add-params?table=${selectedParam}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        },
      );

      if (response.ok) {
        setTimeout(() => fetchParams(), 500); // Refresh parameters data without reloading
        setNewRow({}); // Clear new row input fields
      } else {
        console.error("Failed to add row");
      }
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const deleteParam = async (rowId: number): Promise<void> => {
    const activeInUseCount = params.filter((row) => row.inUse).length;
    const rowToDelete = params.find((row) => row.id === rowId);

    // Only delete if there's more than one row with `inUse: true` or if the row to delete is not `inUse`
    if (activeInUseCount > 1 || !rowToDelete?.inUse) {
      try {
        const response = await fetch(
          `/api/params/delete-param?table=${selectedParam}&id=${rowId}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          fetchParams(); // Refresh parameters data without reloading
        } else {
          console.error("Failed to delete param");
        }
      } catch (error) {
        console.error("Error deleting row:", error);
      }
    } else {
      alert("There must be at least one row with `inUse` set to true.");
    }
  };

  // Function to toggle "InUse" status in the database and update local state
  const toggleInUse = async (
    rowId: number,
    currentStatus: boolean,
  ): Promise<void> => {
    const activeInUseCount = params.filter((row) => row.inUse).length;

    // Prevent unchecking if it's the only row with `inUse: true`
    if (activeInUseCount === 1 && currentStatus) {
      alert("At least one row must have `inUse` active.");
      return;
    }

    try {
      const response = await fetch(
        `/api/params/update-in-use?table=${selectedParam}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inUse: !currentStatus, id: rowId }),
        },
      );

      if (response.ok) {
        fetchParams(); // Refresh parameters data without reloading
      } else {
        console.error("Failed to update inUse status");
      }
    } catch (error) {
      console.error("Error updating inUse status:", error);
    }
  };

  // Generalized function to render any table with editable checkboxes for "InUse"
  const renderTable = (tableData: TableRow[]): JSX.Element => {
    if (tableData.length === 0) return <p>No data available</p>;
    if (tableData[0] === undefined) return <p>No data available</p>;

    const headers = Object.keys(tableData[0]);

    return (
      <table className="w-full table-fixed bg-white border border-gray-200 mt-5">
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
                  className="px-4 py-2 border-b text-center whitespace-nowrap truncate"
                >
                  {header === "inUse" ? (
                    <input
                      type="checkbox"
                      checked={row[header]}
                      onChange={() =>
                        toggleInUse(row.id, row[header as keyof typeof row])
                      }
                      className="form-checkbox h-5 w-5 text-green-500"
                    />
                  ) : typeof row[header] === "boolean" ? (
                    row[header] ? (
                      "True"
                    ) : (
                      "False"
                    )
                  ) : row[header] !== undefined ? (
                    row[header]
                  ) : (
                    ""
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border-b text-center">
                <button
                  onClick={() => deleteParam(row.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  disabled={params.length === 1 && row.inUse}
                >
                  -
                </button>
              </td>
            </tr>
          ))}

          {/* Input row for new data */}
          <tr>
            <td className="px-4 py-2 border-b text-center"></td>
            {headers.slice(1, headers.length).map((header, i) => (
              <td key={i} className="px-4 py-2 border-b text-center">
                {header === "inUse" ? (
                  <input
                    type="checkbox"
                    checked={newRow[header] === true}
                    onChange={(e) =>
                      handleNewRowChange(header, e.target.checked)
                    }
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={newRow[header] || ""}
                    onChange={(e) => handleNewRowChange(header, e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                )}
              </td>
            ))}
            <td>
              <button
                onClick={addNewRow}
                className="px-4 py-2 bg-green-500 text-white"
              >
                +
              </button>
            </td>
          </tr>
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
            <h2 className="text-3xl mb-5">Parameters</h2>
            <div className="bg-slate-200">
              <nav className="flex gap-5 bg-slate-300 overflow-x-scroll w-full">
                {tables
                  .filter((name: string) => name.includes("PARAMS"))
                  .map((table: string, index: number) => (
                    <span
                      key={index}
                      className={`px-3 py-3 text-lg cursor-pointer whitespace-nowrap ${
                        selectedParam === table ? "bg-slate-900 text-white" : ""
                      }`}
                      onClick={() => setSelectedParam(table)}
                    >
                      {table
                        .replaceAll("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                  ))}
              </nav>
              {renderTable(params)}
            </div>
          </section>
          <section className="px-40 py-32">
            <h2 className="text-3xl mb-5">Data</h2>
            <div className="bg-slate-200">
              <nav className="flex gap-5 bg-slate-300 overflow-x-scroll w-full">
                {tables
                  .filter((name: string) => name.includes("DATA"))
                  .map((table: string, index: number) => (
                    <span
                      key={index}
                      className={`px-3 py-3 text-lg cursor-pointer whitespace-nowrap ${
                        selectedData === table ? "bg-slate-900 text-white" : ""
                      }`}
                      onClick={() => setSelectedData(table)}
                    >
                      {table
                        .replaceAll("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                  ))}
              </nav>
              {renderTable(data)}
            </div>
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
