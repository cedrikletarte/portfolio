"use client";

import { HiArrowNarrowRight } from 'react-icons/hi'
import { ReactTyped } from 'react-typed';
import { scroller } from 'react-scroll';

const Home = () => {

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800, // Duration of the scroll animation in milliseconds
      delay: 0, // Delay before the scroll starts in milliseconds
      smooth: 'easeInOutQuart', // Easing function for the scroll animation
    });
  };

  return (
    <div name='home' className='w-full  h-screen bg-[#0a192f]'>
        
        {/* Container */}
        <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full text-gray-300'>
            <p className='text-pink-600'>Bonjour, mon nom est</p>
            <h1 className='text-4xl sm:text-7xl font-bold text-[#ccd6f6]'>Cédrik</h1>
            <ReactTyped
                className='text-3xl sm:text-7xl font-bold text-[#8892b0]'
                strings={[
                    'Étudiant',
                    'Programmeur',
                    'Technicien en informatique',
                    ]}
                    typeSpeed={100}
                    backSpeed={50}
                    attr="placeholder"
                    loop >
                    <input style={{ outline: 'none' }} className='bg-[#0a192f] w-[1000px]' type="text"/>
                </ReactTyped>
            <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'>En tant que nouveau étudiant à l'École de technologie supérieure avec une expérience significative en développement d'applications full-stack, j'ai acquis une expertise polyvalente en travaillant avec des langages tels que Java, C#, Python et des frameworks comme REACT et Next.js. Cette expérience m'a permis de concevoir et de mettre en œuvre des solutions logicielles efficaces et adaptées aux besoins spécifiques des projets .
            </p>

            <div>
                <button onClick={() => scrollTo('work')} className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600'>
                  Voir mes projets 
                  <span className='group-hover:rotate-90 duration-300'> <HiArrowNarrowRight className='ml-3'/></span>
                </button>
            </div>
        </div>  
    </div>
  )
}

export default Home
