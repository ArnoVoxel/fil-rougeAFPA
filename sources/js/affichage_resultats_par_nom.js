function display_search_results_name(album_key, id_album) {
  // création d'un élément de liste

  var li = document.createElement("li");
  li.setAttribute("class", "card col-6 col-sm-4 col-md-3 col-lg-2");
  li.style.backgroundColor = "#F3D8CD";
  li.style.listStyle = "none";
  document.getElementById("search_list").appendChild(li);

  // création de la row générale

  var row_results = document.createElement("div");
  row_results.setAttribute("class", "row");
  li.appendChild(row_results);

  // création de la colonne image

  var col_img = document.createElement("div");
  col_img.setAttribute("class", "col-12");
  row_results.appendChild(col_img);

  // création de l'image

  var img = document.createElement("img");

  img.setAttribute(
    "src",
    "../sources/albums/" +
      series.get(album_key.idSerie).nom.replace(regex, "") +
      "-" +
      album_key.numero +
      "-" +
      album_key.titre.replace(regex, "") +
      ".jpg"
  );
  img.className = "card-img-top img-fluid";
  col_img.appendChild(img);

  // création de la colonne d'informations

  var col_description = document.createElement("div");
  col_description.setAttribute("class", "col-12");
  row_results.appendChild(col_description);

  // ajout du titre

  var title = document.createElement("h4");
  //   title.setAttribute("class", "card-title");
  title.style.color = "blue";
  title.textContent = album_key.titre;
  col_description.appendChild(title);

  // ajout de la série

  var serie_name = document.createElement("p");
  //   serie_name.setAttribute("class", "card-text");
  serie_name.textContent = series.get(album_key.idSerie).nom;
  col_description.appendChild(serie_name);

  // ajout de l'auteur

  var author_name = document.createElement("p");
  //   author_name.setAttribute("class", "card-text");
  author_name.textContent = auteurs.get(album_key.idAuteur).nom;
  col_description.appendChild(author_name);

  // ajout du prix

  var price = document.createElement("p");
  //   price.setAttribute("class", "card-text");
  price.style.color = "green";
  price.textContent = album_key.prix + "€";
  col_description.appendChild(price);

  // création de la colonne pour le bouton ajouter au panier

  var div_button_container = document.createElement("div");
  div_button_container.setAttribute("class", "col-12");
  div_button_container.setAttribute("id", id_album);
  row_results.appendChild(div_button_container);

  var button_infos_serie = document.createElement("button");
  button_infos_serie.setAttribute("class", "btn btn-primary");
  button_infos_serie.setAttribute("data-bs-toggle", "modal");
  button_infos_serie.setAttribute("data-bs-target", "#bd_modal");
  button_infos_serie.textContent = "infos";
  button_infos_serie.addEventListener("click", afficher_infos_BD);
  div_button_container.appendChild(button_infos_serie);

  var button_panier_serie = document.createElement("button");
  button_panier_serie.setAttribute("class", "btn btn-primary");
  button_panier_serie.textContent = "ajout panier";
  button_panier_serie.addEventListener("click", creer_ligne_panier);
  button_panier_serie.addEventListener("click", bulle_bouton_panier);
  div_button_container.appendChild(button_panier_serie);
}
