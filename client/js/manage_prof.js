
// Objective: manage the professor dashboard
const dashboardProfProfile = document.querySelector(".profile--teacher");
const firstNameProfProfile = dashboardProfProfile.querySelector(".first_name_input");
const lastNameProfProfile = dashboardProfProfile.querySelector(".last_name_input");
const dateNaissProfProfile = dashboardProfProfile.querySelector(".date_input");
const telProfProfile = dashboardProfProfile.querySelector(".tel_input");
const villeProfProfile = dashboardProfProfile.querySelector(".ville_input");
const quartierProfProfile = dashboardProfProfile.querySelector(".quartier_input");
const levelProfProfile = dashboardProfProfile.querySelector(".level_input");
const emailProfProfile = dashboardProfProfile.querySelector(".email_input");

const dashContentgroup = document.querySelector(".dash_content--group");
const dashboarddisplaygroup = document.querySelector(".main_dashboard--display-grp");
const dashboards = document.querySelectorAll(".dashboard_container");
const profilBtn = document.querySelector(".bar_link--profil");
const btnAbsenceActuel = document.querySelector(".abs_reminder");
const btnAbsence = document.querySelector(".grp_btn_abs");
const dashAbsenceList = document.querySelector(".abscence_list");
const mainDashboardAbs = document.querySelector(".main_dashboard--abs");
const listeAbs = document.querySelector(".abs_list");
const submitAbsenceBtn = document.querySelector(".submit_btn_abs");
const dashheaderabs = document.querySelector(".dash_header_abs");
const studentsList = dashboarddisplaygroup.querySelector(".box_list_students");
const logoutBtn = document.querySelector(".logout_btn");

let allgroups_Data = [];
let professeur_Data = [];
let group_Data = [];
let etudiants_Data = [];
// let etudiantsAbsents = [];
// localStorage.setItem('idProf',1);

const dateActuelle = new Date();


//get groups by idprof
fetch(`http://localhost:5000/getGroup/${localStorage.getItem('idProf')}`)
  .then(response => response.json())
  .then(group => {
    //console.log(group)
    allgroups_Data = [...group.data];
  })
    .then(() => {
	dashContentgroup.innerHTML = "";
    allgroups_Data.forEach(group=>{
        //console.log(group);
        if (group.Statut === "Active") {
		const htmlEl = `
        <div data-id=${group.Id_Group} class="grp_box grp-${group.TypeFormation.toLowerCase()}">
        <div class="grp_box_header flex">
          <h4>${group.TypeFormation}</h4>
          <span>${group.Nom_Matier}</span>
        </div>
        <ul class="grp_box_list">
          <li class="box_list_item">
            <p>ID du Groupe</p>
            <p>${group.Id_Group}</p>
          </li>
          <li class="box_list_item">
            <p>Status</p>
            <p>${group.Statut}</p>
          </li>
          <li class="box_list_item">
            <p>Nombre d'etudiants</p>
            <p>${group.nbr_Etudiant}</p>
          </li>
        </ul>
        <a href="#" class="grp_btn grp_btn_sm">Voir Les Details</a>
      </div>
    </div>`;
    dashContentgroup.insertAdjacentHTML("beforeend", htmlEl);
        }
    })
})
.then(() => {
    btnAbsenceActuel.innerHTML = "";
    allgroups_Data.forEach(group=>{
        if (verifierAbsence(group)) {
            const htmlEl = `
                <a href="./" class="flex"
                ><span>Abscence du</br>Group ${group.Id_Group}</br>Le ${group.Jour_seance} a ${group.Num_seance == 1 ? '17:00' : '19:00'}
                </span></a>
            `;
        btnAbsenceActuel.insertAdjacentHTML("beforeend", htmlEl);
        }
    })
})

