"use client"
/* */



import { useTranslations } from 'next-intl'
import {useState} from 'react'
import {FaBars, FaTimes, FaGithub} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import {BsFillPersonLinesFill} from 'react-icons/bs'
import {scroller} from 'react-scroll';
import LoadingIcons from 'react-loading-icons'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const Navbar = () => {
  const t = useTranslations();
  const [nav, setnav] = useState(false);
  const [loading, setloading] = useState(false)
  const handleClick = () => setnav(!nav);

  const locale = useLocale();
  const router = useRouter();

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800, // Duration of the scroll animation in milliseconds
      delay: 0, // Delay before the scroll starts in milliseconds
      smooth: 'easeInOutQuart', // Easing function for the scroll animation
    });
  };

  const scrollToMobile = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800, // Duration of the scroll animation in milliseconds
      delay: 0, // Delay before the scroll starts in milliseconds
      smooth: 'easeInOutQuart', // Easing function for the scroll animation
    });
    handleClick();
  };

  const handleDownload = () => {

    setloading(true);

    setTimeout(() => {
      setloading(false);

      downloadFile();
    }, 2000)
  };

  const downloadFile = () => {
    const fileUrl = locale === 'fr' ? '/cv_fr.pdf' : '/cv_en.pdf';
    const filename = "Cedrik_Letarte_CV.pdf";
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.click();
  }
  

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300'>
        <a href="https://www.cedrikletarte.com">
            <img src="/assets/logo2.png" alt='Logo' style={{width: '50px'}}/>
        </a>

        {/* menu  className='py-6 text-4xl' */}
             <ul className='hidden md:flex'>
                <li className="border-effect" onClick={() => scrollTo('home')}>{t('navbar.home')}</li>
                <li className="border-effect" onClick={() => scrollTo('about')}>{t('navbar.about')}</li>
                <li className="border-effect" onClick={() => scrollTo('skills')}>{t('navbar.skills')}</li>
                <li className="border-effect" onClick={() => scrollTo('work')}>{t('navbar.work')}</li>
                <li className="border-effect" onClick={() => scrollTo('contact')}>{t('navbar.contact')}</li>
                <li className="border-effect">
                  <button
                    onClick={() => router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`)}
                    className="w-full h-full"
                  >
                    {locale === 'fr' ? 'EN' : 'FR'}
                  </button>
                </li>
             </ul>

        {/* Hamburger */}
        <button
          onClick={handleClick}
          className='md:hidden z-10'
          aria-label={nav ? "Fermer le menu" : "Ouvrir le menu"}
          type="button"
        >
            {!nav ? <FaBars/> : <FaTimes/>}
        </button>

        {/* Mobile Menu */}
        <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center animate-slide-in' }>
            <li className="border-effect py-6 text-4xl" onClick={() => scrollToMobile('home')}>{t('navbar.home')}</li>
            <li className="border-effect py-6 text-4xl" onClick={() => scrollToMobile('about')}>{t('navbar.about')}</li>
            <li className="border-effect py-6 text-4xl" onClick={() => scrollToMobile('skills')}>{t('navbar.skills')}</li>
            <li className="border-effect py-6 text-4xl" onClick={() => scrollToMobile('work')}>{t('navbar.work')}</li>
            <li className="border-effect py-6 text-4xl" onClick={() => scrollToMobile('contact')}>{t('navbar.contact')}</li>
            <li className="border-effect py-6 text-4xl">
              <button
                onClick={() => router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`)}
                className="w-full h-full"
              >
                {locale === 'fr' ? 'EN' : 'FR'}
              </button>
            </li>
        </ul>

        {/* Social icons */}
        <div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
          <ul>
            {/*
            <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
              <a className='flex justify-between items-center w-full  text-gray-300' href='/'>
                Linkedin <FaLinkedin size={30}/>
              </a>
            </li>
  */}
            <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
              <a className='flex justify-between items-center w-full  text-gray-300' target="_blank" href='https://github.com/Cedrik12'>
                Github <FaGithub size={30}/>
              </a>
            </li>
            <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]'>
              <a className='flex justify-between items-center w-full  text-gray-300' target="_blank" href='https://mail.google.com/mail/u/0/?fs=1&to=cedrikletarte@gmail.com&tf=cm'>
                Email <HiOutlineMail size={30}/>
              </a>
            </li>
{
            <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]'>
              <button
                className='flex justify-between items-center w-full text-gray-300 bg-transparent border-none outline-none cursor-pointer'
                onClick={handleDownload}
                type="button"
                aria-label="Télécharger le CV"
              >
                CV {loading ? <LoadingIcons.ThreeDots width="50px" height="50px" style={{ marginRight: '-10px' }}/> : <BsFillPersonLinesFill size={30}/>}
              </button>
            </li>
}
          </ul>
        </div>
    </div>
  )
}

export default Navbar