const app = {
    /**
     * Initialisation de notre application
     */
    init: () => {
        // temporaire
        // app.createPweet('Notre premier pweet !');
        // app.createPweet('Notre second pweet !');
        app.addListeners();
    },

    /**
     * Ajoute les écouteurs d'évènement sur la page
     */
    addListeners: () => {
        // ajouter un écouteur d'evenement sur le formulaire
        // pour capturer l'évenement submit et appeler la fonction
        // handleCreateForm en réaction
        // On pose un écouteur d'évènements sur le formulaire lui même
        // pour détecter sa soumission, son envoie, l'intercepter
        // et gérer les données de ce formulaire.
        const form = document.querySelector('.create-pweet-form');
        form.addEventListener('submit', app.handleCreateForm);
    },

    /**
     * Gère la soumission du formulaire de création de pweet.
     * 
     * @param { Event } event 
     */
    handleCreateForm: (event) => {
        event.preventDefault();

        //event = un objet contenant toutes les infos de l'évènement déclenché
        // event.target = ce qui as déclenché l'évènement ?
        // const form = document.querySelector('.create-pweet-form');
        const form = event.target;
        console.log("Cible de l'évenement", event.target);

        // Créer un objet formData
        const formData = new FormData(form);
        // récupérer le message depuis l'objet formData et le stocker dans
        // la variable message
        // On récupère la valeur du champs dont l'attribut name vaut `message` de notre formulaire
        const message = formData.get('message');

        // console.log("Message transmis", message);
        app.createPweet(message);
    },

    /**
     * Créer un nouveau pweet dans notre div.pweet-list
     * avec le message fourni en parametre.
     * 
     * Le code HTML pour créer le pweet est disponible dans 
     * la balise template ayant pour id pweetTemplate
     * 
     * @param { String } message 
     */
    createPweet: (message) => {
        // Récupérer le HTML d'un pweet vierge
        // Accéder au template contenant le HTML d'un pweet
        const template = document.querySelector('#pweetTemplate');
        // const newPweet = template.content;
        // cloner ce HTML pour créer un nouvel élément
        // On copie le contenu du template dans un nouvel élément avec tous ses
        // enfants
        const newPweet = document.importNode(template.content, true);

        // Et on y insérer le message
        newPweet.querySelector(".content").textContent = message;

        // alternative en 2 lignes
        // const messageContainer =  newPweet.querySelector(".content");
        // messageContainer.textContent = message;

        // insérer notre nouveau pweet dans la page, dans la div.timeline
        document.querySelector('.pweet-list').appendChild(newPweet);
    }
}

// attendre que la page soit completement chargée
// avant d'executer la fonction init
document.addEventListener('DOMContentLoaded', app.init);