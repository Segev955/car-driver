import * as React from "react";
import { useTable } from "react-table";
import fakeData from "./data.json";

function Driver() {
    const data = React.useMemo(() => fakeData, [])
    const columns = React.useMemo(() => [
        {
        Header: "Time Stamp",
        accessor: "timestamp",
        },
        {
        Header: "Vehicle Speed",
        accessor: "vehicleSpeed",
        },
        {
        Header: "Engine RPM",
        accessor: "engineRPM",
        },
        {
        Header: "Throttle Position",
        accessor: "throttlePosition",
        },
        {
        Header: "Fuel Level",
        accessor: "fuelLevel",
        },
        {
        Header: "Coolant Temperature",
        accessor: "coolantTemperature",
        },
        {
        Header: "Odometer Reading",
        accessor: "odometerReading",
        },
        {
        Header: "Brake Status",
        accessor: "brakeStatus",
        },
        {
        Header: "Gear Position",
        accessor: "gearPosition",
        },
        {
        Header: "Accelerator Position",
        accessor: "acceleratorPosition",
        },
        {
        Header: "VIN",
        accessor: "VIN",
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