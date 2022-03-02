//déclaration
var objet_album = {};
var id_serie = 0;
var titre_album = "";
var auteur_album = "";

var nb_random = 0;

//attention aux accents dans les noms d'images
//RegEx pour les supprimer dans la concaténation
const regex = /['!?.":$]/g;


afficher_BD_random();

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
 * affiche 4 BD aléatoires pour simuler les catégories pré remplies
 */
function afficher_BD_random() {
    //boucle qui crée le nombre de BD dans la partie category
    //le nombre pourra être modifié par l'utilisateur
    for (let i = 0; i < 4; i++) {

        choisir_BD_random();
        //création div qui contiendra image, titre, prix et bouton infos
        var col_card_BD = document.createElement('div');
        col_card_BD.setAttribute('class', 'col-6 col-md-3 panier_category');
        col_card_BD.setAttribute('id', nb_random);
        document.getElementById('show_bd').appendChild(col_card_BD);

        var image_card_BD = document.createElement('img');
        image_card_BD.setAttribute('class', 'img-fluid image_grid');
        image_card_BD.setAttribute('src', '../sources/albums/' + series.get(objet_album.idSerie).nom.replace(regex, "") + '-' + objet_album.numero + '-' + objet_album.titre.replace(regex, "") + '.jpg');
        image_card_BD.addEventListener('click', afficher_infos_BD);
        document.getElementById(nb_random).appendChild(image_card_BD);

        var infos_card_BD = document.createElement('div');
        infos_card_BD.textContent = objet_album.titre + ', prix : ' + objet_album.prix;
        document.getElementById(nb_random).appendChild(infos_card_BD);

        var btn_card_BD = document.createElement('button');
        btn_card_BD.setAttribute('id', 'bouton_panier' + i);
        btn_card_BD.textContent = "ajouter au panier";
        btn_card_BD.addEventListener('click', creer_ligne_panier);
        btn_card_BD.addEventListener('click', bulle_bouton_panier);
        document.getElementById(nb_random).appendChild(btn_card_BD);
    }

    //afficher BD coup de coeur

    var titre_coup_de_coeur = document.createElement('div');
    titre_coup_de_coeur.setAttribute('class', 'col-12 mb-3');
    titre_coup_de_coeur.textContent = 'NOTRE COUP DE COEUR DU MOMENT';
    document.getElementById('random_display').appendChild(titre_coup_de_coeur);

    afficher_details_BD();
}

/**
 * affiche une image aléatoire en grand format pour la taille desktop
 */
function afficher_details_BD() {
    //valeur aléatoire pour affichage initial
    choisir_BD_random();

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
    col_infos_BD_grande.setAttribute('id', nb_random);
    document.getElementById('random_display').appendChild(col_infos_BD_grande);

    var col_serie_BD_grande = document.createElement('div');
    col_serie_BD_grande.setAttribute('class', 'col-12');
    col_serie_BD_grande.textContent = 'série : ' + series.get(objet_album.idSerie).nom;
    document.getElementById(nb_random).appendChild(col_serie_BD_grande);

    var col_titre_BD_grande = document.createElement('div');
    col_titre_BD_grande.setAttribute('class', 'col-12');
    col_titre_BD_grande.textContent = 'titre : ' + objet_album.titre;
    document.getElementById(nb_random).appendChild(col_titre_BD_grande);

    var col_auteur_BD_grande = document.createElement('div');
    col_auteur_BD_grande.setAttribute('class', 'col-12');
    col_auteur_BD_grande.textContent = 'auteur : ' + auteurs.get(objet_album.idAuteur).nom;
    document.getElementById(nb_random).appendChild(col_auteur_BD_grande);

    var col_tome_BD_grande = document.createElement('div');
    col_tome_BD_grande.setAttribute('class', 'col-12');
    col_tome_BD_grande.textContent = 'tome N° ' + objet_album.numero;
    document.getElementById(nb_random).appendChild(col_tome_BD_grande);

    var col_prix_BD_grande = document.createElement('div');
    col_prix_BD_grande.setAttribute('class', 'col-12');
    col_prix_BD_grande.textContent = 'prix : ' + objet_album.prix + '€';
    document.getElementById(nb_random).appendChild(col_prix_BD_grande);

    var col_resume_BD_grande = document.createElement('div');
    col_resume_BD_grande.setAttribute('class', 'col-12');
    col_resume_BD_grande.textContent = 'résumé : \nLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, pariatur. Voluptate hic ut molestias voluptatum cumque dicta quam nesciunt nulla animi accusamus. Harum tempora dolores sint officiis iusto enim nam!';
    document.getElementById(nb_random).appendChild(col_resume_BD_grande);

    var col_bouton_panier_BD_grande = document.createElement('button');
    col_bouton_panier_BD_grande.setAttribute('id', 'bouton_panier_grande');
    col_bouton_panier_BD_grande.textContent = 'Ajouter au panier';
    col_bouton_panier_BD_grande.addEventListener('click', creer_ligne_panier);
    col_bouton_panier_BD_grande.addEventListener('click', bulle_bouton_panier);
    document.getElementById(nb_random).appendChild(col_bouton_panier_BD_grande);
}