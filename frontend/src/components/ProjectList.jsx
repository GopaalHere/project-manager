import { Fragment, useEffect, useState } from "react"
import { fetchProjects } from "../api/projectApi";
import ProjectListCard from "./ProjectListCard";
import '../style/projectlist.css'

const ProjectList = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
    }, [])

    const loadProjects = async () => {
        try {
            const result = await fetchProjects();
            setProjects(result.result)
            console.log(result.result);
        } catch (err) {
            console.error(err)
        }

    }

    const handleProjectDelete = (id) => {
        setProjects(projects.filter((p) => p._id !== id));
    };

    return (
        <div className="cardsContainer">
            {/* <ul className="UlistContainer">
                <li className="list-head">Sr. No</li>
                <li className="list-head">Project Title</li>
                <li className="list-head">Members</li>
                <li className="list-head">Date</li>
                <li className="list-head">Action</li>
            </ul> */}
            {
                projects && projects.map((project, index) => (
                    <Fragment key={index}>
                           <ProjectListCard project={project} index={index} onDelete={handleProjectDelete}/>
                    </Fragment>
                ))
            }
        </div>
    )
}

export default ProjectList