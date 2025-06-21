"use client"

import {useState} from 'react'
import { useTranslations } from 'next-intl'

const Gaming = () => {
  const t = useTranslations();
  const media = [
    { type: 'image', src: "/assets/menu.png" },
    { type: 'image', src: "/assets/orthogonal.png" },
    { type: 'image', src: "/assets/fps.png" },
    { type: 'image', src: "/assets/freecam.png" },
    { type: 'image', src: "/assets/wallrun.png" },
    { type: 'image', src: "/assets/swinging.png" },
    // Add more media items here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='w-full min-h-screen bg-[#0a192f] text-gray-300 flex flex-col justify-center items-center p-4'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div>
          <p className='text-4xl font-bold inline border-b-4 border-pink-600'>{t('gaming.title')}</p>
          <p style={{ textAlign: 'justify' }} className='py-4 max-w[700px]'>
            {t('gaming.intro')}
          </p>
          <br /><br />
          <p className='font-bold'>{t('gaming.objectives')}</p>
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>{t('gaming.goal1Title')}</p> {t('gaming.goal1Desc')}
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>{t('gaming.goal2Title')}</p> {t('gaming.goal2Desc')}
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>{t('gaming.goal3Title')}</p> {t('gaming.goal3Desc')}
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>{t('gaming.goal4Title')}</p> {t('gaming.goal4Desc')}
          <br /><br />
        </div>
        <div className='relative w-full max-w-[700px] mx-auto'>
          {media[currentIndex].type === 'image' ? (
            <img src={media[currentIndex].src} alt={`media-${currentIndex}`} className='w-full h-auto' />
          ) : (
            <video src={media[currentIndex].src} controls className='w-full h-auto' />
          )}
          <button onClick={handlePrev} className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full'>
            &#9664;
          </button>
          <button onClick={handleNext} className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full'>
            &#9654;
          </button>
        </div>
      </div>
    </div>
  )
}

export default Gaming