export default function MobileTable({ advocates }: { advocates: any[] }) {
    return (
        <div className="md:hidden space-y-4">
            {advocates.map((advocate, index) => (
                <div
                    key={`${advocate.firstName}-${advocate.lastName}-${index}`}
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
                            {advocate.specialties.map((s: any, specialtyIndex: number) => (
                                <span
                                    key={`${advocate.firstName}-${advocate.lastName}-${s}-${specialtyIndex}`}
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
    )
}