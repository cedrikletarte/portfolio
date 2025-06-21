"use client"
/* */

import {useState} from 'react'

const Gaming = () => {
  const media = [
    { type: 'image', src: "/assets/menu.png" },
    { type: 'image', src: "/assets/orthogonal.png" },
    { type: 'image', src: "/assets/fps.png" },
    { type: 'image', src: "/assets/freecam.png" },
    { type: 'image', src: "/assets/wallrun.png" },
    { type: 'image', src: "/assets/swinging.png" },
    // Add more media items here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='w-full min-h-screen bg-[#0a192f] text-gray-300 flex flex-col justify-center items-center p-4'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div>
          <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Jeu vidéo</p>
          <p style={{ textAlign: 'justify' }} className='py-4 max-w[700px]'>
            Mon équipe et moi avons développé un jeu vidéo dans le cadre d'un projet collégial afin d'acquérir des compétences dans le domaine de la création de jeux vidéo. Nous avons utilisé Unity comme moteur de jeu et programmé l’ensemble des mécaniques en C#. Pour accélérer le développement et nous concentrer sur l’implémentation des fonctionnalités, nous avons intégré des modèles 3D issus de l’Unity Asset Store.  Le concept central permet aux joueurs de concevoir leur propre ville grâce à une interface intuitive de sélection et de manipulation d'objets en 3D. Une fois la ville construite, les joueurs peuvent explorer leur création en mode vue à la première personne, avec la possibilité de réaliser des cascades pour enrichir leur expérience. 
            <br/><br/>
            Le concept central permet aux joueurs de concevoir leur propre ville grâce à une interface intuitive de sélection et de manipulation d'objets en 3D. Une fois la ville construite, les joueurs peuvent explorer leur création en mode vue à la première personne, avec la possibilité de réaliser des cascades pour enrichir leur expérience.
          </p>
          <br /><br />
          <p className='font-bold'>Objectifs du projet:</p>
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>1. Développement d'un jeu vidéo : </p> Création d’un environnement interactif où les joueurs peuvent construire et explorer librement. Intégration de mécaniques favorisant l’immersion, telles qu’une gestion fluide de la caméra et un système de déplacements optimisé.
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>2. Concevoir une interface intuitive: </p> Développement d’un système de sélection et de manipulation d’objets en 3D permettant aux joueurs de placer, déplacer et ajuster des éléments architecturaux. Mise en place d’un menu ergonomique, conçu avec Unity UI, offrant une navigation fluide et une prise en main rapide.
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>3. Offrir une expérience immersive: </p> Implémentation d’un système de caméra orthogonale, libre et FPS assurant une exploration fluide des villes créées.
          <br /><br />
          <p style={{ fontWeight: 'bold', display: 'inline', fontSize: 20 }}>4. Ajouter des mécaniques de gameplay dynamiques: </p> Développement d’un système de physique avancé, utilisant Unity Physics, pour permettre aux joueurs de réaliser des cascades et interagir avec l’environnement. Intégration de mécaniques de mouvement spécifiques afin de copié la démarche du super-héro Spiderman (sprint, saut, wallrun, déplacement en tirant des toiles).
          <br /><br />
        </div>
        <div className='relative w-full max-w-[700px] mx-auto'>
          {media[currentIndex].type === 'image' ? (
            <img src={media[currentIndex].src} alt={`media-${currentIndex}`} className='w-full h-auto' />
          ) : (
            <video src={media[currentIndex].src} controls className='w-full h-auto' />
          )}
          <button onClick={handlePrev} className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full'>
            &#9664;
          </button>
          <button onClick={handleNext} className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full'>
            &#9654;
          </button>
        </div>
      </div>
    </div>
  )
}

export default Gaming