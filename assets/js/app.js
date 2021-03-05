
// on objet qui contient des fonctions
var app = {

  // fonction d'initialisation, lancée au chargement de la page
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
    console.log(newList);

    // Insérer la nouvelle liste dans le DOM au bon endroit ! 
    // (sers toi par exemple de la méthode before ).
    document.querySelector('.card-lists').appendChild(newList);

    // Je referme la modale
    app.hideModals();

  }


};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);