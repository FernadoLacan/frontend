import { AdminProject } from "./admin-project/AdminProject";
import { Collaborators } from "./collaborators/Collaborators";
import { CollaboratorDetail } from "./collaborators/Detail";
import { Dashboard } from "./dashboard/Dashboard";
import { Developer } from "./developer/Developer";
import Home from "./home/Home";
import { Issues } from "./issues/Issue";
import Login from "./login/Login";
import { ProjectDetail } from "./projects/Detail";
import { Projects } from "./projects/Projects";
import { Test } from "./tests/Test";

export const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/collaborators/:id',
    element: <CollaboratorDetail />
  },
  {
    path: '/collaborators',
    element: <Collaborators />
  },
  {
    path: '/projects/:id',
    element: <ProjectDetail />
  },
  {
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/admin-project/:id',
    element: <AdminProject />
  },
  {
    path: '/developer',
    element: <Developer />
  },
  {
    path: '/tests',
    element: <Test />
  },
  {
    path: 'issues',
    element: <Issues />
  }
]