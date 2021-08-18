import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function TableBody() {
    const [data,setdata] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get("https://607432b1066e7e0017e794b3.mockapi.io/growSmart");
            setdata([...result.data]);            
        }
        fetchData();
    },[]);
  return <>
   <div className="p-2 p-md-5" style={{overflowX:"auto"}}>   
    <h3 className="text-info text-center text-uppercase">table form <Link to="/add" className="btn btn-none text-info text-uppercase">Add(+)</Link></h3> 
        <table className="table table-info">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length>0 ? data.map((obj,ind)=>{
                        return <tr>
                                <th scope="row">{obj.id}</th>
                                <td>{obj.UserName}</td>
                                <td>{obj.Gender}</td>
                                <td>{obj.Email}</td>
                                <td>
                                    <Link to={`/update/${obj.id}`}><button className="btn btn-info mr-2 mt-2">Update</button></Link>
                                    <Link to={`/delete/${obj.id}`}><button className="btn btn-info mt-2">Delete</button></Link>
                                </td>
                            </tr>
                    }):"fetching Data....."
                }
               
            </tbody>
        </table>
   </div>
  </>;
}

export default TableBody;