//get group data by idgroup
dashContentgroup.addEventListener("click", function(e)
{
    e.preventDefault();
    const list_students = [];
    const clickedBtn = e.target.closest(".grp_btn");
    if (!clickedBtn)
        return ;
    
    dashboards.forEach(dash=>dash.classList.add("hidden"));
    dashboarddisplaygroup.classList.remove("hidden");
    const grpClicked = allgroups_Data.find(grp => grp.Id_Group == clickedBtn.closest(".grp_box").dataset.id);
    if (!grpClicked) {
        console.error("Le groupe n'a pas été trouvé.");
        return;
    }
    fetch(`http://localhost:5000/getGroupData/${grpClicked.Id_Group}`)
    .then(response => response.json())
    .then(group => {
        group_Data = [...group.data];
        // console.log(group_Data);
        group_Data.forEach(etudiant => {
            list_students.push(etudiant.prenomEtudant + " " + etudiant.nomEtudiant);
        })
        // console.log(list_students);
    })
    .then(() => {
         if(grpClicked.Statut === "Active"){
        dashboarddisplaygroup.innerHTML = "";
        const htmlEl = `
        <div class="disp_grp_content">
        <div data-id=${group_Data[0].Id_Group}  class="grp_box grp-${group_Data[0].TypeFormation.toLowerCase()}">
            <div class="grp_box_header flex">
            <h4>${group_Data[0].TypeFormation}</h4>
            <span>${grpClicked.Nom_Matier}</span>
            </div>
            <ul class="grp_box_list">
            <li class="box_list_item">
                <p>ID du Groupe</p>
                <p>${grpClicked.Id_Group}</p>
            </li>
            <li class="box_list_item">
                <p>Status</p>
                <p>${grpClicked.Statut}</p>
            </li>
            <li class="box_list_item">
                <p>Nombre d'etudiants</p>
                <p>${grpClicked.nbr_Etudiant}</p>
            </li>
            <li class="box_list_item">
                <p>Professeur</p>
                <p>${group_Data[0].nomProfesseur} ${group_Data[0].prenomProfesseur}</p>
            </li>
            <li class="box_list_item">
                <p>Date de sceance</p>
                <p>${group_Data[0].Jour_seance} ${group_Data[0].Num_seance == 1 ? '17:00' : '19:00'}</p>
            </li>
            <li class="box_list_item">
                <p>salle D'etude</p>
                <p>${group_Data[0].Num_Salle}</p>
            </li>
            <li class="box_list_item ">
                <p>Liste des etudiants</p>
                <ul class="students_list box_list_students">
                    ${list_students.map(student => `<li class="box_list_item">${student}</li>`).join('')}
                </ul>
            </li>
            </ul>
            <a href="#" class="grp_btn grp_btn_abs">Faire l'abscences</a>
        </div>
        </div>`; 
    dashboarddisplaygroup.insertAdjacentHTML("beforeend", htmlEl); 
        }
})
})

//get professors from database
profilBtn.addEventListener("click", function(e)
{
    e.preventDefault();
    dashboards.forEach(dash=>dash.classList.add("hidden"));
    dashboardProfProfile.classList.remove("hidden");
    fetch(`http://localhost:5000/getProfesseur/${localStorage.getItem('idProf')}`)
    .then(response => response.json())
    .then(professeur => {
        professeur_Data = [...professeur.data];
    })
    // .then(() => {
    //     console.log(professeur_Data);}
    // )
    .then(() => {
        firstNameProfProfile.value = professeur_Data[0].Nom;
        lastNameProfProfile.value = professeur_Data[0].Prenom;
        dateNaissProfProfile.value = professeur_Data[0].Date_Naissance.slice(0,10);
        telProfProfile.value = professeur_Data[0].Telephone;
        villeProfProfile.value = professeur_Data[0].Ville;
        quartierProfProfile.value = professeur_Data[0].Quartier;
        emailProfProfile.value = professeur_Data[0].Email;
    })
})


