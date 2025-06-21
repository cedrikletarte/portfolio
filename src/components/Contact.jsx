import React from 'react'
import {MdSend} from 'react-icons/md'


const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center'>
         <form method='POST' action='https://getform.io/f/933db683-e35f-4f49-964f-d25ca92b8846' className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p  className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>Contact</p>
                <p className='text-gray-300 py-4'>Veuillez soumettre le formulaire ci-dessous ou envoyez-moi un email à  l'adresse <a target="_blank" href='https://mail.google.com/mail/u/0/?fs=1&to=cedrikletarte@gmail.com&tf=cm'>cedrikletarte@gmail.com</a></p>
            </div>
            <input className='bg-[#ccd6f6] p-2' type='text' placeholder='Name' name='name' required/>
            <input className='my-4 p-2 bg-[#ccd6f6]' type='text' pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Voici un exemple d'email valide : exemple@gmail.com" placeholder='Email' name='email' required/>
            <textarea className='bg-[#ccd6f6] p-2' name='message' rows={6} placeholder='message' required />
            <button className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'>Travaillons ensemble &nbsp; <MdSend/></button>
         </form>
    </div>
  )
}

export default Contact