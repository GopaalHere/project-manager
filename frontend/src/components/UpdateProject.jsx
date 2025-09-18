import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProject, getOneProject } from "../api/projectApi";

const UpdateProject = () => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [membersInput, setMembersInput] = useState("")
    const [members, setMembers] = useState([]);
    const [status, setStatus] = useState('running')
    const navigate = useNavigate();


    useEffect(() => {
        loadOneProject(id)
    }, [id])

    const loadOneProject = async (id) => {
        try {
            const res = await getOneProject(id);
            setTitle(res.result.title || "");
            setMembers(res.result.members || []);
            setMembersInput(res.result.members ? res.result.members.join(", ") : "");
            setStatus(res.result.status || "running");
            console.log(res);
        } catch (err) {
            console.error(err)
        }
    }

    const handleMembersChange = (e) => {
        const value = e.target.value;
        setMembersInput(value);
        setMembers(
            value.split(",").map((m) => m.trim()).filter((m) => m !== "")
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateProject(id, { title, members, status });
            if (result.success) {
                console.log("Updated Successfully");
                navigate('/');
            } else {
                console.log("Couldn't update project", result.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <>
            <div className="formContainer">
                <h1>Update</h1>
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
                    <button type="submit">Update Project</button>
                </form>
            </div>
        </>
    )
}

export default UpdateProject