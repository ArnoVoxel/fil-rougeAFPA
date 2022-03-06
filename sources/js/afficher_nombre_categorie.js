/**
 * afficher le nombre d'éléments avec le select
 * @param {valeur du menu déroulant} e 
 */
function affichage_elements_category(e) {
    afficher_BD_random(JSON.parse(sessionStorage.getItem('last')), e.target.value);
}

/**
 * 
 * @param {valeur du menu déroulant} e 
 */
function affichage_contenu_category(e) {
    document.getElementById('body_page').textContent = '';
    document.getElementById('nombre_bd').textContent = '';
    //creer_liste_tri();
    creer_liste_nombre_affichage();
    //document.getElementById('nombre_bd').style.display = 'inline-block';


    var bd_container = document.createElement('div');
    bd_container.setAttribute('id', 'bd_container');
    bd_container.setAttribute('class', 'col-12 col-md-10');
    document.getElementById('body_page').appendChild(bd_container);

    afficher_BD_random(JSON.parse(sessionStorage.getItem(e.target.value)), 4);

}