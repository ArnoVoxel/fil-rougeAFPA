//déclaration
var ligne_panier = 1;

//temporaire pour vider le Storage
var bouton_temp = document.getElementById('logo_utilisateur');
bouton_temp.addEventListener('click', function() {
    localStorage.clear();
    sessionStorage.clear();
});

//FONCTIONS

/**
 * création d'une ligne en local storage qui contient un objet stringify à partir de la map et l'id associée
 */
function creer_ligne_panier() {

    //contrôle si ligne existante pour ne pas l'écraser
    var ligneExistante = localStorage.getItem('ligne' + ligne_panier);

    while (typeof(ligneExistante) == 'string') {
        ligne_panier++;
        ligneExistante = localStorage.getItem('ligne' + ligne_panier);
    }

    //récupération de l'id dans la nom de div du parent
    var parent_div = this.parentNode;
    var parent_id = parent_div.id;

    localStorage.setItem('ligne' + ligne_panier, JSON.stringify(albums.get(parent_id)));
}

function bulle_bouton_panier() {
    document.getElementById('bulle_notification').textContent = ligne_panier;
    if (ligne_panier > 0) {
        document.getElementById('bulle_notification').style.visibility = 'visible';
    } else if (ligne_panier == 0) {
        document.getElementById('bulle_notification').style.visibility = 'hidden';
    }
}