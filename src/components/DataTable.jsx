import React, { useEffect, useRef, useState } from "react";

const DataTable = () => {
  const [inputData, setInputData] = useState({ name: "", gender: "", age: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState();
  const [searchterm, setSearchTerm] = useState("");
  const outsideClick = useRef(false);

  const filteredData = data.filter((item)=>(item.name.toLowerCase().includes(searchterm.toLowerCase())));

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (inputData.name && inputData.gender && inputData.age) {
      const newItem = {
        id: Date.now(),
        name: inputData.name,
        gender: inputData.gender,
        age: inputData.age,
      };
      setData([...data, newItem]);
      setInputData({ name: "", gender: "", age: "" });
    } else {
      console.error("Please fill all details");
    }
  };

  const handleDelete = (id) => {
    const updatedList = data.filter((item)=> item.id !== id)
    setData(updatedList)
  }

  useEffect(() => {
    if (!editId) return;

    // let selectedItem = document.getElementById(editId);
    let selectedItem = document.querySelectorAll(`[id="${editId}"]`);
    selectedItem[0].focus();
  
  }, [editId])
  
  const handleEdit =  (id , updatedData)=> {
    if(!editId && editId !== id) return ;

    const updatedList = data.map((item)=>(item.id === id ? {...item , ...updatedData} : {...item}))
    setData(updatedList);
  }

  useEffect(() => {
    const handleClick = (e)=>{
      if(outsideClick.current && !outsideClick.current.contains(e.target)){
        setEditId(false)
      }
    }

    document.addEventListener("click", handleClick);
  
    return () => {
      document.removeEventListener("click",handleClick)
    }
  }, [])
  
  console.log(data);
  return (
    <div className="container">
      <div className="info-container">
        <div className="add-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={inputData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={inputData.gender}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={inputData.age}
            onChange={handleChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          Add
        </button>
      </div>
      <div className="data-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchterm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
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
            {filteredData.map((item) => (
              <tr key={item.id} ref={outsideClick}>
                <td id={item.id} contentEditable = {editId === item.id} onBlur={(e)=>{handleEdit(item.id ,{name : e.target.innerText })}} >{item.name}</td>
                <td id={item.id} contentEditable = {editId === item.id} onBlur={(e)=>{handleEdit(item.id ,{gender : e.target.innerText })}}>{item.gender}</td>
                <td id={item.id} contentEditable = {editId === item.id} onBlur={(e)=>{handleEdit(item.id ,{age : e.target.innerText })}}>{item.age}</td>
                <td className="action">
                  <button className="edit" onClick={()=>setEditId(item.id)}>edit</button>
                  <button className="delete" onClick={()=> handleDelete(item.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">pagination</div>
      </div>
    </div>
  );
};

export default DataTable;
