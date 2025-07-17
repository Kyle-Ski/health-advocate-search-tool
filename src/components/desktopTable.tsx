export default function DesktopTable({ advocates }: { advocates: any[] }) {
    return (
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
                    {advocates.map((advocate, index: number) => (
                        <AdvocateTableRow
                            key={index}
                            advocate={advocate}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>
        </div>

    );
}

function AdvocateTableRow({ advocate, index }: { advocate: any, index: number }) {
    return (
        <tr key={index} className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{advocate.firstName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.lastName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.city}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{advocate.degree}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
                {advocate.specialties.map((s: any, index: number) => (
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
}