import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { database } from "./firebase"; 
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  const [columns] = useState([
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Car Type",
      accessor: "carType",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ]);

  useEffect(() => {
    const fetchData = () => {
      const usersRef = ref(database, 'Users');
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const driversList = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setDrivers(driversList);
      });
    };

    fetchData();
  }, []);

  const tableInstance = useTable({ columns, data: drivers });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const handleRowClick = (id) => {
    navigate(`/driver/${id}`);
  };

  return (
    <div className="container mt">
      <h2 className="text-center mb-4">Drivers</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover" {...getTableProps()}>
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(row.original.id)}
                  style={{ cursor: "pointer" }}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
