"use client"

import { useTranslations } from 'next-intl';

const Server = () => {
  const t = useTranslations();

  return (
    <div className='w-full min-h-screen bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>{t('server.title')}</p>
                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'>{t('server.intro')}</p>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                   {t('server.dockerTitle')}
                   <br/>
                </p>
                <span>{t('server.dockerDesc')}</span>
                <ul className='list-disc list-inside'>
                  {t.raw('server.dockerList').map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{__html: item}} />
                  ))}
                </ul>

                <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                    {t('server.securityTitle')}
                </p>
                <br/>
                <span>{t('server.securityDesc')}</span>
                <ul className='list-disc list-inside'>
                  {t.raw('server.securityList').map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{__html: item}} />
                  ))}
                </ul>

                <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                  {t('server.autoTitle')}
                  <br/>
                </p>
                <span>
                  {t.rich('server.autoDesc', {
                    b: (chunks) => <b>{chunks}</b>
                  })}
                </span>
            </div>
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
              {t.raw('server.techs').map((tech, idx) => (
                <div key={tech} className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={`/assets/${tech.toLowerCase()}.png`} alt={tech}/>
                  <p className='my-4'>{tech}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Server