import  { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



import {  Parallax,Autoplay, Pagination, Navigation } from 'swiper/modules';


   

const Slider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (

        <>
        <Swiper
        style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
        
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax,Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper carousel w-full lg:h-[400px] h-[200px] border-2 border-white rounded-3xl shadow-2xl"
      >
        <div
          slot="container-start"
          className="parallax-bg"
         
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide >
        <div className='bg-[url(https://i.ibb.co/SypgQXg/1-07e7770a-7a1a-4dfe-83be-b502b2d47d57.jpg)] w-full h-full bg-no-repeat bg-cover '>
        <div className='lg:py-44 py-10'>
        <div className="title text-black font-bold text-center lg:text-6xl text-4xl" data-swiper-parallax="-300">
            Landscape painting
          </div>
          
          
        </div>
        </div>
        
    
    
        </SwiperSlide>
        <SwiperSlide>
        <div className='bg-[url(https://i.ibb.co/93ZJ93n/78cd8445440169-5607a34add678.jpg)] w-full h-full bg-no-repeat bg-cover '>
        <div className='lg:py-44 py-10'>
        <div className="title text-black font-bold text-center lg:text-6xl text-4xl" data-swiper-parallax="-300">
            Watercolor painting
          </div>
          
          
        </div>
        </div>
        
    
   

        </SwiperSlide>
        <SwiperSlide>
        <div className='bg-[url(https://i.ibb.co/6wkzQx4/il-fullxfull-2895697092-rea6.jpg)] w-full h-full bg-no-repeat bg-cover '>
        <div className='lg:py-44 py-10'>
        <div className="title text-black font-bold text-center lg:text-6xl text-4xl" data-swiper-parallax="-300">
            Oil painting
          </div>
          
          
        </div>
        </div>
        
    
    


        </SwiperSlide>
        <SwiperSlide>
        <div className='bg-[url(https://i.ibb.co/ZBw1RPV/il-fullxfull-3389332184-lkwu.jpg)] w-full h-full bg-no-repeat bg-cover'>
        <div className='lg:py-44 py-10'>
        <div className="title text-black font-bold text-center lg:text-6xl text-4xl" data-swiper-parallax="-300">
            Beautiful drawings
          </div>
          
         
        </div>
        </div>
        
    
    


        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>





      </Swiper>
        
        
        </>

    );
};

export default Slider;