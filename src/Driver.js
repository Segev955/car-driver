import * as React from "react";
import { useTable } from "react-table";
import fakeData from "./data/data.json";

function Driver() {
    const data = React.useMemo(() => fakeData, [])
    const columns = React.useMemo(() => [
        {
        Header: "Date & Time",
        accessor: "datetime",
        },
        {
        Header: "Vehicle Speed",
        accessor: "vehicleSpeed",
        },
        {
        Header: "Temperature",
        accessor: "temperature",
        },
        {
        Header: "Throttle Position",
        accessor: "throttle",
        },
        {
        Header: "Fuel Level",
        accessor: "fuel",
        },
        {
        Header: "Coolant Temperature",
        accessor: "coolantTemperature",
        },
        {
        Header: "Acceleration",
        accessor: "acceleration",
        },
        {
        Header: "Speed Limit",
        accessor: "speedLimit",
        },
    ],
  []
);

const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});
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

export default Driver;