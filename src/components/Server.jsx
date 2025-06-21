/* */
const Server = () => {
  return (
    <div className='w-full min-h-screen   bg-[#0a192f] text-gray-300 flex justify-center items-center p-4'>
        {/* Container */}
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <div>

                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Serveur multimédia</p>

                <p style={{textAlign: 'justify'}} className='py-4 max-w[700px]'>Dans le cadre d’un projet personnel, j’ai configuré une infrastructure complète sur un serveur Ubuntu, intégrant des technologies modernes pour répondre à des besoins variés tout en assurant sécurité, performance et fiabilité. Ce projet démontre ma maîtrise des outils essentiels en génie logiciel et ma capacité à résoudre des problèmes complexes de manière autonome.</p>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                   1. Mise en place de conteneurs Docker
                   <br/>
                </p>
                    J’ai déployé et orchestré plusieurs services à l’aide de Docker, chacun fonctionnant dans un environnement isolé pour maximiser la sécurité et la modularité :
                    <ul className='list-disc list-inside'>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Jellyfin</p> pour le streaming multimédia personnel</li>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Radarr</p>, <p style={{fontWeight: 'bold', display: 'inline'}}>Sonarr</p>, <p style={{fontWeight: 'bold', display: 'inline'}}>qBittorrent</p> et <p style={{fontWeight: 'bold', display: 'inline'}}>Jackett</p> pour l’organisation de contenu</li>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Vaultwarden</p> pour la gestion des mots de passe</li>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Portainer</p> pour superviser et administrer facilement tous les conteneurs</li>
                    </ul>

                <br/><br/>


                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                    2. Gestion de la sécurité et de l’accessibilité
                </p>
                <br/>
                    Un aspect clé de ce projet a été la mise en œuvre de pratiques avancées en sécurité informatique :
                    <ul className='list-disc list-inside'>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Reverse-proxy avec SSL/TLS :</p> configuration d'un conteneur reverse-proxy (Nginx Proxy Manager) pour rediriger les connexions entrantes tout en chiffrant les communications via HTTPS.</li>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Cloudflare :</p> sécurisation du domaine associé au serveur en utilisant les protections avancées de Cloudflare, notamment pour masquer l’adresse IP et bloquer les attaques DDoS.</li>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Pare-feu robuste (white-list) :</p> configuration d'un pare-feu strict pour bloquer les connexions non autorisées et garantir une protection continue. </li>
                        <li><p style={{fontWeight: 'bold', display: 'inline'}}>Réseau VPN :</p> configuration d'un conteneur WireGuard pour établir un réseau privé virtuel (VPN), garantissant une sécurité optimale lors de l'accès à distance à mon serveur. Cette configuration isole les connexions sensibles et assure la confidentialité des communications, tout en permettant une gestion sécurisée des services hébergés.</li>
                    </ul>

                <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>
                  3. Automatisation et maintenance
                  <br/>
                </p>
                    J’ai intégré <p style={{fontWeight: 'bold', display: 'inline'}}>Watchtower</p> pour automatiser les mises à jour des conteneurs Docker, ainsi que les <p style={{fontWeight: 'bold', display: 'inline'}}>« unattended updates »</p> d’Ubuntu. Cette approche garantit que chaque service et le système d’exploitation restent à jour sans intervention manuelle, réduisant ainsi les risques liés aux vulnérabilités et minimisant les efforts de maintenance.
                

                {/*
                <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Serveur multimédia</p>

                <p style={{textAlign: 'justify'}} className='text-[#8892b0] py-4 max-w[700px]'>J'ai entrepris la configuration d'un serveur Ubuntu pour répondre à des besoins personnels spécifiques, en prenant des mesures pour assurer la sécurité et l'accessibilité depuis l'extérieur. Voici les principales technologies et méthodes que j'ai utilisées, chacune jouant un rôle crucial dans la mise en place de ce système : <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>1.</p>Nom de domaine avec protection Cloudflare : J'ai choisi un nom de domaine pour mon serveur et j'ai opté pour la protection de Cloudflare. Cloudflare est un service de CDN (Content Delivery Network) qui agit comme un pare-feu inversé, filtrant le trafic Web pour bloquer les attaques DDoS, les menaces et les bots malveillants. Cela ajoute une couche de sécurité supplémentaire et protège l'adresse IP de mon serveur. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>2.</p>Container reverse-proxy avec certificat SSL/TLS : J'ai mis en place un container reverse-proxy pour gérer les connexions externes vers mon serveur. Ce reverse-proxy agit comme une passerelle qui redirige le trafic entrant vers les applications appropriées à l'intérieur de mon serveur. Il me permet en autre dévité d'ouvrir des ports réseaux sur mon modem/router inutilement. J'ai également configuré un certificat SSL/TLS pour chiffrer les communications entre le navigateur des utilisateurs et le serveur, assurant ainsi une connexion sécurisée via HTTPS. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>3.</p>SSH (Secure Shell) : J'ai utilisé SSH pour accéder de manière sécurisée à distance au serveur. Cela permet de se connecter au serveur en utilisant un canal chiffré, ce qui protège les communications et empêche les accès non autorisés. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>4.</p>SSH-keygen : SSH-keygen est un outil permettant de générer des paires de clés SSH. Ces clés sont utilisées pour l'authentification sans mot de passe, renforçant ainsi la sécurité et éliminant le besoin de saisir un mot de passe à chaque connexion. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>5.</p>Authentification Google 2FA (Two-Factor Authentication) : J'ai mis en place l'authentification à deux facteurs avec Google Authenticator, une méthode de sécurité supplémentaire qui requiert la saisie d'un code unique généré par l'application sur un appareil de confiance, en plus de la clé ssh, pour se connecter au serveur. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>6.</p>Pare-feu robuste : Pour renforcer la sécurité du serveur, j'ai configuré un pare-feu robuste pour contrôler le trafic entrant et sortant, permettant ainsi de bloquer les connexions non autorisées et les attaques potentielles. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>7.</p>Conteneurs docker : J'ai utilisé Docker, une plateforme de conteneurs, pour déployer un réseau privé virtuel (VPN) à l'intérieur de conteneurs. Cette approche isole le trafic VPN du reste du serveur, assurant ainsi une couche supplémentaire de sécurité et de confidentialité pour les connexions. <br/><br/>
                {/*
                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>8.</p>Jellyfin : Jellyfin est un logiciel open-source de serveur multimédia. J'ai configuré et déployé Jellyfin pour pouvoir accéder et diffuser du contenu multimédia (films, séries, musique, etc.) de manière sécurisée depuis mon serveur. <br/><br/>

                <p style={{fontWeight: 'bold', display: 'inline', fontSize: 20}}>9.</p>qBittorrent : qBittorrent est un client torrent open-source que j'ai probablement utilisé pour gérer et télécharger des fichiers torrent de manière sécurisée et efficace. <br/><br/>
                
                En résumé, j'ai configuré mon serveur Ubuntu en utilisant un nom de domaine avec la protection de Cloudflare et un container reverse-proxy avec un certificat SSL/TLS pour garantir une connexion sécurisée depuis l'extérieur. J'ai également pris en compte des méthodes de sécurité avancées telles que SSH, l'authentification à deux facteurs, un pare-feu solide ainsi que des conteneurs hébergant des applications open-source dont leur communication passe par un VPN pour répondre à mes besoins personnels de manière sécurisée.</p>
                <p className='py-4'></p>
                **/}
            </div>
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/cloudflare.png" alt='Cloudflare'/>
                <p className='my-4'>Cloudflare</p>
            </div>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/wireguard.png" alt='Wireguard'/>
                <p className='my-4'>Wireguard</p>
            </div>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/jellyfin.png" alt='Jellyfin'/>
                <p className='my-4'>Jellyfin</p>
            </div>
            <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src="/assets/vaultwarden.png" alt='Vaultwarden'/>
                <p className='my-4'>Vaultwarden</p>
            </div>
            </div>
        </div>
        </div>
  )
}

export default Server