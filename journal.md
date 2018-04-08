# Journal

Dopo aver analizzato il codice fornito ho deciso di usare come codice di partenza StartingCode-withLights.html e StartingCode-heightmap.html.

## Problemi con le texture: texture diverse per ogni faccia del cubo

<<<<<<< HEAD
Ho sperimentato con le texture, tentando di creare un cubo con texture diverse per ogni faccia. Leggendo la documentazione ho tentato di usare CubeTexture e ho ottenuto una piccola skybox invece del risultato che mi aspettavo. Ho poi provato a creare una Mesh e passare un array di materiali come materiale, ma non è stata renderizzata. Mi sono accontentata di usare 6 PlaneGeometry con texture diverse per ottenere il risultato che volevo. Esperimenti sospesi (da riprendere nel caso tornassero utili nel progetto).

![First problem](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/cube_problems.png)

## Problemi con le texture: stessa texture, numero diverso di ripetizioni?

Il robot è composto da BoxGeometry di diverse dimensioni: ho deciso di usare la stessa texture per molte parti del corpo, settando un valore diverso per la ripetizione della texture, in modo che in ogni box la texture avesse (più o meno) la stessa scala. Questo implica l'utilizzo di un materiale diverso per ogni BoxGeometry.

Ho tentato di clonare le texture usando Texture.clone per non dover ricaricare l'immagine della texture ad ogni materiale. Questo ha generato errori (le mesh venivano renderizzate senza texture) perchè la clonazione avveniva prima dell'effettivo caricamento dell'immagine. Trovo macchinoso tentare di risolvere usando le callback.

![Texture Cloning Problems](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/00_texture_cloning.png)

Ho deciso di ricaricare l'immagine e creare una nuova texture indipendente per ogni materiale.

Qualche giorno dopo ho deciso di creare un unico materiale per ogni texture usata nella scena e clonare il materiale per ogni mesh. Questo *non* permette di settare un numero diverso di ripetizioni della texture per ogni BoxGeometry (e quindi dà un aspetto meno uniforme alle parti del corpo), ma permette di caricare una sola volta le immagini condividendole tra le mesh. Date le texture scelte, la non uniformità della loro scala nelle diverse parti del modello non dirturba particolarmente, quindi ho deciso di mantenere questa implementazione.

![Texture Scale](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/00_texture_final.png)

## Problemi con il terreno

Inizialmente ho generato il terreno "a colonne" (una BoxGeometry per ogni pixel della heightmap, scalata secondo il valore del grigio). Questo però rendeva difficile l'applicazione di texture sulle pareti più lunghe (rischio di deformazioni).

Ho generato quindi il terreno sovrapponendo in ogni punto un numero di cubi proporzionale al valore della heightmap. Questo ha causato un calo del framerate fino a 4 fps (anche usando clonazione di mesh e nessuna texture).

Ho quindi deciso di generare un terreno "cavo" (vengono creati solo i cubi superficiali e quelli che delimitano le pareti delle montagne). Questo ha permesso di rendere accettabile il framerate (25-30 fps).

![Terrain](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/02_terrain.png)

## Problemi con le ombre

Dopo aver modificato posizione, orientazione e colore della DirectionalLight le ombre non venivano più generate malgrado l'aggiunta di castShadow e receiveShadow sulle mesh.

A seguito di ricerca online ho visualizzato il frustum della camera della luce con un CameraHelper. Nessuna delle mesh rientrava nel frustum, quindi le ombre non venivano generate.

![No Shadows](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/01_no_shadows.png)

Ho aggiustato i valori dei piani della camera della luce per permettere la generazione delle ombre sulla scena.

![Shadows Are Visible](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/01_yes_shadows.png)
=======
![First problem](https://github.com/Interactive3DGraphicsCourse-UNIUD-2018/boxes-bportelli/blob/master/journal_files/cube_problems.png)

## 23/03/2018

Decided on the subject of the scene. Made some sketches. 

## 24/03/2018

Finalized sketches.
>>>>>>> 9e2b3692fe4d296341e5c5925df5f06d5a234d82
