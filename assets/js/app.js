
// on objet qui contient des fonctions
var app = {

  // fonction d'initialisation, lancée au chargement de la page
  init: function (addListenerToActions) {
    console.log('app.init !', addListenerToActions);
  }
  // Ajout d'une méthode addListenerToActions et récupérer le bouton "ajouter une liste"
  addListenerToActions: function () {
    var button = document.getElementById("addListButton");
    button.addEventListener("click", app.showAddListModal);

    var bouton = document.querySelectorAll("#close");
    bouton.addEventListener("click", app.hideModals);
    
    //récupérer le bon formulaire grâce à document.querySelector
    var formulaire = document.querySelector("#input");
    formulaire.addEventListener("submit", app.handleAddListForm);
  
  }

  handleAddListForm: function(event) {
    document.getElementById("").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
    event.preventDefault();

  }
  // coder hideModals qui enlève la classe "is-active" à toutes les modales

  hideModals: function () {
    var modal = document.getElementById("close");
    modal.classList.remove("modal is-active");

  }

  //Ajout de la méthode showAddListModal
  showAddListModal: function (){
    var addModal = document.getElementById("addListModal");
    addModal;
  
  }

};

var app = {

  makeListInDOM: function () {

    var template = document.getElementById('my-paragraph');
    var templateContent = template.content;
    document.body.appendChild(templateContent);
  
  }


};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );