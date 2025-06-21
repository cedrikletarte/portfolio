/* */

import React from 'react'

const Website = () => {
  return (
    <div className='w-full min-h-screen   bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Page Web</p>

                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'> J'ai entrepris la conception d'une page web en React développé dans le cadre de mes études et de mon parcours professionnel en informatique.Ce projet a été conçu pour mettre en valeur mes compétences techniques et mes réalisations, tout en offrant une expérience utilisateur fluide et agréable. <br/><br/>

                <p className='font-bold'>Objectifs du projet:</p> <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>1. Présentation de mes compétences : </p> Le portfolio est structuré pour présenter mes compétences en développement full-stack, notamment en utilisant des technologies telles que React, Java, C#, Python, Docker, et bien d'autres. Chaque section du site est dédiée à un aspect particulier de mes compétences, permettant aux visiteurs de comprendre rapidement mon expertise. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>2. Mise en avant de mes projets : </p>J'ai inclus des sections détaillées sur certains de mes projets récents, comme la configuration d'un serveur multimédia et la création d'une page web portfolio. Ces projets démontrent ma capacité à gérer des projets complexes, à utiliser des technologies modernes et à résoudre des problèmes techniques de manière autonome.<br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>3. Expérience utilisateur : </p>J'ai accordé une attention particulière à l'expérience utilisateur en intégrant des fonctionnalités telles que le défilement fluide (smooth scrolling) avec React-Scroll, des icônes animées de chargement avec React-Loading-Icons, et des effets de texte dynamiques avec React-Typed. Ces éléments rendent la navigation sur le site plus intuitive et engageante. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>4. Sécurité et performance :  </p>Pour le projet de serveur multimédia, j'ai mis en place des pratiques avancées en sécurité informatique, telles que l'utilisation de conteneurs Docker, la configuration de pare-feu robustes, et l'intégration de réseaux VPN. Ces mesures assurent la sécurité, la performance et la fiabilité de l'infrastructure. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>5. Design et esthétique : </p>J'ai utilisé des illustrations SVG libres de droit de Undraw pour enrichir visuellement le contenu de mon site. Ces illustrations apportent une touche professionnelle et moderne à l'ensemble du portfolio. <br/><br/>

                Ce projet de portfolio en ligne est le reflet de mon engagement à développer des solutions logicielles efficaces et de haute qualité. Il démontre non seulement mes compétences techniques, mais aussi ma capacité à concevoir des interfaces utilisateur attrayantes et fonctionnelles.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Website