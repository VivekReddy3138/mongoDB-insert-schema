import logo from './logo.svg';
import './App.css';
import{useState} from "react";

function App() {

  let[students,setStudents] = useState([]);

let getStudentsFromServer = async ()=>{
  let reqOptions = {
    method: "GET"
  }

  let JSONData = await fetch("http://localhost:1234/getStudents",reqOptions);

  let JSOData = await JSONData.json();
   
  setStudents(JSOData);

  console.log(JSOData)
}


return (
    <div className="App">
     <button onClick = {()=>{
      getStudentsFromServer();
     }}>Get Students</button>
     {students.map((ele,i)=>{
     return <h1 key = {i}>{ele.firstName}{" "}{ele.lastName}</h1>
     })}
    </div>
  );
}

export default App;
