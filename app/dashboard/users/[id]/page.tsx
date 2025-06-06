import React from "react";
const page = ({params}: {params: {id: string}}) => {
  const { id } = params;_
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default page;