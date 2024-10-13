import Sidebar from "./Sidebar";
import { get } from "../scripts/api";
import { useEffect, useState } from "react";
import { ResumeDeveloper } from "./ResumeDeveloper";
import "../../styles/dashboard.css";
import { ResumeProject } from "./ResumeProject";

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const getProjectsDetail = () => {
    get("/projects/projects-detail").then((res) => {
      console.log("res ::: ", res);
      setProjects(res.projects);
      setDevelopers(res.developers);
    });
  };

  useEffect(() => {
    getProjectsDetail();
  }, []);

  return (
    <>
      <Sidebar>
        <div className="dashboard-container">
          <h3>Panel principal</h3>
          <h4>Resumen por proyecto</h4>
          <div className="project-container">
          {projects.map((project) => (
            <ResumeProject project={project} />
          ))}
          </div>
          <h4>Resumen por programador</h4>
          <div className="resume-container">
            {developers.map((developer) => (
              <ResumeDeveloper developer={developer} />
            ))}
          </div>
        </div>
      </Sidebar>
    </>
  );
};
