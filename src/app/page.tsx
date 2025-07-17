"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Degree</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Specialties</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Years of Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Phone Number</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdvocates.map((advocate, index: number) => {
              return (
                <tr key={index} className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{advocate.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.degree}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {advocate.specialties.map((s, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-2xl text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {s}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.yearsOfExperience}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <a href={`tel:${advocate.phoneNumber}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {advocate.phoneNumber}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredAdvocates.map((advocate, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                {advocate.firstName} {advocate.lastName}
              </h3>
              <span className="text-sm text-gray-500">{advocate.yearsOfExperience} years</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">City:</span> {advocate.city}</p>
              <p><span className="font-medium">Degree:</span> {advocate.degree}</p>
              <p><span className="font-medium">Phone:</span>
                <a href={`tel:${advocate.phoneNumber}`} className="text-blue-600 hover:text-blue-800 ml-1">
                  {advocate.phoneNumber}
                </a>
              </p>
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
              <div className="flex flex-wrap gap-1">
                {advocate.specialties.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
