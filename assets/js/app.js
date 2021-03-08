
// on objet qui contient des fonctions
var app = {

  /**
   * URL de base pour faire des requetes vers notre API.
   */
  base_url: 'http://localhost:3000',

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.getListsFromAPI();
  },

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
      app.makeListInDOM(list.name, list.id);

      // Pour chaque liste, on veut récupérer la liste des cartes
      const responseCards = await fetch(`${app.base_url}/lists/${list.id}/cards`);
      const cards = await responseCards.json();

      // pour chaque carte reçue via l'API
      for (const card of cards) {
          //  on veut créer un bloc de HTML et l'insérer dans la bonne liste
          app.makeCardInDOM(card.title, card.list_id, card.id, card.color);
      }

    }
  },

  /**
   * Ajoute des écouteurs d'évènements sur les éléments de la pages.
   */
  addListenerToActions: () => {
    // On récupère notre bouton pour lui attacher un écouteur d'évenements
    const buttonElement = document.getElementById('addListButton');
    // console.log(buttonElement);
    // attacher l'écouteur d'évenement à mon bouton
    buttonElement.addEventListener('click', app.showAddListModal);

    // gestion du click sur les boutons de fermeture de la modal
    const buttonsElements = document.querySelectorAll('.modal button.close, .modal .modal-background');
    // console.log(buttonsElements);

    // On boucle sur tous nos boutons pour leur appliquer un écouteur d'évenement
    buttonsElements.forEach((button) => {
      button.addEventListener('click', app.hideModals);
    });

    // alternative
    // for (const button of buttonsElements) {
    //   button.addEventListener('click', app.hideModals);
    // }

    // On selection le formulaire d'ajout de liste.
    const addListForm = document.querySelector('#addListModal form');
    addListForm.addEventListener('submit', app.handleAddListForm);

    // on récupère les boutons "+" situées sur les listes.
    const plusButtonsElements = document.querySelectorAll('.add-card-button');
    // Pour chaque click sur ces boutons on appelle la fonction qui ouvre la
    // modale contenant le formulaire d'ajout de carte
    plusButtonsElements.forEach((button) => {
      button.addEventListener('click', app.showAddCardModal);
    });

      // alternative
    // for (const button of plusButtonsElements) {
    //   button.addEventListener('click', app.showAddCardModal);
    // }

    // On capture l'évenement 'submit' généré par le formulaire d'ajout de carte 
    const addCardForm = document.querySelector('#addCardModal form');
    addCardForm.addEventListener('submit', app.handleAddCardForm);

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
   * Ferme les modales en réaction à un évenement.
   */
  hideModals: () => {

    // On récupère toutes les modales
    const allModals = document.querySelectorAll('.modal');
    // On boucle dessus pour toute les fermer.
    for (const modal of allModals) {
      modal.classList.remove('is-active');
    };

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
        app.makeListInDOM(list.name, list.id);
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
        app.makeCardInDOM(card.title, card.list_id, card.id, card.color);
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
    // console.log(newList);

    // On écrit dans le code HTML de notre liste son identifiant. 
    newList.querySelector('.panel').setAttribute('data-list-id', listId);

    // On rajouter un écouter d'evenement pour gérer le clic sur le bouton
    // "+" de notre nouvelle liste.
    newList.querySelector('.add-card-button').addEventListener('click', app.showAddCardModal);

    // Insérer la nouvelle liste dans le DOM au bon endroit ! 
    // (sers toi par exemple de la méthode before ).
    document.querySelector('.card-lists').appendChild(newList);

    // Je referme la modale
    app.hideModals();

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

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);