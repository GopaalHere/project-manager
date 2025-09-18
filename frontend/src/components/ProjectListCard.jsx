import { Link, useNavigate } from "react-router-dom";
import { deleteOneProject } from "../api/projectApi";

const ProjectListCard = ({ project, index, onDelete }) => {
    const navigate = useNavigate();

    function formatDateTime(date) {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

   const handleDelete=async(id)=>{
    const res = await deleteOneProject(id);
    if(res.success){
        alert("Project Deleted successfully");
        onDelete(id)
    }
    else{
        alert("error deleting")
    }
   }

    return (
        <div className="cardContainer">
            <li className="list-item"><h1>{index + 1}. {project.title}</h1></li>
            <li className="list-item" id="members">Members : {project.members.join(', ')}</li>
            <ul className="list-item" id="dates">
               <li className="list-list-item">Added : {formatDateTime(project.createdAt)}</li>
            <li className="list-list-item">Modified : {formatDateTime(project.updatedAt)}</li>
            </ul>
            <li className="list-item" id="buttons">
            <button id="projectdeleteButton" onClick={()=>handleDelete(project._id)}>Delete</button>
            <Link to={`/update/${project._id}`}>Update</Link>
            </li>
        </div>
    )
}

export default ProjectListCard