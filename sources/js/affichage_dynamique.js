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
var bouton_utilisateur = document.getElementById('utilisateur');

var nb_random = 0;

//attention aux accents dans les noms d'images
//RegEx pour les supprimer dans la concaténation
const regex = /['!?.":$]/g;


//pour affichage à l'arrivée sur la page
creer_session_storage();

creer_liste_tri();
creer_liste_nombre_affichage();
afficher_BD_random(tableau_storage_category_last, nombre_BD_category);

bouton_accueil.addEventListener('click', function() {

    creer_liste_tri();
    creer_liste_nombre_affichage();
    afficher_BD_random(tableau_storage_category_last, nombre_BD_category);

});

bouton_utilisateur.addEventListener('click', function() {

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
    sessionStorage.setItem('series', 'séries');
    sessionStorage.setItem('authors', 'auteurs');

}

/**
 * affiche 4 BD aléatoires pour simuler les catégories pré remplies + la BD en taille desktop
 */
function afficher_BD_random(tableau_category, nombre_affichage) {

    document.getElementById('search_results_name').textContent = '';
    document.getElementById('body_page').textContent = '';

    creer_liste_tri();
    creer_liste_nombre_affichage();

    //créer les éléments en dynamique pour revenir à l'affichage accueil après une recherche
    var div_container_affichage_accueil = document.createElement('div');
    div_container_affichage_accueil.setAttribute('class', 'col-12 col-md-10');
    div_container_affichage_accueil.setAttribute('id', 'bd_container');
    document.getElementById('body_page').appendChild(div_container_affichage_accueil);

    var div_row_show_bd = document.createElement('div');
    div_row_show_bd.setAttribute('class', 'row');
    div_row_show_bd.setAttribute('id', 'show_bd');
    div_container_affichage_accueil.appendChild(div_row_show_bd);


    //vider la div
    document.getElementById('show_bd').textContent = ' ';
    //document.getElementById('body_page').textContent = ' ';

    //boucle qui crée le nombre de BD dans la partie category
    //le nombre pourra être modifié par l'utilisateur
    for (let i = 0; i < nombre_affichage; i++) {

        objet_album = albums.get(tableau_category[i].toString());

        //création cards Bootstrap
        var card_category = document.createElement('card');
        card_category.style = 'width : 12rem;';
        card_category.style.backgroundColor = "#F3D8CD";
        card_category.style.padding = "1vh";
        card_category.style.margin = "1vh";
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
        card_bouton_detail.setAttribute('class', 'btn');
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

/**
 * création des listes (menu déroulant) de tri en dynamique
 */
function creer_liste_tri() {
    //container du menu déroulant
    var div_category_container = document.createElement('div');
    div_category_container.setAttribute('id', 'category');
    div_category_container.setAttribute('class', 'col-6');
    document.getElementById('body_page').appendChild(div_category_container);


    var label_category = document.createElement('label');
    label_category.setAttribute('for', 'category');
    label_category.textContent = 'trier par : ';
    div_category_container.appendChild(label_category);

    var select_category = document.createElement('select');
    select_category.setAttribute('class', 'category');
    select_category.setAttribute('name', 'category');
    select_category.setAttribute('id', 'mobile_selection');

    //abonnements du select
    select_category.addEventListener('change', affichage_contenu_category);
    select_category.addEventListener('change', display_series);
    select_category.addEventListener('change', display_authors);


    div_category_container.appendChild(select_category);

    var option1_category = document.createElement('option');
    option1_category.setAttribute('value', 'last');
    option1_category.textContent = 'dernières sorties';
    select_category.appendChild(option1_category);

    var option2_category = document.createElement('option');
    option2_category.setAttribute('value', 'best');
    option2_category.textContent = 'meilleures ventes';
    select_category.appendChild(option2_category);

    var option3_category = document.createElement('option');
    option3_category.setAttribute('value', 'classic');
    option3_category.textContent = 'nos classiques';
    select_category.appendChild(option3_category);

    var option4_category = document.createElement('option');
    option4_category.setAttribute('value', 'series');
    option4_category.textContent = 'series';
    select_category.appendChild(option4_category);

    var option5_category = document.createElement('option');
    option5_category.setAttribute('value', 'authors');
    option5_category.textContent = 'auteurs';
    select_category.appendChild(option5_category);

    //liste déroulante pour affichage desktop
    var div_category2_container = document.createElement('div');
    div_category2_container.setAttribute('id', 'category2');
    div_category2_container.setAttribute('class', 'col-2');
    document.getElementById('body_page').appendChild(div_category2_container);

    var label_category2 = document.createElement('label');
    label_category2.setAttribute('for', 'category2');
    label_category2.textContent = 'trier par : ';
    div_category2_container.appendChild(label_category2);

    var select_category2 = document.createElement('select');
    select_category2.setAttribute('class', 'category');
    select_category2.setAttribute('name', 'category2');
    select_category2.setAttribute('id', 'desktop_selection');
    select_category2.addEventListener('change', affichage_contenu_category);
    select_category2.addEventListener('change', display_authors);
    select_category2.addEventListener('change', display_series);
    div_category2_container.appendChild(select_category2);

    var option1_category2 = document.createElement('option');
    option1_category2.setAttribute('value', 'last');
    option1_category2.textContent = 'dernières sorties';
    select_category2.appendChild(option1_category2);

    var option2_category2 = document.createElement('option');
    option2_category2.setAttribute('value', 'best');
    option2_category2.textContent = 'meilleures ventes';
    select_category2.appendChild(option2_category2);

    var option3_category2 = document.createElement('option');
    option3_category2.setAttribute('value', 'classic');
    option3_category2.textContent = 'nos classiques';
    select_category2.appendChild(option3_category2);

    var option4_category2 = document.createElement('option');
    option4_category2.setAttribute('value', 'series');
    option4_category2.textContent = 'series';
    select_category2.appendChild(option4_category2);

    var option5_category2 = document.createElement('option');
    option5_category2.setAttribute('value', 'authors');
    option5_category2.textContent = 'auteurs';
    select_category2.appendChild(option5_category2);
}

/**
 * création de la liste déroulante pour afficher len ombre d'éléments en mobile
 */
function creer_liste_nombre_affichage() {

    var div_nombre_container = document.createElement('div');
    div_nombre_container.setAttribute('id', 'nombre_bd');
    div_nombre_container.setAttribute('class', 'col-6');
    document.getElementById('body_page').appendChild(div_nombre_container);

    var label_nombre_affichage = document.createElement('label');
    label_nombre_affichage.setAttribute('for', 'nombre_bd');
    label_nombre_affichage.textContent = 'éléments affichés : ';
    div_nombre_container.appendChild(label_nombre_affichage);

    var select_nombre = document.createElement('select');
    select_nombre.setAttribute('class', 'nombre_bd');
    select_nombre.setAttribute('name', 'nombre_bd');
    select_nombre.addEventListener('change', affichage_elements_category);
    div_nombre_container.appendChild(select_nombre);

    var option1_nombre = document.createElement('option');
    option1_nombre.setAttribute('value', '4');
    option1_nombre.textContent = '4';
    select_nombre.appendChild(option1_nombre);

    var option2_nombre = document.createElement('option');
    option2_nombre.setAttribute('value', '8');
    option2_nombre.textContent = '8';
    select_nombre.appendChild(option2_nombre);

    var option3_nombre = document.createElement('option');
    option3_nombre.setAttribute('value', '12');
    option3_nombre.textContent = '12';
    select_nombre.appendChild(option3_nombre);
}