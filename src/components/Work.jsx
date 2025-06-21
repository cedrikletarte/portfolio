"use client"
/* */

import {useState} from 'react'
import Server from './Server';
import Website from './Website';
import Gaming from './Gaming';
import Ai from './Ai';
import {scroller} from 'react-scroll';

function Work() {
  const [nav, setnav] = useState('');

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const handleClick = (e) => {  
    if (nav !== e) {
      setnav(e);
      scrollTo('handleDetails');
    } else {
      setnav('');
    }
  };

  const handleDetails = () =>{
    if(nav === 'server'){
      return <Server/>
    }
    if(nav ==='website'){
      return <Website/>
    }
    if(nav ==='gaming'){
      return <Gaming/>
    }
    if(nav ==='AI'){
      return <Ai/>
    }
  }

  return (
    <>
      <div name='work' className='w-full md:h-screen text-gray-300 bg-[#0a192f]'>
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
          <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600'>Projets</p>
            <p className='py-6'>Découvrez certains de mes travaux récents.</p>
          </div>

          {/* Container */}
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

            {/* Grid Item */}
            <div style={{backgroundImage:`url('/assets/undraw_server.svg')`}} className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'>
              {/* Hover Effects */}
              <div className='opacity-0 group-hover:opacity-100 text-center transition-opacity duration-500'>
                <span className='text-2xl font-bold  text-white tracking-wider'>
                  Configuration d&apos;un serveur multimédia
                </span>
                <div className='pt-8 text-center'>
                  <button onClick={() => handleClick("server")} className='text-center ronded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>Détails</button>
                </div>
              </div>
            </div>
            {/* Grid Item */}
            <div style={{backgroundImage:`url('/assets/undraw_website2.png')`}} className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'>
              {/* Hover Effects */}
              <div className='opacity-0 group-hover:opacity-100 text-center transition-opacity duration-500'>
                <span className='text-2xl font-bold  text-white tracking-wider'>
                  Création d&apos;une page web portfolio
                </span>
                <div className='pt-8 text-center'>
                  <button onClick={() => handleClick("website")} className='text-center ronded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>Détails</button>
                </div>
              </div>
            </div>
            {/* Grid Item */}
            <div style={{backgroundImage:`url('/assets/undraw_gaming.svg')`}} className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'>
              {/* Hover Effects */}
              <div className='opacity-0 group-hover:opacity-100 text-center transition-opacity duration-500'>
                <span className='text-2xl font-bold  text-white tracking-wider'>
                  Réalisation d&apos;un jeu vidéo
                </span>
                <div className='pt-8 text-center'>
                  <button onClick={() => handleClick("gaming")} className='text-center ronded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>Détails</button>
                </div>
              </div>
            </div>
            {/* Grid Item */}
            <div style={{backgroundImage:`url('/assets/undraw_visionary.svg')`}} className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'>
              {/* Hover Effects */}
              <div className='opacity-0 group-hover:opacity-100 text-center transition-opacity duration-500'>
                <span className='text-2xl font-bold  text-white tracking-wider'>
                  Création d&apos;une intelligence artificielle
                </span>
                <div className='pt-8 text-center'>
                  <button onClick={() => handleClick("AI")} className='text-center ronded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>Détails</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='handleDetails'>{handleDetails()}</div>
    </>
  )
}

export default Work