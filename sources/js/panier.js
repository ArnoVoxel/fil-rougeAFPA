//déclaration
var ligne_panier = 1;
var total_panier = 0;

//pour vider le Storage
var bouton_temp = document.getElementById('paiement');
bouton_temp.addEventListener('click', function() {
    localStorage.clear();
    sessionStorage.clear();

    alert('VOUS AVEZ BIEN ETE PRELEVE, MERCI :)');
    afficher_contenu_panier();
    afficher_total_panier();
    bulle_bouton_panier();
});

bulle_bouton_panier();

//FONCTIONS

/**
 * création d'une ligne en local storage qui contient un objet stringify à partir de la map et l'id associée
 */
function creer_ligne_panier() {

    //récupération de l'id dans la nom de div du parent
    var parent_div = this.parentNode;
    var parent_id = parent_div.id;
    var is_ligne = true;

    //contrôle si ligne existante pour ne pas l'écraser
    var ligneExistante = localStorage.getItem('ligne' + ligne_panier);

    while (typeof(ligneExistante) == 'string') {

        //si ligne existante et titre déjà présent en local storage
        //alors incrémente la quantité
        if (JSON.parse(ligneExistante).id_album == parent_id) {
            var quantite_temp = JSON.parse(ligneExistante).quantite;
            quantite_temp += 1;
            localStorage.setItem('ligne' + ligne_panier, '{"id_album":' + parent_id + ',"quantite":' + quantite_temp + '}');
            is_ligne = false;
        }

        //sinon incrémente le numéro de ligne
        ligne_panier++;
        ligneExistante = localStorage.getItem('ligne' + ligne_panier);
    }

    //si il n'y a pas de ligne dont la quantité a augmenté
    //on peut créer une nouvelle ligne
    if (is_ligne) {
        localStorage.setItem('ligne' + ligne_panier, '{"id_album":' + parent_id + ',"quantite":1}');
    }

    ligne_panier = 1;
    is_ligne = true;
}

/**
 * incrémente la valeur de la bulle sur le bouton panier
 */
function bulle_bouton_panier() {
    document.getElementById('bulle_notification').textContent = localStorage.length;
    if (localStorage.length > 0) {
        document.getElementById('bulle_notification').style.visibility = 'visible';
    } else if (localStorage.length == 0) {
        document.getElementById('bulle_notification').style.visibility = 'hidden';
    }
}

/**
 * modifier les quantités dans le panier avec les boutons + et -
 */
function modifier_quantite_panier() {
    //donne la ligne correspondant en localStorage
    var ligne_panier_temp = JSON.parse(localStorage.getItem('ligne' + this.id.split('')[6]));
    var quantite_temp = ligne_panier_temp.quantite;

    var nom_bouton = this.id;

    if (nom_bouton.includes("+")) {
        quantite_temp += 1;
    } else {
        if (quantite_temp > 0) {
            quantite_temp -= 1;
        }
    }

    localStorage.setItem('ligne' + this.id.split('')[6], '{"id_album":' + ligne_panier_temp.id_album + ',"quantite":' + quantite_temp + '}');
    // afficher_contenu_panier();
    //modifier ici via les id pour ne pas changer les id des boutons
    var sous_total_temp = quantite_temp * albums.get((ligne_panier_temp.id_album.toString())).prix
    document.getElementById('sous_totalligne' + this.id.split('')[6]).textContent = sous_total_temp.toFixed(2);
    afficher_contenu_panier();
    afficher_total_panier();
}

function afficher_total_panier() {
    // var ligneExistante = localStorage.getItem('ligne' + ligne_panier);
    var ligneExistante = localStorage.getItem('ligne' + ligne_panier);
    total_panier = 0;

    if (localStorage.length > 0) {
        document.getElementById('row_panier_total').style.display = "block";
        for (let i = 0; i < localStorage.length; i++) {
            var objet_panier = JSON.parse(localStorage.getItem(localStorage.key(i)));
            total_panier += objet_panier.quantite * albums.get((objet_panier.id_album.toString())).prix;
        }
    } else {
        document.getElementById('contenu_panier').textContent = 'VOTRE PANIER EST VIDE';
        document.getElementById('row_panier_total').style.display = "none";
    }

    document.getElementById('montant_panier_total').textContent = total_panier.toFixed(2) + ' €';
    ligne_panier = 1;
}