import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Components/Layout";
import TaskList from "../Pages/TaskList";
import AddTask from "../Pages/AddTask";
import TaskDetail from "../Pages/TaskDetail";

 export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <TaskList />
            },
            {
                path: '/form',
                element: <AddTask />
            },
            {
                path: '/task/:id',
                element: <TaskDetail />
            }
        ]
    }
])

const Routes = () =>{
    return <RouterProvider router={router} />
}
 export default Routes;