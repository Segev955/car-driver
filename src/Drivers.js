import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { database } from "./firebase"; 
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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


  const sendNotification = async (fcmToken, title, body) => {
    const message = {
      token: fcmToken,
      title: title,
      body: body,
    };
  
    try {
      await axios.post("http://localhost:3000/send-notification", message, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification", error);
    }
  };



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

  // const handleRowClick = (id) => {
  //   navigate(`/driver/${id}`);
  // };

  // Example: calling the function after selecting a user
  const handleRowClick = (id) => {
    const selectedDriver = drivers.find(driver => driver.id === id);

    if (selectedDriver && selectedDriver.fcmtoken) {
      sendNotification(
        selectedDriver.fcmtoken, 
        "Your car on road", 
        "Please check your car"
      );
    } else {
      alert("FCM Token not available for this user");
    }
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
