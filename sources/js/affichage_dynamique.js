//déclaration
var objet_album = {};
var id_serie = 0;
var titre_album = "";
var auteur_album = "";
var nombre_BD_category = 4;
var tableau_storage_category_last = [];
var tableau_storage_category_best = [];
var tableau_storage_category_classic = [];

var bouton_accueil = document.getElementById('accueil');
var bouton_panier_affichage_infos_modal = document.getElementById('ajout_panier_détail_bd');

var nb_random = 0;

//attention aux accents dans les noms d'images
//RegEx pour les supprimer dans la concaténation
const regex = /['!?.":$]/g;

creer_session_storage();

afficher_BD_random(tableau_storage_category_last, nombre_BD_category);

bouton_accueil.addEventListener('click', function() {
    afficher_BD_random(tableau_storage_category_last, nombre_BD_category);

    console.log(window.screen.width);

});

//prendre des valeurs random existantes dans la map albums.js
function choisir_BD_random() {
    do {
        //valeur aléatoire entre 1 et 629
        nb_random = parseInt(Math.random() * 629 + 1);
    } while (!albums.get(nb_random.toString()));

    //crée l'objet BD à partir du chiffre aléatorie
    objet_album = albums.get(nb_random.toString());

    return nb_random;
}

/**
 * créer les id en session Storage pour ne pas avoir un random à chaque retour sur l'accueil
 * à partir des valeurs random
 */
function creer_session_storage() {

    choisir_BD_random();
    var id_grand = nb_random;

    for (let i = 0; i < 12; i++) {
        choisir_BD_random();
        tableau_storage_category_last[i] = nb_random;
        choisir_BD_random();
        tableau_storage_category_best[i] = nb_random;
        choisir_BD_random();
        tableau_storage_category_classic[i] = nb_random;
    }

    sessionStorage.setItem('grand', id_grand);
    sessionStorage.setItem('last', '[' + tableau_storage_category_last + ']');
    sessionStorage.setItem('best', '[' + tableau_storage_category_best + ']');
    sessionStorage.setItem('classic', '[' + tableau_storage_category_classic + ']');

}

/**
 * affiche 4 BD aléatoires pour simuler les catégories pré remplies + la BD en taille desktop
 */
function afficher_BD_random(tableau_category, nombre_affichage) {

    //vider la div
    document.getElementById('show_bd').textContent = ' ';

    //boucle qui crée le nombre de BD dans la partie category
    //le nombre pourra être modifié par l'utilisateur
    for (let i = 0; i < nombre_affichage; i++) {

        // choisir_BD_random();

        objet_album = albums.get(tableau_category[i].toString());

        //création cards Bootstrap
        var card_category = document.createElement('card');
        card_category.style = 'width : 12rem;';
        card_category.setAttribute('class', 'col-6 col-md-3');
        document.getElementById('show_bd').appendChild(card_category);

        var card_image = document.createElement('img');
        card_image.setAttribute('src', '../sources/albums/' + series.get(objet_album.idSerie).nom.replace(regex, "") + '-' + objet_album.numero + '-' + objet_album.titre.replace(regex, "") + '.jpg');
        card_image.setAttribute('class', 'card-img-top');
        card_category.appendChild(card_image);

        var card_body = document.createElement('div');
        card_body.setAttribute('class', 'card-body');
        card_body.setAttribute('id', tableau_category[i]);
        card_category.appendChild(card_body);

        var card_titre_bd = document.createElement('h6');
        card_titre_bd.setAttribute('class', 'card-title');
        card_titre_bd.textContent = objet_album.titre;
        card_body.appendChild(card_titre_bd);

        var card_prix_bd = document.createElement('p');
        card_prix_bd.setAttribute('class', 'card-text');
        card_prix_bd.textContent = objet_album.prix + ' €';
        card_body.appendChild(card_prix_bd);

        var card_bouton_detail = document.createElement('button');
        card_bouton_detail.setAttribute('class', 'btn btn-primary ');
        card_bouton_detail.setAttribute('data-bs-toggle', 'modal');
        card_bouton_detail.setAttribute('data-bs-target', '#bd_modal');
        card_bouton_detail.addEventListener('click', afficher_infos_BD);
        card_bouton_detail.textContent = 'infos';
        card_body.appendChild(card_bouton_detail);

        var card_bouton_panier = document.createElement('button');
        card_bouton_panier.setAttribute('class', 'btn btn-primary bouton_panier_card');
        card_bouton_panier.innerHTML = '<img class="logo img-fluid" src="assets/panier.svg" alt="">';
        card_bouton_panier.addEventListener('click', creer_ligne_panier);
        card_bouton_panier.addEventListener('click', bulle_bouton_panier);
        card_body.appendChild(card_bouton_panier);
    }

    //afficher BD coup de coeur

    var titre_coup_de_coeur = document.createElement('div');
    titre_coup_de_coeur.setAttribute('class', 'col-12 mb-3');
    titre_coup_de_coeur.textContent = 'NOTRE COUP DE COEUR DU MOMENT';
    document.getElementById('random_display').appendChild(titre_coup_de_coeur);

    afficher_details_BD(sessionStorage.getItem('grand'));
}

/**
 * affiche une image aléatoire en grand format pour la taille desktop
 */
function afficher_details_BD(id_session_storage) {

    //clear la div
    document.getElementById('random_display').textContent = ' ';

    objet_album = albums.get(id_session_storage);

    //container de l'image BD
    var col_container_image_BD_grande = document.createElement('div');
    col_container_image_BD_grande.setAttribute('class', 'col-6');
    col_container_image_BD_grande.setAttribute('id', 'col_container_BD');
    document.getElementById('random_display').appendChild(col_container_image_BD_grande);

    var col_image_BD = document.createElement('img');
    col_image_BD.setAttribute('class', 'col-12 img-fluid image_big');
    col_image_BD.setAttribute('src', '../sources/albums/' + series.get(objet_album.idSerie).nom.replace(regex, "") + '-' + objet_album.numero + '-' + objet_album.titre.replace(regex, "") + '.jpg');
    document.getElementById('col_container_BD').appendChild(col_image_BD);

    //container des infos BD
    var col_infos_BD_grande = document.createElement('div');
    col_infos_BD_grande.setAttribute('class', 'col-6');
    col_infos_BD_grande.setAttribute('id', id_session_storage);
    document.getElementById('random_display').appendChild(col_infos_BD_grande);

    var col_serie_BD_grande = document.createElement('div');
    col_serie_BD_grande.setAttribute('class', 'col-12');
    col_serie_BD_grande.textContent = 'série : ' + series.get(objet_album.idSerie).nom;
    document.getElementById(id_session_storage).appendChild(col_serie_BD_grande);

    var col_titre_BD_grande = document.createElement('div');
    col_titre_BD_grande.setAttribute('class', 'col-12');
    col_titre_BD_grande.textContent = 'titre : ' + objet_album.titre;
    document.getElementById(id_session_storage).appendChild(col_titre_BD_grande);

    var col_auteur_BD_grande = document.createElement('div');
    col_auteur_BD_grande.setAttribute('class', 'col-12');
    col_auteur_BD_grande.textContent = 'auteur : ' + auteurs.get(objet_album.idAuteur).nom;
    document.getElementById(id_session_storage).appendChild(col_auteur_BD_grande);

    var col_tome_BD_grande = document.createElement('div');
    col_tome_BD_grande.setAttribute('class', 'col-12');
    col_tome_BD_grande.textContent = 'tome N° ' + objet_album.numero;
    document.getElementById(id_session_storage).appendChild(col_tome_BD_grande);

    var col_prix_BD_grande = document.createElement('div');
    col_prix_BD_grande.setAttribute('class', 'col-12');
    col_prix_BD_grande.textContent = 'prix : ' + objet_album.prix + '€';
    document.getElementById(id_session_storage).appendChild(col_prix_BD_grande);

    var col_resume_BD_grande = document.createElement('div');
    col_resume_BD_grande.setAttribute('class', 'col-12');
    col_resume_BD_grande.textContent = 'résumé : \nLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, pariatur. Voluptate hic ut molestias voluptatum cumque dicta quam nesciunt nulla animi accusamus. Harum tempora dolores sint officiis iusto enim nam!';
    document.getElementById(id_session_storage).appendChild(col_resume_BD_grande);

    var col_bouton_panier_BD_grande = document.createElement('button');
    col_bouton_panier_BD_grande.setAttribute('id', 'bouton_panier_grande');
    col_bouton_panier_BD_grande.textContent = 'Ajouter au panier';
    col_bouton_panier_BD_grande.addEventListener('click', creer_ligne_panier);
    col_bouton_panier_BD_grande.addEventListener('click', bulle_bouton_panier);
    document.getElementById(id_session_storage).appendChild(col_bouton_panier_BD_grande);
}