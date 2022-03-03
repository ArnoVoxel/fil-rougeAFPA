//déclaration
var numero_ligne_storage = 1;
var bouton_panier_barre_navigation = document.getElementById(
  "bouton_panier_barre_navigation"
);

bouton_panier_barre_navigation.addEventListener(
  "click",
  afficher_contenu_panier
);

function afficher_contenu_panier() {
  if (typeof localStorage.getItem("ligne" + numero_ligne_storage) != "string") {
    document.getElementById("contenu_panier").textContent =
      "VOTRE PANIER EST VIDE";
  } else {
    while (
      typeof localStorage.getItem("ligne" + numero_ligne_storage) == "string"
    ) {
      var objet_panier = JSON.parse(
        localStorage.getItem("ligne" + numero_ligne_storage)
      );
      numero_ligne_storage++;
      creer_element_html_panier(objet_panier);
    }
  }
}

function creer_element_html_panier(objet_album) {
  var ligne_affichage_panier = document.createElement("div");
  ligne_affichage_panier.setAttribute("class", "row");
  document.getElementById("contenu_panier").appendChild(ligne_affichage_panier);

  var image_panier = document.createElement("img");
  image_panier.setAttribute("class", "col-2 mb-1 image_panier");
  image_panier.setAttribute(
    "src",
    "../sources/albums/" +
      series.get(objet_album.idSerie).nom.replace(regex, "") +
      "-" +
      objet_album.numero +
      "-" +
      objet_album.titre.replace(regex, "") +
      ".jpg"
  );
  ligne_affichage_panier.appendChild(image_panier);

  var titre_panier = document.createElement("div");
  titre_panier.setAttribute("class", "col-4");
  titre_panier.textContent = objet_album.titre;
  ligne_affichage_panier.appendChild(titre_panier);

  var prix_panier = document.createElement("div");
  prix_panier.setAttribute("class", "col-2");
  prix_panier.textContent = objet_album.prix + " €";
  ligne_affichage_panier.appendChild(prix_panier);

  //container pour la quantité et ses boutons
  var quantite_container_panier = document.createElement("div");
  quantite_container_panier.setAttribute("class", "col-2");
  ligne_affichage_panier.appendChild(quantite_container_panier);

  var quantite_row_panier = document.createElement("div");
  quantite_row_panier.setAttribute("class", "row");
  quantite_container_panier.appendChild(quantite_row_panier);

  //quantité panier
  var quantite_panier = document.createElement("div");
  quantite_panier.setAttribute("class", "col-12");
  quantite_panier.textContent = "1";
  quantite_row_panier.appendChild(quantite_panier);

  //boutons du panier
  var bouton_plus = document.createElement("button");
  bouton_plus.textContent = "+";
  quantite_row_panier.appendChild(bouton_plus);

  var bouton_moins = document.createElement("button");
  bouton_moins.textContent = "-";
  quantite_row_panier.appendChild(bouton_moins);

  var sous_total_panier = document.createElement("div");
  sous_total_panier.setAttribute("class", "col-2");
  sous_total_panier.textContent = objet_album.prix;
  ligne_affichage_panier.appendChild(sous_total_panier);

  //bouton supprimer
}
