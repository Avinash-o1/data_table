import React from "react";

const DataTable = () => {
  return (
    <div className="container">
      <div className="info-container">
        <div className="add-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={""}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={""}
            onChange={() => {}}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={""}
            onChange={() => {}}
          />
        </div>
        <button className="add">Add</button>
      </div>
      <div className="data-container">      
        <input
          type="text"
          placeholder="Search by name"
          value={""}
          onChange={() => {}}
          className="search-input"
        />
        <table>           
          <thead>
            <tr>
              <th>NAME</th>
              <th>GENDER</th>
              <th>AGE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>john</td>
              <td>male</td>
              <td>23</td>
              <td className="action">
                <button className="edit">edit</button>
                <button className="delete">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="pagination">pagination</div>
      </div>
    </div>
  );
};

export default DataTable;
