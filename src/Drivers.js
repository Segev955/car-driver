import * as React from "react";
import { useEffect, useState } from "react"
import { useTable } from "react-table";

const Drivers = () => {
    const [drivers, setDrivers] = useState(null);
    
    const [columns] = useState([
        {
            Header: "Full Name",
            accessor: "fullName",
        },
        {
            Header: "Age",
            accessor: "age",
        },
        {
            Header: "Car Type",
            accessor: "carType",
        },
        {
            Header: "Car Year",
            accessor: "carYear",
        },
    ]);

    useEffect(() => {
        fetch('http://localhost:8000/drivers')
        .then(res => res.json())
        .then(data => {
            setDrivers(data);
        })
    }, [])

    // Call useTable unconditionally at the top level of your component
    const tableInstance = useTable({ columns, data: drivers || [] });

    if (!drivers) {
        return null;
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="container">
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                        ))}
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Drivers;