// check if the date of seance is actual date
function verifierAbsence(group) {
    var date = new Date();
    var actuelJour = date.getDay(); // Use getDay() to get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    var actuelHeure = date.getHours();
    var jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var heureDeScience = (group.N_Seance == 2) ? 19 : 17;
    if (jours[actuelJour] === group.Jour_seance && (actuelHeure === heureDeScience || actuelHeure === heureDeScience + 1) ) {
        return true;
    }
    return false;
}


dashboarddisplaygroup.addEventListener("click", function(e) {
    e.preventDefault();
    const clickedBtn = e.target.closest(".grp_btn_abs");
    if (!clickedBtn)
        return ;
    dashboarddisplaygroup.classList.add("hidden");
    dashAbsenceList.classList.remove("hidden");
    const grpClicked = allgroups_Data.find(grp => grp.Id_Group == clickedBtn.closest(".grp_box").dataset.id);
    if (!grpClicked) {
        console.error("Le groupe n'a pas été trouvé.");
        return;
    }
    fetch(`http://localhost:5000/getEtudiants/${grpClicked.Id_Group}`)
    .then(response => response.json())
    .then(etudiants => {
        etudiants_Data = [...etudiants.data];
    })
    // .then(() => {
    //     console.log(etudiants_Data);
    // })
    .then(() => {
        listeAbs.innerHTML = "";
        etudiants_Data.forEach(etudiant => {
            listeAbs.insertAdjacentHTML("beforeend", 
            `
            <li class="abs_list_item flex">
              <input type="checkbox" id="${etudiant.numDossier}">
              <label for="${etudiant.numDossier}"></label>
              <p class="real_label">${etudiant.Prenom} ${etudiant.Nom}</p>
            </li>`);
        })
    })
    .then(() => {
        dashheaderabs.innerHTML = "";
        dashheaderabs.insertAdjacentHTML("beforeend", 
        `<h3>Liste d'abscence</h3>
        <span>Le ${String(dateActuelle.getDate()).padStart(2, '0')+'/'+String(dateActuelle.getMonth() + 1).padStart(2, '0')+'/'+dateActuelle.getFullYear()} de ${dateActuelle.getHours() === 17 || dateActuelle.getHours() === 18 ? '17:00' : '19:00'} jusqu'a ${dateActuelle.getHours() === 17 || dateActuelle.getHours() === 18 ? '19:00' : '21:00'}</span>`);
    })
        
})

const checkAbsence = function(numDossier,idgroup) {
    // console.log(numDossier,idgroup);
    fetch(`http://localhost:5000/checkAbsence/${numDossier}/${idgroup}`)
    .then(response => response.json())
    // .then(absence => {
    //     console.log(absence);
    // })
}

const decreaceSeance = function(numDossier,idgroup) {
    // console.log(numDossier,idgroup);
    fetch(`http://localhost:5000/decreaceSeance/${numDossier}/${idgroup}`)
    .then(response => response.json())
    // .then(absence => {
    //     console.log(absence);
    // })
}

const checkGroupEtat = function(idgroup) {
    fetch(`http://localhost:5000/checkGroupEtat/${idgroup}`)
    .then(response => response.json())
    // .then(absence => {
    //     console.log(absence);
    // })
}
submitAbsenceBtn.addEventListener("click", function(e) {
    e.preventDefault();
    // const etudiantsAbsents = [];
    const etudiants = document.querySelectorAll(".abs_list_item input[type='checkbox']");
    etudiants.forEach(etudiant => {
        // console.log(etudiant);
        if (etudiant.checked) {
            checkAbsence(etudiant.id,group_Data[0].Id_Group);
            // etudiantsAbsents.push(etudiant.id,);
        }
        else {
            decreaceSeance(etudiant.id,group_Data[0].Id_Group);
        }
        checkGroupEtat(group_Data[0].Id_Group);
        // All_etudiants.push(etudiant.id,)
    })
});
// Logout from dashboard

logoutBtn.addEventListener("click", function(e) {
	e.preventDefault();
    localStorage.removeItem('idProf');
    window.location.href = "./";
})
