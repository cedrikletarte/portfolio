"use client"

import { useTranslations } from 'next-intl';
import { MdSend } from 'react-icons/md';

const Contact = () => {
  const t = useTranslations();

  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center'>
         <form
           method='POST'
           action='https://getform.io/f/933db683-e35f-4f49-964f-d25ca92b8846'
           className='flex flex-col max-w-[600px] w-full px-4' // Ajoute px-4 ici
         >
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>{t('contact.title')}</p>
                <p className='text-gray-300 py-4'>
                  {t.rich('contact.desc', {
                    link: (chunks) => (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://mail.google.com/mail/u/0/?fs=1&to=cedrikletarte@gmail.com&tf=cm"
                        className="underline text-pink-400"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
            </div>
            <input className='bg-[#ccd6f6] text-black p-2' type='text' placeholder={t('contact.name')} name='name' required/>
            <input className='my-4 text-black p-2 bg-[#ccd6f6]' type='text' pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title={t('contact.emailTitle')} placeholder={t('contact.email')} name='email' required/>
            <textarea className='bg-[#ccd6f6] text-black p-2' name='message' rows={6} placeholder={t('contact.message')} required />
            <button className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'>
              {t('contact.button')}&nbsp;<MdSend/>
            </button>
         </form>
    </div>
  )
}

export default Contact