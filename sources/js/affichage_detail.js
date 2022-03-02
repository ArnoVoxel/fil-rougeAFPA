/**
 * afficher les détails d'une BD en cliquant sur son image
 */
function afficher_infos_BD() {
    var parent_div = this.parentNode;
    var parent_id = parent_div.id;
    console.log(parent_id);

    //affiche la div des détails
    document.getElementById('random_display').style.display = 'block';

    //cacher la div category
    document.getElementById('row_category').style.display = 'none';

    creation_elements_BD_grande(parent_id);
}

/**
 * elements HTML accueillant les infos de la BD
 * @param {id de la BD type string} id_BD 
 */
function creation_elements_BD_grande(id_BD) {

    var objet_grande_BD = albums.get(id_BD);

    document.getElementById('random_display').textContent = ' ';

    var row_container_BD_grande = document.createElement('div');
    row_container_BD_grande.setAttribute('class', 'row');
    document.getElementById('random_display').appendChild(row_container_BD_grande);

    //container de l'image BD
    var col_container_image_BD_grande = document.createElement('div');
    col_container_image_BD_grande.setAttribute('class', 'col-12 col-md-4');
    col_container_image_BD_grande.setAttribute('id', 'col_container_BD');
    row_container_BD_grande.appendChild(col_container_image_BD_grande);

    var col_image_BD = document.createElement('img');
    col_image_BD.setAttribute('class', 'col-12 img-fluid image_big');
    col_image_BD.setAttribute('src', '../sources/albums/' + series.get(objet_grande_BD.idSerie).nom.replace(regex, "") + '-' + objet_grande_BD.numero + '-' + objet_grande_BD.titre.replace(regex, "") + '.jpg');
    col_container_image_BD_grande.appendChild(col_image_BD);

    //container des infos BD
    var col_infos_BD_grande = document.createElement('div');
    col_infos_BD_grande.setAttribute('class', 'col-12 col-md-8');
    col_infos_BD_grande.setAttribute('id', id_BD);
    row_container_BD_grande.appendChild(col_infos_BD_grande);

    var col_titre_BD_grande = document.createElement('div');
    col_titre_BD_grande.setAttribute('class', 'col-12 col-md-8');
    col_titre_BD_grande.textContent = 'titre : ' + objet_grande_BD.titre;
    col_infos_BD_grande.appendChild(col_titre_BD_grande);

    var div_container_serie_tome = document.createElement('div');
    div_container_serie_tome.setAttribute('class', 'row');
    col_infos_BD_grande.appendChild(div_container_serie_tome);

    var col_serie_BD_grande = document.createElement('div');
    col_serie_BD_grande.setAttribute('class', 'col-6');
    col_serie_BD_grande.textContent = 'série : ' + series.get(objet_grande_BD.idSerie).nom;
    div_container_serie_tome.appendChild(col_serie_BD_grande);

    var col_tome_BD_grande = document.createElement('div');
    col_tome_BD_grande.setAttribute('class', 'col-6');
    col_tome_BD_grande.textContent = 'tome N° ' + objet_grande_BD.numero;
    div_container_serie_tome.appendChild(col_tome_BD_grande);

    var col_auteur_BD_grande = document.createElement('div');
    col_auteur_BD_grande.setAttribute('class', 'col-12');
    col_auteur_BD_grande.textContent = 'auteur : ' + auteurs.get(objet_grande_BD.idAuteur).nom;
    col_infos_BD_grande.appendChild(col_auteur_BD_grande);

    var col_prix_BD_grande = document.createElement('div');
    col_prix_BD_grande.setAttribute('class', 'col-12');
    col_prix_BD_grande.textContent = 'prix : ' + objet_grande_BD.prix + '€';
    col_infos_BD_grande.appendChild(col_prix_BD_grande);

    var col_resume_BD_grande = document.createElement('div');
    col_resume_BD_grande.setAttribute('class', 'col-12');
    col_resume_BD_grande.innerHTML = 'résumé : \nLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, pariatur. Voluptate hic ut molestias voluptatum cumque dicta quam nesciunt nulla animi accusamus. Harum tempora dolores sint officiis iusto enim nam!';
    col_infos_BD_grande.appendChild(col_resume_BD_grande);

    var col_bouton_panier_BD_grande = document.createElement('button');
    col_bouton_panier_BD_grande.setAttribute('id', 'bouton_panier_grande');
    col_bouton_panier_BD_grande.textContent = 'Ajouter au panier';
    col_bouton_panier_BD_grande.addEventListener('click', creer_ligne_panier);
    col_bouton_panier_BD_grande.addEventListener('click', bulle_bouton_panier);
    col_infos_BD_grande.appendChild(col_bouton_panier_BD_grande);
}