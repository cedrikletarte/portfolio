/* */

import Image from 'next/image'

const Skills = () => {
  return (
    <div name='skills' className='w-full h-screen bg-[#0a192f] text-gray-300'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Compétences</p>
                <p className='py-4'>Voici les technologies avec lesquelles j'ai travaillé.</p>
            </div>
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/java.png" alt='JAVA' width={80} height={80}/>
                    <p className='my-4'>JAVA</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/csharp.png" alt='C#' width={80} height={80}/>
                    <p className='my-4'>C#</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/python.png" alt='PYTHON' width={80} height={80}/>
                    <p className='my-4'>PYTHON</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/react.png" alt='REACT' width={80} height={80}/>
                    <p className='my-4'>REACT</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/ubuntu.png" alt='UBUNTU SERVER' width={80} height={80}/>
                    <p className='my-4'>UBUNTU SERVER</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/docker.png" alt='DOCKER' width={80} height={80}/>
                    <p className='my-4'>DOCKER</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/mariadb.png" alt='MARIADB' width={80} height={80}/>
                    <p className='my-4'>MARIADB</p>
                </div>
                <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                    <Image className='w-20 mx-auto' src="/assets/mongo.png" alt='MongoDB' width={80} height={80}/>
                    <p className='my-4'>MongoDB</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Skills