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
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/solace.svg"
            alt="Solace Logo"
            className="h-14 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900 font-cormorant">Solace Advocates</h1>
        </div>
        <br />
        <br />
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Advocates
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={onChange}
                placeholder="Search by name, city, degree, or specialty..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 transition-colors"
                onFocus={(e) => e.target.style.borderColor = '#265b4e'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <button
              onClick={onClick}
              className="px-4 py-2 text-white rounded-md hover:opacity-90 focus:ring-2 focus:ring-offset-2 transition-colors whitespace-nowrap"
              style={{ backgroundColor: '#265b4e' }}
            >
              Reset Search
            </button>
          </div>

          {searchTerm && (
            <p className="mt-3 text-sm text-gray-600">
              Searching for: <span className="font-medium" style={{ color: '#265b4e' }}>"{searchTerm}"</span>
            </p>
          )}
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
