/* */
const Ai = () => {
  return (
    <div className='w-full min-h-screen   bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Tic-Tac-Toe Géant AI</p>

                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'> Dans le cadre d'un projet universitaire, nous avons développé une intelligence artificielle capable de jouer au Tic-Tac-Toe Géant, une version avancée du célèbre jeu de société. 
                    <br/><br/>
                    Contrairement au tic-tac-toe classique, cette version repose sur une grille imbriquée : chaque case du plateau principal (3x3) contient à son tour un mini-jeu de tic-tac-toe (3x3). Le but est de gagner trois mini-jeux alignés pour remporter la partie. La complexité vient du fait que chaque coup joué détermine la zone de jeu de l’adversaire, nécessitant une stratégie avancée et une vision globale du plateau.
                </p>
                <br/><br/>

                <p className='font-bold'>Technologies et algorithmes:</p> <br/><br/>

                <ul className='list-disc list-inside'>
                    <li>Algorithme Minimax avec élagage Alpha-Bêta pour une prise de décision efficace dans un espace d’états très vaste.</li>
                    <li>Fonction d’évaluation heuristique optimisée pour prioriser les meilleurs coups et accélérer les décisions.</li>
                    <li>Génération de mouvements valides prenant en compte les contraintes du plateau.</li>
                    <li>Interaction avec un serveur de jeu via une interface réseau pour tester notre IA contre d'autres agents.</li>
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