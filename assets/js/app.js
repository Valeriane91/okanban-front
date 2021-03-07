
// on objet qui contient des fonctions
var app = {

  // fonction d'initialisation, lancée au chargement de la page
<<<<<<< HEAD
  init: function (addListenerToActions) {
    console.log('app.init !', addListenerToActions);
    //une fois qu'on a fait une fonction il faut l'appeler
    app.addListenerToActions();
  }
  // Ajout d'une méthode addListenerToActions et récupérer le bouton "ajouter une liste"
  addListenerToActions: () => {
    const buttonElement = document.getElementById('addListButton');
    //console.log(buttonElement);
    buttonElement.addEventListener("click", app.showAddListModal);

    // gestion des bouton de fermeture de la modale

    const bouton = document.querySelectorAll('.modal .close'); // les elements qui ont la classe modal et la classe close avec queryselector
    //console.log(bouton);
    bouton.forEach(buts) => { 
    buts.addEventListener("click", app.hideModals);};
    // bouton ce n'est pas un élément html mais une liste
    //donc il faut faire un for each


    
    //récupérer le bon formulaire grâce à document.querySelector
    const formulaire = document.querySelector("#input");
    formulaire.addEventListener("submit", app.handleAddListForm);
  


  handleAddListForm: (event) => {

   // document.getElementById("").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
    event.preventDefault();
    console.log(event.target);// target c'est qui a déclencher l'élément
    const formData = new FormData(evant.target);//va consulter le contenu de chaque formulaire et le mettre a disposition



  }
  // coder hideModals qui enlève la classe "is-active" à toutes les modales

  hideModals: function () {
    var modal = document.getElementById("close");
    modal.classList.remove("modal is-active");

  }

  //Ajout de la méthode showAddListModal
  showAddListModal: (event) => {
    var addModal = document.getElementById("addListModal");
    addModal.classList.add('is-active');
  
  }

};

var app = {

  makeListInDOM: function () {

    var template = document.getElementById('my-paragraph');
    var templateContent = template.content;
    //document.body.appendChild(templateContent);
  
  }


=======
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
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
  handleAddListForm: (event) => {
    // On empeche le formulaire de faire une requete POST par lui même.
    // Et donc en empeche la page de se recharger.
    event.preventDefault();
    // console.log(event.target);
    // récupère les données du formulaire
    const formData = new FormData(event.target);
    // console.log(formData.get('name'));

    app.makeListInDOM(formData.get('name'));

  },

  handleAddCardForm: (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // console.log(formData.get('title'));
    app.makeCardInDOM(formData.get('title'), formData.get('list_id'));
    
  },

  /**
   * Ajoute une liste dans notre page HTML.
   * 
   * @param { String } listName 
   */
  makeListInDOM: (listName) => {
    console.log(listName);

    // Récupérer le template, 
    const template = document.querySelector('#listTemplate');
    // puis je duplique le HTML contenu dans le template
    const newList = document.importNode(template.content, true);
    // Grâce à maListe.querySelector, mettre à jour le nom de la liste.
    newList.querySelector('h2').textContent = listName;
    // console.log(newList);

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
   * @param { String } listId - ID de la liste dans laquelle on va insérer la carte 
   */
  makeCardInDOM: (title, listId) => {

    // Récupérer le template, 
    const template = document.querySelector('#cardTemplate');
    // puis je duplique le HTML contenu dans le template
    const newCard = document.importNode(template.content, true);

    // on insére le titre de la nouvelle carte dans le HTML de la nouvelle carte 
    newCard.querySelector('.card__title').textContent = title;
    // console.log(newCard);

    // // Insérer la nouvelle carte dans le DOM au bon endroit ! 
    // Le bon endroit est la liste qui a pour attribut data-list-id la valeur
    // passé en parametre dans la variable listId
    console.log(listId);
    document.querySelector(`[data-list-id="${listId}"] .panel-block`).appendChild(newCard);

    // // Je referme la modale
    app.hideModals();

  }

>>>>>>> 50cdb797b380bb91ebf442139183b0b330642092
};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', app.init );
=======
document.addEventListener('DOMContentLoaded', app.init);
>>>>>>> 50cdb797b380bb91ebf442139183b0b330642092
