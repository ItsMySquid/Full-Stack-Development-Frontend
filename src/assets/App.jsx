import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout";
import List from "../Blocks/List.jsx";
import CreateForm from "../Blocks/CreateForm.jsx";
import Detail from "../Blocks/Detail.jsx";
import Edit from "../Blocks/Edit.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <List/>
            },
            {
                path: '/create',
                element: <CreateForm/>
            },
            {
                path: '/:id',
                element: <Detail/>
            },
            {
                path: '/edit/:id',
                element: <Edit/>
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;