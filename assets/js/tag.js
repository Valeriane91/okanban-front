const tagModule = {

    addToCard: (req, res) => {
        // Vérifier que la carte n'est pas déjà dans le deck avant de faire la requête
        // Voire aussi que le deck "peut" accepter une carte de plus => ça évite toute requête inutile !
        // Donc évidemment faut aussi avant tout créer le deck dans la session
        if (!req.session.card) {
            req.session.card = [];
        };

        if (req.session.card.find(tag => tag.id === parseInt(req.params.id)) || req.session.card.length >= 5) {
            return ;
        }

    }
        addTag: (req, res) => {
            formData.getOneTag(req.params.id, (err, cards) => {
              if (err) {
                console.error(err);
                return res.send(err);
              }
        
              const tag = tags.rows[0];
        
              console.log(req.session.card);
        
              // on s'assure que la variable existe en session
              if(!req.session.card) {
                req.session.card = [];
              }
        
              // on check si la carte n'est pas déjà dans le deck
              const present = req.session.card.filter( x=>x.id == tag.id ).length;
              
              // si la carte est présente ou que le deck est plein => on fait rien
              // (ici, on fait le test à l'envers)
              if (!present && req.session.card.length < 5) {
                req.session.card.push(tag);
              }
        
              return;
            });
          },
        
          removeCard: (req, res) => {
            // un petit check qui vaut pas cher et qui évite bien des soucis
            if (!req.session.card) {
              req.session.card = [];
            }
        
            // on filtre le deck directement dans la session.
            // oui, c'est tout ! :) 
            req.session.card = req.session.card.filter( x =>  x.id != req.params.id);
            
            return;
          }

}



