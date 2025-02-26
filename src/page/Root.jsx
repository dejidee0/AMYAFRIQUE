import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


const Root = () => {
    return (
        <div className='container mx-auto lg:px-12 py-8 px-3 '>
           <div className='mb-10'>
           <Navbar ></Navbar>
           </div>
           <div className='mb-10'>
           <Outlet></Outlet>
           </div>
           <div className='mb-10'>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default Root;