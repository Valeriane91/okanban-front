const cardModule = {

    /**
     * Affiche la modale d'ajout d'une carte en réaction au click sur le bouton "+".
     * 
     * @param { Event } event - Les infos sur l'évenement en cours.
     */
    showAddCardModal: (event) => {
        // console.log("Log de l'event :  ", event);
        const modale = document.getElementById('addCardModal');

        // .closest('.panel') nous permet de récupérer la liste dans laquelle
        // est contenue le bouton "+" qui a été cliqué.
        // closest() donctionne comme querySelector mais recherche dans les parents
        // plutot que dans les enfants d'un élément.
        const listElement = event.target.closest('.panel');
        // Pour retrouver l'id de la liste depuis 
        // son l'élément HTML correspondant, 
        // utilise element.getAttribute('data-list-id') ou 
        // element.dataset.listId 
        // console.log(modale);

        // Je récupère l'ID de la liste
        const listId = listElement.getAttribute('data-list-id');

        // je l'insere dans mon input caché
        modale.querySelector('input[name="list_id"]').value = listId;

        modale.classList.add('is-active');
    },

    /**
   * Gère la soumission du formulaire de création. d'une carte
   * @param { Event } event 
   */
    handleAddCardForm: async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const listId = formData.get('list_id');
        // solution temporaire pour gérer la position
        // TODO : gérer les positions de façon plus propre
        const nbOfCards = document.querySelectorAll(`[data-list-id='${listId}'] .box`).length;
        formData.append('position', nbOfCards + 1);

        try {

            // On envoie les donnéees de la carte vers l'API
            const paramRequest = {
                method: 'POST',
                body: formData
            };
            const response = await fetch(`${app.base_url}/cards`, paramRequest);

            if (response.ok) {
                const card = await response.json();
                // On créé la liste avec le retour de l'API
                cardModule.makeCardInDOM(card.title, card.list_id, card.id, card.color);
            }
            else {
                const error = await response.json();
                throw error;
            }

        } catch (error) {
            // l'abscence de réponse de l'API sera par exemple capturée par le catch
            console.log(error);
        }

    },

    /**
    * Créé une nouvelle carte dans la page HTML.
    * 
    * @param { String } title - titre de la carte 
    * @param { Number } listId - ID de la liste dans laquelle on va insérer la carte 
    * @param { Number } cardId - ID de la carte 
    * @param { String } cardColor - couleur de la carte
 
    */
    makeCardInDOM: (title, listId, cardId, cardColor) => {

        // Récupérer le template, 
        const template = document.querySelector('#cardTemplate');
        // puis je duplique le HTML contenu dans le template
        const newCard = document.importNode(template.content, true);

        // on insére le titre de la nouvelle carte dans le HTML de la nouvelle carte 
        newCard.querySelector('.card__title').textContent = title;
        // console.log(newCard);
        // console.log(cardColor);
        newCard.querySelector('.box').setAttribute('data-card-id', cardId);
        // newCard.querySelector('.box').style.backgroundColor = cardColor;
        // alternative
        // newCard.querySelector('.box').setAttribute("style",`background-color: ${cardColor}`);

        newCard.querySelector('.box').style.border = `2px solid ${cardColor}`;

        // // Insérer la nouvelle carte dans le DOM au bon endroit ! 
        // Le bon endroit est la liste qui a pour attribut data-list-id la valeur
        // passé en parametre dans la variable listId
        // console.log(listId);
        document.querySelector(`[data-list-id="${listId}"] .panel-block`).appendChild(newCard);

        // // Je referme la modale
        app.hideModals();

    }

}