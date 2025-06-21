/* */

const Ubuntu = () => {
  return (
    <div name='test' className='w-full h-screen  bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Serveur multimédia</p>

                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'>Dans le cadre d’un projet personnel, j’ai configuré une infrastructure complète sur un serveur Ubuntu, intégrant des technologies modernes pour répondre à des besoins variés tout en assurant sécurité, performance et fiabilité. Ce projet démontre ma maîtrise des outils essentiels en génie logiciel et ma capacité à résoudre des problèmes complexes de manière autonome.</p>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                    <p className='font-bold text-lg'>1. Mise en place de conteneurs Docker</p>
                    J’ai déployé et orchestré plusieurs services à l’aide de Docker, chacun fonctionnant dans un environnement isolé pour maximiser la sécurité et la modularité :
                    <ul className='list-disc list-inside'>
                        <li>Jellyfin pour le streaming multimédia personnel</li>
                        <li>Radarr, Sonarr, qBittorrent et Jackett pour l’organisation de contenu</li>
                        <li>Vaultwarden pour la gestion des mots de passe</li>
                        <li>Portainer pour superviser et administrer facilement tous les conteneurs</li>
                    </ul>
                </p>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                    <p className='font-bold text-lg'>2. Gestion de la sécurité et de l’accessibilité</p>
                    Un aspect clé de ce projet a été la mise en œuvre de pratiques avancées en sécurité informatique :
                    <ul className='list-disc list-inside'>
                        <li>Reverse-proxy avec SSL/TLS : configuration d'un conteneur reverse-proxy (Nginx Proxy Manager) pour rediriger les connexions entrantes tout en chiffrant les communications via HTTPS.</li>
                        <li>Cloudflare : sécurisation du domaine associé au serveur en utilisant les protections avancées de Cloudflare, notamment pour masquer l’adresse IP et bloquer les attaques DDoS.</li>
                        <li>Pare-feu robuste (white-list) : J’ai configuré un pare-feu strict pour bloquer les connexions non autorisées et garantir une protection continue. </li>
                        <li>Réseau VPN : J’ai configuré un conteneur WireGuard pour établir un réseau privé virtuel (VPN), garantissant une sécurité optimale lors de l'accès à distance à mon serveur. Cette configuration isole les connexions sensibles et assure la confidentialité des communications, tout en permettant une gestion sécurisée des services hébergés.</li>
                    </ul>
                </p>

                
                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                    <p className='font-bold text-lg'>3. Automatisation et maintenance</p>
                    J’ai intégré Watchtower pour automatiser les mises à jour des conteneurs Docker, ainsi que les unattended updates d’Ubuntu. Cette approche garantit que chaque service et le système d’exploitation restent à jour sans intervention manuelle, réduisant ainsi les risques liés aux vulnérabilités et minimisant les efforts de maintenance.
                </p>
            </div>
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/ssh.png" alt='SSH'/>
                <p className='my-4'>SSH</p>
            </div>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/sshkey1.png" alt='SSH-KEYGEN'/>
                <p className='my-4'>SSH-KEYGEN</p>
            </div>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/google.png" alt='2FA GOOGLE AUTHENTICATOR'/>
                <p className='my-4'>2FA GOOGLE AUTHENTICATOR</p>
            </div>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/firewall1.png" alt='PARE-FEU'/>
                <p className='my-4'>PARE-FEU</p>
            </div>
            </div>
        </div>
        </div>
  )
}

export default Ubuntu