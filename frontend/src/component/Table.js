import React, { useEffect, useState } from 'react';

const Table = ({ activeSection }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (activeSection !== null) {
            const fetchData = async () => {
                try {
                    const url = new URL('/api/read/', window.location.origin);
                    url.searchParams.append('exercise', activeSection);

                    const response = await fetch(url);
                    const result = await response.json();
                    setData(result);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        } else {
            setData([]);
        }
    }, [activeSection]);

    return (
        <div className="relative overflow-auto mt-10 w-1/2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Pounds
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Create Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.pounds}
                            </th>
                            <td className="px-6 py-4">
                                {item.createDate}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
