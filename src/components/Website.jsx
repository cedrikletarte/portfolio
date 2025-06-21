"use client"

import { useTranslations } from 'next-intl';

const Website = () => {
  const t = useTranslations();

  return (
    <div className='w-full min-h-screen bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>{t('website.title')}</p>
                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'>{t('website.intro')}</p>
                <p className='font-bold'>{t('website.objectives')}</p> <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>{t('website.skillsTitle')}</p> {t('website.skillsDesc')} <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>{t('website.projectsTitle')}</p> {t('website.projectsDesc')}<br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>{t('website.uxTitle')}</p> {t('website.uxDesc')} <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>{t('website.securityTitle')}</p> {t('website.securityDesc')} <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>{t('website.designTitle')}</p> {t('website.designDesc')} <br/><br/>

                {t('website.conclusion')}
            </div>
        </div>
    </div>
  )
}

export default Website