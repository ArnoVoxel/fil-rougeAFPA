//déclaration
var objet_album = {};
var id_serie = 0;
var titre_album = "";
var auteur_album = "";

//attention aux accents dans les noms d'images
//RegEx pour les supprimer dans la concaténation
const regex = /['!?.":$]/g;


afficher_BD_random();

function choisir_BD_random() {
    do {
        //valeur aléatoire entre 1 et 629
        var nb_random = parseInt(Math.random() * 629 + 1);
    } while (!albums.get(nb_random.toString()));

    //crée l'objet BD à partir du chiffre aléatorie
    objet_album = albums.get(nb_random.toString());

}

function afficher_BD_random() {
    //boucle qui crée le nombre de BD dans la partie category
    //le nombre pourra être modifié par l'utilisateur
    for (let i = 0; i < 4; i++) {

        choisir_BD_random();
        //création div qui contiendra image, titre, prix et bouton infos
        var col_card_BD = document.createElement('div');
        col_card_BD.setAttribute('class', 'col-6 col-md-3');
        col_card_BD.setAttribute('id', 'col_card_BD_category' + i);
        document.getElementById('show_bd').appendChild(col_card_BD);

        var image_card_BD = document.createElement('img');
        image_card_BD.setAttribute('class', 'img-fluid image_grid');
        image_card_BD.setAttribute('src', '../sources/albums/' + series.get(objet_album.idSerie).nom.replace(regex, "") + '-' + objet_album.numero + '-' + objet_album.titre.replace(regex, "") + '.jpg');
        document.getElementById('col_card_BD_category' + i).appendChild(image_card_BD);

        var infos_card_BD = document.createElement('div');
        infos_card_BD.textContent = objet_album.titre + ', prix : ' + objet_album.prix;
        document.getElementById('col_card_BD_category' + i).appendChild(infos_card_BD);

        var btn_card_BD = document.createElement('button');
        btn_card_BD.setAttribute('id', 'bouton_panier' + i);
        btn_card_BD.textContent = "ajouter au panier";
        document.getElementById('col_card_BD_category' + i).appendChild(btn_card_BD);
    }

    //afficher BD coup de coeur

    var titre_coup_de_coeur = document.createElement('div');
    titre_coup_de_coeur.setAttribute('class', 'col-12 mb-3');
    titre_coup_de_coeur.textContent = 'NOTRE COUP DE COEUR DU MOMENT';
    document.getElementById('random_display').appendChild(titre_coup_de_coeur);

    afficher_details_BD();
}

function afficher_details_BD() {
    //valeur aléatoire pour affichage initial
    choisir_BD_random();

    var col_detail_BD = document.createElement('div');
    col_detail_BD.setAttribute('class', 'col-6');
    col_detail_BD.setAttribute('id', 'col_image_détail_BD');
    document.getElementById('random_display').appendChild(col_detail_BD);

    var col_image_BD = document.createElement('img');
    col_image_BD.setAttribute('class', 'col-12 img-fluid image_big');
    col_image_BD.setAttribute('src', '../sources/albums/' + series.get(objet_album.idSerie).nom.replace(regex, "") + '-' + objet_album.numero + '-' + objet_album.titre.replace(regex, "") + '.jpg');
    document.getElementById('col_image_détail_BD').appendChild(col_image_BD);


}