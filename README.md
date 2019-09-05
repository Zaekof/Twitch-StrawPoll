![strawpoll exemple](https://i.imgur.com/L9IA8kh.gif)

# Informations / Configuration

### Informations

L'overlay StrawPoll a été conçu pour être intégré dans des logiciels (obs/streamlabs obs/ etc..) pour envoyer un flux en direct sur la plateforme Twitch. Si vous n'utilisez pas Twitch pour streamer, l'overlay ne fonctionnera pas.

Le projet est open-source et facilement modifiable/configurable.

Pour voir l'aide sur votre navigateur, ouvrez le fichier **AIDE.html** dans votre navigateur.

Pour importer l'overlay StrawPoll dans votre logiciel de capture, exemple OBS, il vous faut importer le fichier  **index.html**  comme source  **navigateur**.

Les commandes disponible :  
**!poll (nom du strawPoll)**  pour créer un StrawPoll, sans les parenthèses.  
**!poll add (option)**  pour ajouter une option au StrawPoll, sans les parenthèses.  
**!poll hide**  pour cacher et mettre en pause le StrawPoll.  
**!poll stop**  pour arreter et supprimer le StrawPoll.  
Ensuite il suffit d'utiliser  **!(numéro de l'option)**  dans le chat pour voter, exemple  **!0**.

### Configuration

##### Activer ou désactiver les effets sonores

Rendez vous dans le fichier  **config.json**  et à la ligne  **4**.  
Vous devez voir ceci  **"enable": true**, ici vous pouvez activer ou désactiver les sons avec les valeurs  **true**  pour activer et  **false**  pour désactiver.

##### Volume des effets sonores

Rendez vous dans le fichier  **config.json**  et à la ligne  **5**.  
Vous devez voir ceci  **"volume": 0.1**, ici vous pouvez augmenter ou diminuer le volume du son, de 0.1 à 1, sachant que 0.1 c'est le minimum.

##### Configurer le StrawPoll sur votre chaîne Twitch

Rendez vous dans le fichier  **config.json**  et à la ligne  **7**.  
Vous devez voir ceci  **"channel_twitch": ""**, ici vous devez renseigner le nom de votre chaîne Twitch (votre pseudo) entre les guillemets après les deux-points.

Rendez vous dans le fichier  **config.json**  et à la ligne  **8**.  
Vous devez voir ceci  **"identity_username": ""**, ici vous devez renseigner votre pseudo Twitch ou celui de votre bot entre les guillemets après les deux-points.

Rendez vous dans le fichier  **config.json**  et à la ligne  **9**.  
Vous devez voir ceci  **"identity_password": ""**, ici vous devez renseigner votre Token Twitch ou celui de votre bot entre les guillemets après les deux-points;  
Pour avoir un Token, dirigez-vous  [ici](https://twitchapps.com/tmi/)  puis connectez-vous à votre compte Twitch.  
Un Token Twitch resemble a ceci :  **oauth:dsd46dv0hlfsdsd45vndh797**

##### Modifier les fichiers sonores

Vous avez juste à copier-coller vos fichiers dans le dossier  **audio**.  
Attention, merci de bien respecter les noms des fichiers,  **connect.mp3**  pour la connexion et  **disconnect.mp3**  pour la deconnexion.