"use client"

import { useTranslations } from 'next-intl'

const Ai = () => {
  const t = useTranslations();

  return (
    <div className='w-full min-h-screen bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>{t('ai.title')}</p>

                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'>
                  {t('ai.intro')}
                </p>
                <br/><br/>

                <p className='font-bold'>{t('ai.techTitle')}</p> <br/><br/>

                <ul className='list-disc list-inside'>
                    <li>{t('ai.minimax')}</li>
                    <li>{t('ai.heuristic')}</li>
                    <li>{t('ai.moves')}</li>
                    <li>{t('ai.network')}</li>
                </ul>
                <div className='flex justify-center'>
                    <img src="/assets/tictactoe.png" alt='Tic-Tac-Toe Géant' className='max-w-full h-auto' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Ai