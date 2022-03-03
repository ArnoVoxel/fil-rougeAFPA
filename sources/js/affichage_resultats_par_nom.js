function display_search_results_name(album_key) {
  // création d'un élément de liste

  var li = document.createElement("li");
  li.style.backgroundColor = "#F3D8CD";
  li.style.margin = "2vh";
  li.style.padding = "1vh";
  li.style.borderRadius = "15px";
  li.style.listStyle = "none";
  document.getElementById("search_results_name").appendChild(li);

  // création de la row générale

  var row_results = document.createElement("div");
  row_results.setAttribute("class", "row");
  li.appendChild(row_results);

  // création de la colonne image

  var col_img = document.createElement("div");
  col_img.setAttribute("class", "col-lg-3");
  row_results.appendChild(col_img);

  // création de l'image

  var img = document.createElement("img");

  img.setAttribute(
    "src",
    "../sources/albumsMini/" +
      series.get(album_key.idSerie).nom.replace(regex, "") +
      "-" +
      album_key.numero +
      "-" +
      album_key.titre.replace(regex, "") +
      ".jpg"
  );
  col_img.appendChild(img);

  // création de la colonne d'informations

  var col_description = document.createElement("div");
  col_description.setAttribute("class", "col-lg-6");
  row_results.appendChild(col_description);

  // ajout du titre

  var title = document.createElement("h2");
  title.textContent = album_key.titre;
  col_description.appendChild(title);

  // ajout du nom de la série en ajoutant my_ pour éviter les conflits de noms

  // var my_serie = document.createElement("p");
  // my_serie.textContent = "Série : " + series.get(album_key.idSerie).nom;
  // col_description.appendChild(my_serie);

  // ajout du nom de l'auteur

  // var author = document.createElement("p");
  // author.textContent = "Auteur : " + auteurs.get(album_key.idAuteur).nom;
  // col_description.appendChild(author);

  // ajout du numéro du tome

  // var tome = document.createElement("p");
  // tome.textContent = "Tome : " + album_key.numero;
  // col_description.appendChild(tome);

  // ajout du prix

  var price = document.createElement("p");
  price.textContent = "Prix : " + album_key.prix + "€";
  col_description.appendChild(price);

  // création de la colonne pour le bouton ajouter au panier

  var col_card = document.createElement("div");
  col_card.setAttribute("class", "col-lg-3");
  row_results.appendChild(col_card);

  // ajout bouton ajouter au panier

  var button_card = document.createElement("button");
  button_card.textContent = "Ajouter au panier";
  button_card.addEventListener("click", creer_ligne_panier);
  button_card.addEventListener("click", bulle_bouton_panier);
  col_card.appendChild(button_card);
}
