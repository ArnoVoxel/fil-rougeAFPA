//déclaration
const regex_connexion = /[<>]/gi;
var input_identifiant = document.getElementById('bouton_connexion');
var input_password = document.getElementById('password');

input_identifiant.addEventListener('click', verif_nom);
//pour pouvoir valider avec la touche entrée du clavier
input_password.addEventListener('keyup', function(event){
    if(event.key == "Enter"){
        console.log(event.key);
        verif_nom();
    }
});

/**
 * vérifie la correspondance entre les input du formulaire de connexion et les éléments de référence
 */
function verif_nom(){
    var input_value = document.getElementById('identifiant').value;
    var password_value = document.getElementById('password').value;

    var input_check = input_value;
    var password_check = password_value;
    input_check = input_value.replace(regex_connexion, "");
    password_check = password_value.replace(regex_connexion, "");

    if(input_check == "" || password_check == ""){
        alert("entrez un identifiant et un mot de passe");
    } else {
        var compteur_erreurs = 0;
        for (let i =1; i <= utilisateurs.size; i++) {
            if(input_check == utilisateurs.get(i.toString()).nom && password_check == utilisateurs.get(i.toString()).mdp){
                alert('Bonjour,\n'+input_check+' bienvenue!');
            } else {
                compteur_erreurs++;
            }
        }
        if(compteur_erreurs == utilisateurs.size) {
            alert("l'identifiant ou le mot de passe sont incorrects");
        }
    }
    document.getElementById('identifiant').value = '';
    document.getElementById('password').value ='';
}