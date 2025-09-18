import { useState } from "react"
import { addNewProject } from "../api/projectApi";
import { useNavigate } from "react-router-dom";
import '../style/addproject.css'

const AddProject = () => {
    const [title, setTitle] = useState('');
    const[membersInput, setMembersInput] = useState("")
    const [members, setMembers] = useState([]);
    const [status, setStatus] = useState('running')
    const navigate  = useNavigate();

   const handleMembersChange=(e)=>{
        const value = e.target.value;
        setMembersInput(value);
        setMembers(
            value.split(",").map((m)=>m.trim()).filter((m)=>m!=="")
        );
   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addNewProject({ title, members, status });
            if (result.success) {
                console.log("Added Successfully")
                setTitle('');
                setMembers([]);
                setMembersInput("");
                setStatus('running')
                navigate('/')
            } else {
                console.log("Couldn't add new project", result.message)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="formContainer">
            <h1>Add New Project</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="">Title</label>
                <input type="text" value={title}
                    onChange={(event) => setTitle(event.target.value)} name="title" placeholder="enter project title" />
                <label htmlFor="">Members</label>
                <input type="text"
                    onChange={handleMembersChange}
                    value={membersInput}
                    name="members" placeholder="enter, members, name" />
                <select name="status" value={status}
                    onChange={(event) => setStatus(event.target.value)} id="">
                    <option value="completed">Completed</option>
                    <option value="running">Running</option>
                </select>
                <button type="submit">Add Project</button>
            </form>
        </div>
    )
}

export default AddProject