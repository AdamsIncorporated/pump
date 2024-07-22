import React, { useEffect, useState } from 'react';

const Table = ({ activeSection }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (activeSection !== null) {
            const fetchData = async () => {
                try {
                    const response = await fetch("/api/read", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            exercise: activeSection,
                        }),
                    });
                    const result = await response.json();
                    setData(result.lifts);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        } else {
            setData([]);
        }
    }, [activeSection]);

    const formatDate = (dateString) => {
        const date = new Date(dateString.replace(" ", "T"));
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);

        return formattedDate;
    };

    return (
        <div className="relative mt-10 w-1/2">
            <table className="overflow-auto w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-left text-xs text-gray-400 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Create Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pounds
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">
                                {formatDate(item.create_date)}
                            </td>
                            <td className="px-6 py-4 font-medium text-center text-white whitespace-nowrap dark:text-white">
                                {item.pounds}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
