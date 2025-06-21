/*     */
const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
                <div className='sm:text-right pb-8 pl-4'>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600'>À propos</p>
                </div>
                </div>
                <div></div>
                <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
                    <div className='sm:text-right text-3xl font-bold'>
                        <p>Salut. Je suis Cédrik, enchanté de faire ta connaissance. Prends un moment pour faire le tour de mon site.</p>
                    </div>
                    <div>
                        <p style={{textAlign: 'justify', fontSize: '13px'}}>Avec mon bagage solide en programmation et en soutien technique, je suis un candidat polyvalent et prêt à apporter une valeur ajoutée à votre équipe. Ayant gradué en 2023 de la technique en informatique du Cégep de Valleyfield, j'ai acquis une maîtrise des langages de programmation tels que Java, C#, Python. Mes compétences en développement d'applications full-stack me permettent de concevoir et de mettre en œuvre des solutions logicielles efficaces et évolutives. En tant qu'étudiant à l'université,je recherche un poste de stagiaire pour combler ma soif d'apprendre. 
                        <br/><br/>                      
                        </p>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default About
