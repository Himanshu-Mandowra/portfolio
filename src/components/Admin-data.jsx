import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/admin-data');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name} - {item.email} - {item.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
