/**
 * afficher les détails d'une BD en cliquant sur son image
 */
function afficher_infos_BD() {
    var parent_div = this.parentNode;
    var parent_id = parent_div.id;

    creation_elements_BD_grande(parent_id);
}

/**
 * elements infos de la BD pour le modal
 * @param {id de la BD type string} id_BD
 */
function creation_elements_BD_grande(id_BD) {
    var objet_grande_BD = albums.get(id_BD);

    document.getElementById("titre_bd_modal").textContent = objet_grande_BD.titre;

    document.getElementById("infos_bd_modal").textContent = " ";

    var image_bd_modal = document.createElement("img");
    image_bd_modal.setAttribute("class", "col-6");
    image_bd_modal.setAttribute(
        "src",
        "../sources/albums/" +
        series.get(objet_grande_BD.idSerie).nom.replace(regex, "") +
        "-" +
        objet_grande_BD.numero +
        "-" +
        objet_grande_BD.titre.replace(regex, "") +
        ".jpg"
    );
    document.getElementById("infos_bd_modal").appendChild(image_bd_modal);

    var block_resume_bd_modal = document.createElement("div");
    block_resume_bd_modal.setAttribute("class", "col-6");
    var titre_resume_bd_modal = document.createElement("div");
    titre_resume_bd_modal.textContent = "RESUME : ";
    block_resume_bd_modal.appendChild(titre_resume_bd_modal);
    var resume_bd_modal = document.createElement("p");
    resume_bd_modal.textContent =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, pariatur. Voluptate hic ut molestias voluptatum cumque dicta quam nesciunt nulla animi accusamus. Harum tempora dolores sint officiis iusto enim nam!";
    block_resume_bd_modal.appendChild(resume_bd_modal);
    var auteur_prix_bd_modal = document.createElement("div");
    block_resume_bd_modal.appendChild(auteur_prix_bd_modal);
    var serie_bd_modal = document.createElement("div");
    serie_bd_modal.textContent =
        "série : " + series.get(objet_grande_BD.idSerie).nom;
    auteur_prix_bd_modal.appendChild(serie_bd_modal);
    var auteur_bd_modal = document.createElement("div");
    auteur_bd_modal.textContent =
        "par : " + auteurs.get(objet_grande_BD.idAuteur).nom;
    auteur_prix_bd_modal.appendChild(auteur_bd_modal);
    var prix_bd_modal = document.createElement("div");
    prix_bd_modal.textContent = "prix : " + objet_grande_BD.prix + "€";
    auteur_prix_bd_modal.appendChild(prix_bd_modal);
    document.getElementById("infos_bd_modal").appendChild(block_resume_bd_modal);


    var footer_detail_bd_modal = document.createElement("div");
    footer_detail_bd_modal.setAttribute("class", "modal-footer");
    footer_detail_bd_modal.setAttribute("id", id_BD);
    document.getElementById("infos_bd_modal").appendChild(footer_detail_bd_modal);

    var bouton_fermer_infos_modal = document.createElement("button");
    bouton_fermer_infos_modal.setAttribute("type", "button");
    bouton_fermer_infos_modal.setAttribute("class", "btn btn-secondary");
    bouton_fermer_infos_modal.setAttribute("data-bs-dismiss", "modal");
    bouton_fermer_infos_modal.textContent = "Fermer";
    footer_detail_bd_modal.appendChild(bouton_fermer_infos_modal);

    var bouton_panier_infos_modal = document.createElement("button");
    bouton_panier_infos_modal.setAttribute("id", "ajout_panier_détail_bd");
    bouton_panier_infos_modal.setAttribute("type", "button");
    bouton_panier_infos_modal.setAttribute("class", "btn btn-secondary");
    bouton_panier_infos_modal.textContent = "Ajouter au panier";
    bouton_panier_infos_modal.addEventListener("click", creer_ligne_panier);
    bouton_panier_infos_modal.addEventListener("click", bulle_bouton_panier);
    footer_detail_bd_modal.appendChild(bouton_panier_infos_modal);
}