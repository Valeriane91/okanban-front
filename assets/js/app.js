
// on objet qui contient des fonctions
var app = {

  // fonction d'initialisation, lancée au chargement de la page
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


};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );