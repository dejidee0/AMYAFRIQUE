
import { createBrowserRouter } from "react-router-dom";
import Error from "../page/Error";
import Home from "../page/Home";
import Root from "../page/Root";
import AllArt from "../page/AllArt";
import AddCraft from "../page/AddCraft";
import MyCraft from "../page/MyCraft";
import Logged from "../page/Logged";
import Register from "../page/Register";
import PrivateRoute from "../private/PrivateRoute";
import MyCraftDetails from "../page/MyCraftDetails";
import ViewDetails from "../page/ViewDetails";
import SubCategory from "../page/SubCategory";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
            loader: ()=>fetch('https://assignment-10-server-nu-ashen.vercel.app/arts')
            

        },
        {
            path:'/subCa/:id',
            element:<SubCategory></SubCategory>,
            loader:({params})=>fetch(`https://assignment-10-server-nu-ashen.vercel.app/artSub/${params.id}`)
        },
        {
            path:'/allArt',
            element:<AllArt></AllArt>,
            loader: ()=>fetch('https://assignment-10-server-nu-ashen.vercel.app/arts')
        },
        {
            path:'/addCraft',
            element:<PrivateRoute><AddCraft></AddCraft></PrivateRoute>
        },
        {
            path:'/view/:id',
            element:<PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
            


        },
        {
            path:'/myCraft',
            element:<PrivateRoute><MyCraft></MyCraft></PrivateRoute>
        },
        {
            path:'/craftDe/:id',
            element:<PrivateRoute><MyCraftDetails></MyCraftDetails></PrivateRoute>

        },
        {
           path:'/logged',
           element:<Logged></Logged>
        },
        {
            path:'/register',
            element:<Register></Register>
        }
      ]
    },
  ]);

  export default router