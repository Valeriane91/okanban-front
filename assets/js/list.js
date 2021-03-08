const listModule = {

    /**
    * Récupère les listes depuis l'API et créé le HTML correspondant dans la page.
    */
    getListsFromAPI: async () => {

        // On récupère les données depuis l'API
        const response = await fetch(`${app.base_url}/lists`);
        // console.log(response);
        // On les converti en un tableau d'objets JS qu'on stocke dans une variable.
        const lists = await response.json();
        console.log(lists);

        // pour chaque liste reçue via l'API
        for (const list of lists) {
            // créer un bloc de HTML dans notre page
            listModule.makeListInDOM(list.name, list.id);

            // Pour chaque liste, on veut récupérer la liste des cartes
            const responseCards = await fetch(`${app.base_url}/lists/${list.id}/cards`);
            const cards = await responseCards.json();

            // pour chaque carte reçue via l'API
            for (const card of cards) {
                //  on veut créer un bloc de HTML et l'insérer dans la bonne liste
                cardModule.makeCardInDOM(card.title, card.list_id, card.id, card.color);
            }

        }
    },

    /**
   * Affiche la modale en réaction au click sur le bouton "Ajouter une liste".
   * 
   * @param { Event } event - Les infos sur l'évenement en cours.
   */
    showAddListModal: (event) => {
        // console.log("Log de l'event :  ", event);
        const modale = document.getElementById('addListModal');

        // console.log(modale);
        modale.classList.add('is-active');
    },

    /**
   * Gère la soumission du formulaire d'ajout de liste.
   * 
   * @param { Event } event - Les infos sur l'évenement qui a déclanché l'appel.
   */
    handleAddListForm: async (event) => {
        // On empeche le formulaire de faire une requete POST par lui même.
        // Et donc en empeche la page de se recharger.
        event.preventDefault();
        // console.log(event.target);
        // récupère les données du formulaire
        const formData = new FormData(event.target);
        // console.log(formData.get('name'));

        // Envoie d'une requete POST vers l'API pour enregitrer la liste en BDD
        // On peut directement transmettre l'objet formData à fetch
        // pour qu'il envoie les données à l'API avec la requete POST.
        const paramRequest = {
            method: 'POST',
            body: formData
        };

        try {

            const response = await fetch(`${app.base_url}/lists`, paramRequest);
            console.log(response);

            // On teste si le code de retour de l'API est "positif"
            // si la requete à pu être traitée par le serveur
            // response.ok vaut true
            if (response.ok) {

                const list = await response.json();

                // On créé la liste avec le retour de l'API
                listModule.makeListInDOM(list.name, list.id);
            }
            else {
                const error = await response.json();
                throw error;
            }

        } catch (error) {
            // l'abscence de réponse de l'API sera par exemple capturée par le catch
            console.log("Error capturée par catch : ", error);
        }

    },

    /**
    * Ajoute une liste dans notre page HTML.
    * 
    * @param { String } listName - nom de la liste
    * @param { Number } listId - identifiant de la liste
    */
    makeListInDOM: (listName, listId) => {
        console.log(listName);

        // Récupérer le template, 
        const template = document.querySelector('#listTemplate');
        // puis je duplique le HTML contenu dans le template
        const newList = document.importNode(template.content, true);
        // Grâce à maListe.querySelector, mettre à jour le nom de la liste.
        newList.querySelector('h2').textContent = listName;
        // On prérempli le champs d'édition du nom de la liste avec le nom de la liste
        newList.querySelector('form input[name="name"]').value = listName;
        newList.querySelector('form input[name="id"]').value = listId;


        // console.log(newList);
        // au double click sur une liste, on affiche le formulaire de modification
        // d'une liste
        newList.querySelector('h2').addEventListener('dblclick', listModule.showEditListForm);
        newList.querySelector('form').addEventListener('submit', listModule.handleEditListForm);

        // On écrit dans le code HTML de notre liste son identifiant. 
        newList.querySelector('.panel').setAttribute('data-list-id', listId);

        // On rajouter un écouter d'evenement pour gérer le clic sur le bouton
        // "+" de notre nouvelle liste.
        newList.querySelector('.add-card-button').addEventListener('click', cardModule.showAddCardModal);

        // Insérer la nouvelle liste dans le DOM au bon endroit ! 
        // (sers toi par exemple de la méthode before ).
        document.querySelector('.card-lists').appendChild(newList);

        // Je referme la modale
        app.hideModals();

    },

    /**
     * Affiche le formulaire d'édition d'une liste.
     * 
     * @param { Event } event 
     */
    showEditListForm: (event) => {
        console.log(`Èdition d'une liste`);

        // on récupère la liste concérnée par la modification
        // pour ensuite dans cette liste vernir modifier les éléments
        // pour passer la liste en mode "édition"
        const listElement = event.target.closest('.panel');

        // afficher le formulaire d'édition
        // en lui enlevant la classe `is-hidden`
        listElement.querySelector('form').classList.remove('is-hidden');

        const input = listElement.querySelector('form input[name="name"]');
        // permet d'automatiquement mettre le curseur dans le champs
        // comme si l'utilisateur avait cliqué dessus.
        input.focus();

        // console.log(input);
        // masquer le titre
        // en lui ajoutant la classe `is-hidden`
        listElement.querySelector('h2').classList.add('is-hidden');
        
    },

    /**
     * Traitement du formulaire d'édition d'une liste
     * 
     * @param { Event } event 
     */
    handleEditListForm: async (event) => {
        event.preventDefault();


        // Récupérer les données du formulaire.
        const formData = new FormData(event.target);
        const listId = formData.get('id');

        // Résumé du try/catch
        // donc l'ordre c'est qu'on modifie un titre de liste, 
        // mais entre le moment où on modifie et le moment où on voit le titre s'affiché,
        //  on fait une requête PUT/PATCH vers la bdd pour voir si le titre remplit 
        // les conditions de sécurité établis en back et ensuite, 
        // si la bdd nous dit ok c'est bon, le nouveau titre est validé et il 
        // s'inscrit dans notre liste en lieu et place du précédent titre.
        
        try {
            // Faire une requete vers l'API pour enregistrer en BDD la modification
            // du titre de la liste
            const requestParam = {
                method: 'PATCH',
                body: formData
            };
            const response = await fetch(`${app.base_url}/lists/${listId}`, requestParam);
            
            if (!response.ok) {
                // si tout va mal
                const error = await response.json();
                throw error;
            }

            // Si tout va bien, modifier le H2 de la liste avec le titre.
            const listElement = event.target.closest('.panel');
            listElement.querySelector('h2').textContent = formData.get('name');
            
            // On masque le formulaire et on ré-affiche le titre.
            listElement.querySelector('form').classList.add('is-hidden');
            listElement.querySelector('h2').classList.remove('is-hidden');
            
        } catch (error) {
            console.log(error);   
        }
       

    }

}