"use client";

import Navbar from "@/components/components/Navbar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [tables, setTables] = useState([]);
  const [selectedParam, setSelectedParam] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [params, setParams] = useState([]); // State for the parameters data
  const [data, setData] = useState([]); // State for the table data

  const { data: session } = useSession();

  // Fetch list of tables
  const fetchTables = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/get-tables`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();
      setTables(data);
      setSelectedParam(data[0]?.name); // Set default selection to the first table
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  // Fetch parameters for the selected table
  const fetchParams = async () => {
    if (selectedParam) {
      const url = `/api/get-data?dataTable=${selectedParam}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setParams(data); // Set fetched parameters to state
      } catch (error) {
        console.error("Error fetching params:", error);
      }
    }
  };

  // Fetch data for the selected table
  const fetchData = async () => {
    if (selectedParam) {
      const url = `/api/get-data?dataTable=${selectedData}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
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

  // Generalized function to render any table
  const renderTable = (tableData: any[]) => {
    if (tableData.length === 0) return <p>No data available</p>;

    const headers = Object.keys(tableData[0]);

    return (
      <table className="w-full bg-white border border-gray-200 mt-5">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border-b">
                {header.replace(/_/g, " ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: any, index: number) => (
            <tr key={index}>
              {headers.map((header, i) => (
                <td key={i} className="px-4 py-2 border-b text-center">
                  {row[header] !== undefined ? row[header] : ""}
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
        session?.user?.email || ""
      ) ? (
        <>
          <section className="px-40">
            <h2 className="text-3xl mb-5">Parameters</h2>
            <div className="bg-slate-200">
              <nav className="flex gap-5 bg-slate-300 overflow-x-scroll w-full">
                {tables
                  .filter((name: string) => name.includes("PARAMS"))
                  .map((table: string, index) => (
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
                  .map((table: string, index) => (
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
