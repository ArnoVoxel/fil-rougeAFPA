//déclaration
var numero_ligne_storage = 1;
var bouton_panier_barre_navigation = document.getElementById('bouton_panier_barre_navigation');

bouton_panier_barre_navigation.addEventListener('click', afficher_contenu_panier);

function afficher_contenu_panier() {

    document.getElementById('contenu_panier').textContent = ' ';

    for (let i = 0; i < localStorage.length; i++) {
        var objet_panier = JSON.parse(localStorage.getItem(localStorage.key(i)));
        numero_ligne_storage++;
        creer_element_html_panier(objet_panier, localStorage.key(i));
    }

    numero_ligne_storage = 1;
    afficher_total_panier();
}

function creer_element_html_panier(objet_album, indice_local_storage) {

    var id_album_local_storage = objet_album.id_album;
    var element_album = albums.get(id_album_local_storage.toString());
    var ligne_affichage_panier = document.getElementById('contenu_panier');

    //div pour meilleur responsive (avant append dans ligne_affichage_panier au lieu de div_container_ligne_panier)
    var div_container_ligne_panier = document.createElement('div');
    div_container_ligne_panier.setAttribute('class', 'col-12');
    ligne_affichage_panier.appendChild(div_container_ligne_panier);

    var row_container_ligne_panier = document.createElement('div');
    row_container_ligne_panier.setAttribute('class', 'row mb-2');
    div_container_ligne_panier.appendChild(row_container_ligne_panier);

    var image_panier = document.createElement('img');
    image_panier.setAttribute('class', 'col-2 image_panier');
    image_panier.setAttribute('src', '../sources/albums/' + series.get(element_album.idSerie).nom.replace(regex, "") + '-' + element_album.numero + '-' + element_album.titre.replace(regex, "") + '.jpg');
    row_container_ligne_panier.appendChild(image_panier);

    var titre_panier = document.createElement('div');
    titre_panier.setAttribute('class', 'col-4');
    titre_panier.textContent = element_album.titre;
    row_container_ligne_panier.appendChild(titre_panier);

    var prix_panier = document.createElement('div');
    prix_panier.setAttribute('class', 'col-2');
    prix_panier.textContent = element_album.prix + ' €';
    row_container_ligne_panier.appendChild(prix_panier);

    //container pour la quantité et ses boutons
    var quantite_container_panier = document.createElement('div');
    quantite_container_panier.setAttribute('class', 'col-2');
    row_container_ligne_panier.appendChild(quantite_container_panier);

    var quantite_row_panier = document.createElement('div');
    quantite_row_panier.setAttribute('class', 'row');
    quantite_container_panier.appendChild(quantite_row_panier);

    //quantité panier
    var quantite_panier = document.createElement('div');
    quantite_panier.setAttribute('class', 'col-12');
    quantite_panier.textContent = objet_album.quantite;
    quantite_row_panier.appendChild(quantite_panier);

    //boutons du panier
    var bouton_plus = document.createElement('button');
    bouton_plus.setAttribute('class', 'col-6');
    bouton_plus.setAttribute('id', '+' + indice_local_storage);
    bouton_plus.textContent = '+';
    //créer un abonnement pour la quantité
    bouton_plus.addEventListener('click', modifier_quantite_panier);
    quantite_row_panier.appendChild(bouton_plus);

    var bouton_moins = document.createElement('button');
    bouton_moins.setAttribute('class', 'col-6');
    bouton_moins.setAttribute('id', '-' + indice_local_storage);
    bouton_moins.textContent = '-';
    //créer un abonnement pour la quantité
    bouton_moins.addEventListener('click', modifier_quantite_panier);
    quantite_row_panier.appendChild(bouton_moins);

    var sous_total_container_panier = document.createElement('div');
    sous_total_container_panier.setAttribute('class', 'col-2');
    row_container_ligne_panier.appendChild(sous_total_container_panier);

    var sous_total_panier = document.createElement('div');
    sous_total_panier.setAttribute('class', 'row');
    sous_total_container_panier.appendChild(sous_total_panier);

    var sous_total_valeur_panier = document.createElement('div');
    sous_total_valeur_panier.setAttribute('class', 'col-12 sous_total');
    sous_total_valeur_panier.setAttribute('id', 'sous_total' + indice_local_storage);
    sous_total_valeur_panier.textContent = (element_album.prix * objet_album.quantite).toFixed(2) + ' €';
    sous_total_panier.appendChild(sous_total_valeur_panier);

    //bouton supprimer
    var bouton_supprimer = document.createElement('button');
    bouton_supprimer.setAttribute('class', 'col-12 ms-5 bouton_supprimer');
    bouton_supprimer.setAttribute('id', 'X' + indice_local_storage);
    bouton_supprimer.addEventListener('click', supprimer_ligne_panier);
    bouton_supprimer.textContent = 'x';
    sous_total_panier.appendChild(bouton_supprimer);
}