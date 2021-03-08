

//const response = await fetch(new URL('http://okanban:okanban@localhost:5432/okanban'));
// on objet qui contient des fonctions
const app = {

  /**
   * URL de base pour faire des requetes vers notre API.
   */
  base_url: 'http://localhost:3000',

  /**
   * Initialisation de l'application.
   */
  init: function () {
    app.addListenerToActions();
    listModule.getListsFromAPI();
  },

  /**
   * Ajoute des écouteurs d'évènements sur les éléments de la pages.
   */
  addListenerToActions: () => {
    // On récupère notre bouton pour lui attacher un écouteur d'évenements
    const buttonElement = document.getElementById('addListButton');
    // console.log(buttonElement);
    // attacher l'écouteur d'évenement à mon bouton
    buttonElement.addEventListener('click', listModule.showAddListModal);

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
    addListForm.addEventListener('submit', listModule.handleAddListForm);

    // on récupère les boutons "+" situées sur les listes.
    const plusButtonsElements = document.querySelectorAll('.add-card-button');
    // Pour chaque click sur ces boutons on appelle la fonction qui ouvre la
    // modale contenant le formulaire d'ajout de carte
    plusButtonsElements.forEach((button) => {
      button.addEventListener('click', cardModule.showAddCardModal);
    });

      // alternative
    // for (const button of plusButtonsElements) {
    //   button.addEventListener('click', app.showAddCardModal);
    // }

    // On capture l'évenement 'submit' généré par le formulaire d'ajout de carte 
    const addCardForm = document.querySelector('#addCardModal form');
    addCardForm.addEventListener('submit', cardModule.handleAddCardForm);

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
};
// app.init();
// on accroche un écouteur d'évènement sur le document 
// quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);