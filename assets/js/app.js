
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

  }

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);