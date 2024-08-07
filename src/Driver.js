import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { storage, database } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { ref as dbRef, get } from "firebase/database";

function Driver() {
  const { id } = useParams(); // Get the driver ID from the URL
  const [fileList, setFileList] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Reference to the user's data in Firebase Realtime Database
        const userRef = dbRef(database, `Users/${id}/fullName`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUsername(snapshot.val());
        } else {
          console.log("No data available for user");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    const fetchFileList = async () => {
      try {
        // Reference to the driver's directory in Firebase Storage
        const filesRef = ref(storage, `drives/${id}`);

        // List all files in the directory
        const fileListResult = await listAll(filesRef);

        // Get download URLs for each file
        const fileDetails = await Promise.all(
          fileListResult.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              name: item.name,
              url,
            };
          })
        );

        setFileList(fileDetails);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchUsername();
    fetchFileList();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Files for {username}</h2>
      <ul className="list-group">
        {fileList.map((file) => (
          <li className="list-group-item" key={file.name}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Driver;
