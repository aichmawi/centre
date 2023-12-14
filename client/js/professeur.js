const mainContent = document.querySelector("main");
const loading = document.querySelector(".loader_content");
const dashboards = document.querySelectorAll(".dashboard_container");
const mainDashboardGrps = document.querySelector(".main_dashboard--gprs");
const mainDashboardDispGrps = document.querySelector(".main_dashboard--display-grp");
const mainDashboardprofile = document.querySelector(".profile--teacher");
const mainDashboardAbs = document.querySelector(".abscence_list");
const grpBtn = document.querySelectorAll(".grp_btn_sm");
const grpBtnAbs = document.querySelector(".grp_btn_abs");
const barBtns = document.querySelector(".bar_list");

// localStorage.setItem('idProf',1);


const userId = localStorage.getItem('idProf');

if (!userId) {
	window.location.href = 'http://127.0.0.1:5500/client/login.html';
} else {
  console.log('idProf:', userId);
}

const wait = function (seconds) {
	return new Promise(function (resolve) {
	  setTimeout(resolve, seconds * 1000);
	});
  };
  
  // Loading Content
const loadingContent = function () {
	wait(1).then(() => {
		loading.classList.add("hidden");
		mainContent.classList.remove("hidden");
	});
};

window.addEventListener("load",loadingContent);

const reloadContent = function()
{
	loading.classList.remove("hidden");
	mainContent.classList.add("hidden");
	loadingContent();
}
// const mediaQuery = window.matchMedia('(max-width: 1024px)');
// window.addEventListener("load", loadingContent);
// if (mediaQuery.matches)
// {
// 	window.location.href = "./404.html";
// }

// Switch between Student Dashboard and teacher dashboard
barBtns.addEventListener("click", function(e)
{
	e.preventDefault();
	const clickedBtn = e.target.closest(".bar_link");
	if (!clickedBtn)
		return ;
	document.querySelectorAll(".bar_link").forEach(
		btn => btn.classList.remove("bar_link--active")
	);
	if (!clickedBtn.classList.contains("abs_reminder"))
		clickedBtn.classList.add("bar_link--active");
	if (clickedBtn.classList.contains("bar_link--grp"))
	{
		// console.log(1);
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardGrps.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("bar_link--profil"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardprofile.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("abs_reminder"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardAbs.classList.remove("hidden");
		reloadContent();
	}
})
grpBtn.forEach(btn=>btn.addEventListener("click", function()
{
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	mainDashboardDispGrps.classList.remove("hidden");
	reloadContent();
}))
// grpBtnAbs.addEventListener("click", function()
// {
// 	dashboards.forEach(dash=>dash.classList.add("hidden"));
// 	mainDashboardAbs.classList.remove("hidden");
// 	reloadContent();
// })

//added code
mainDashboardDispGrps.addEventListener("click", function(e)
{
	e.preventDefault();
	const clickedBtn = e.target.closest(".grp_btn");
	if (!clickedBtn)
		return ;
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	mainDashboardAbs.classList.remove("hidden");
})


// dashboarddisplaygroup.addEventListener("click", function(e)
// {
//     e.preventDefault();
//     dashboarddisplaygroup.classList.add("hidden");
//     mainDashboardAbs.classList.remove("hidden");
//     const clickedBtn = e.target.closest(".grp_btn_abs");
//     if (!clickedBtn)
//         return ;
//     const grpClicked = groupData.find(grp => grp.Id_Group == clickedBtn.closest(".disp_grp_content").dataset.id);
//     console.log(grpClicked.Id_Group);
// })