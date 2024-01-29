import * as React from "react";
import { useTable } from "react-table";
import drivers from "./data/drivers.json";

function Drivers() {
    const data = React.useMemo(() => drivers, [])
    const columns = React.useMemo(() => [
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

export default Drivers;