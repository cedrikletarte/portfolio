"use client";


import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations();

  return (
    <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
                <div className='sm:text-right pb-8 pl-4'>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600'>{t('about.title')}</p>
                </div>
            </div>
            <div></div>
            <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
                <div className='sm:text-right text-3xl font-bold'>
                    <p>{t('about.intro')}</p>
                </div>
                <div>
                    <p style={{textAlign: 'justify', fontSize: '13px'}}>{t('about.desc')}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About