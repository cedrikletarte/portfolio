"use client";

import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Skills = () => {
  const t = useTranslations();

  return (
    <div name='skills' className='w-full h-screen bg-[#0a192f] text-gray-300'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>{t('skills.title')}</p>
                <p className='py-4'>{t('skills.desc')}</p>
            </div>
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/java.png" alt='JAVA' width={80} height={80}/>
                    <p className='my-4'>{t('skills.java')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/csharp.png" alt='C#' width={80} height={80}/>
                    <p className='my-4'>{t('skills.csharp')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/python.png" alt='PYTHON' width={80} height={80}/>
                    <p className='my-4'>{t('skills.python')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/react.png" alt='REACT' width={80} height={80}/>
                    <p className='my-4'>{t('skills.react')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/ubuntu.png" alt='UBUNTU SERVER' width={80} height={80}/>
                    <p className='my-4'>{t('skills.ubuntu')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/docker.png" alt='DOCKER' width={80} height={80}/>
                    <p className='my-4'>{t('skills.docker')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/mariadb.png" alt='MARIADB' width={80} height={80}/>
                    <p className='my-4'>{t('skills.mariadb')}</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/mongo.png" alt='MongoDB' width={80} height={80}/>
                    <p className='my-4'>{t('skills.mongodb')}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Skills