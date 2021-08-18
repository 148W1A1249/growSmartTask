import { useEffect ,useState} from "react";
import axios from 'axios';
import DeleteForm from './deleteForm'

function DeleteTab(props) {
    const [SingleData,SetSingleData] =  useState([])
    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(`https://607432b1066e7e0017e794b3.mockapi.io/growSmart/${props.match.params.id}`);
            SetSingleData(result.data);            
        }
        fetchData();
    },[props.match.params.id]);
    return <>
     <div className="">
         <DeleteForm data={SingleData} Person_id={props.match.params.id}/>
     </div>
    </>;
  }
  
export default DeleteTab;
  