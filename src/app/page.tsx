"use client";

import DesktopTable from "@/components/desktopTable";
import MobileTable from "@/components/mobileTable";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      const searchLower = inputValue.toLowerCase();
      const yearsString = advocate.yearsOfExperience?.toString() || '';
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty: string) =>
          specialty.toLowerCase().includes(searchLower)
        ) ||
        yearsString.includes(searchLower)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Solace Advocates</h1>
        <br />
        <br />
        <div>
          <p>Search</p>
          <p>
            Searching for: <span id="search-term">{searchTerm}</span>
          </p>
          <input
            style={{ border: "1px solid black" }}
            onChange={onChange}
            value={searchTerm}
          />
          <button onClick={onClick}>Reset Search</button>
        </div>
        <br />
        <br />
      </div>
      {/* Desktop Table */}
      <DesktopTable advocates={filteredAdvocates} />

      {/* Mobile Cards */}
      <MobileTable advocates={filteredAdvocates} />
    </main>
  );
}
