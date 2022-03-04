/**
 * afficher le nombre d'éléments avec le select
 */
function affichage_elements_category(e) {
    afficher_BD_random(JSON.parse(sessionStorage.getItem('last')), e.target.value);
}

function affichage_contenu_category(e) {
    document.getElementById('body_page').textContent = '';
    creer_liste_tri();
    creer_liste_nombre_affichage();

    var bd_container = document.createElement('div');
    bd_container.setAttribute('id', 'bd_container');
    bd_container.setAttribute('class', 'col-12 col-md-10');
    document.getElementById('body_page').appendChild(bd_container);

    // console.log(e);
    // console.log(e.target);
    // console.log(JSON.parse(sessionStorage.getItem(e.target.value)));


    //prendre en compte les valeurs series et auteur
    // if (JSON.parse(sessionStorage.getItem(e.target.value)) == null) {
    //     afficher_BD_random(JSON.parse(sessionStorage.getItem('last')), 4);
    // } else {
    afficher_BD_random(JSON.parse(sessionStorage.getItem(e.target.value)), 4);
    //}

}