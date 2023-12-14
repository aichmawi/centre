const mainContent = document.querySelector("main");
const loading = document.querySelector(".loader_content");
const barBtns = document.querySelector(".bar_list");
const showStudent =  document.querySelector("[data-target = 'student']");
const showTeacher =  document.querySelector("[data-target = 'teacher']");

const dashboards = document.querySelectorAll(".dashboard_container");

const mainDashboardStudent = document.querySelector(".main_dashboard--student");
const addFormStudent = document.querySelector(".add_form--student");
const addBtnStudent = document.querySelectorAll(".add_btn--student");

const mainDashboardTeacher = document.querySelector(".main_dashboard--teacher");
const addFormTeacher = document.querySelector(".add_form--teacher");
const addBtnTeacher = document.querySelectorAll(".add_btn--teacher");
const studentProfileBtn = document.querySelectorAll(".student_profile_btn");
const teacherProfileBtn = document.querySelectorAll(".teacher_profile_btn");
const dashboardStudentProfile = document.querySelector(".profile--student");
const dashboardTeacherProfile = document.querySelector(".profile--teacher");

const mainDashboardGrps = document.querySelector(".main_dashboard--gprs");
const mainDashboardDispGrps = document.querySelector(".main_dashboard--display-grp");
const grpBtn = document.querySelectorAll(".grp_btn");

const inputToEdit = document.querySelectorAll(".input_with_pen");
const addFormationBtn = document.querySelector(".add_formation_btn");
const hidePopupBtn1 = document.querySelector(".hide_popup_btn-1");
const hidePopupBtn2 = document.querySelectorAll(".hide_popup_btn-2");
const addFormationPopup = document.querySelector(".add_formation");
const subjectsContainer = document.querySelectorAll(".subjects_container");
const subjectsInputs = document.querySelectorAll("#numbSc");
const submitFormationBtn = document.querySelector(".submit_formation_btn");
const pricePopup = document.querySelector(".show_price_popup");
const overlay = document.querySelector(".overlay");

const subscsContainer = document.querySelector(".subscs_container");
const priceEl = document.querySelector(".price");

// Wait promise
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
const mediaQuery = window.matchMedia('(max-width: 1024px)');
window.addEventListener("load", loadingContent);
if (mediaQuery.matches)
{
	window.location.href = "./404.html";
}

const reloadContent = function()
{
	loading.classList.remove("hidden");
	mainContent.classList.add("hidden");
	loadingContent();
}

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
	clickedBtn.classList.add("bar_link--active");
	if (clickedBtn.classList.contains("bar_link--student"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardStudent.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("bar_link--teacher"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardTeacher.classList.remove("hidden");
		reloadContent();
	}
	else if (clickedBtn.classList.contains("bar_link--grp"))
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		mainDashboardGrps.classList.remove("hidden");
		reloadContent();
	}
})

// Switch Users dashboard and Add user form
const switchStudent = function()
{
	mainDashboardStudent.classList.toggle("hidden");
	addFormStudent.classList.toggle("hidden");
	reloadContent();
}

const switchTeacher = function()
{
	mainDashboardTeacher.classList.toggle("hidden");
	addFormTeacher.classList.toggle("hidden");
	reloadContent();
}
addBtnStudent.forEach(btn=>btn.addEventListener("click", switchStudent))
addBtnTeacher.forEach(btn=>btn.addEventListener("click", switchTeacher))

// show profile
studentProfileBtn.forEach(btn=>{
	btn.addEventListener("click", function()
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		dashboardStudentProfile.classList.remove("hidden");
		reloadContent();
	})
})
teacherProfileBtn.forEach(btn=>{
	btn.addEventListener("click", function()
	{
		dashboards.forEach(dash=>dash.classList.add("hidden"));
		dashboardTeacherProfile.classList.remove("hidden");
		reloadContent();
	})
})

// Show grp details
grpBtn.forEach(btn=>btn.addEventListener("click", function()
{
	dashboards.forEach(dash=>dash.classList.add("hidden"));
	mainDashboardDispGrps.classList.remove("hidden");
	reloadContent();
}))
// Edit Field

inputToEdit.forEach(inp=>inp.addEventListener("click", function(e){
	const clicked = e.target.closest("i");
	if (!clicked)
		return ;
	clicked.classList.add("hidden");
	const inputContainer = clicked.closest(".input_with_pen");
	const input = clicked.closest(".input_with_pen").querySelector(".input");
	if (clicked.classList.contains("fa-pen"))
	{
		input.disabled = false;
		if (input.type != "date")
			inputContainer.querySelectorAll("i")[1].classList.remove("hidden");
	}
	else{
		if (input.type != "date")
		{
			input.disabled = true;
			inputContainer.querySelectorAll("i")[0].classList.remove("hidden");
		}
	}
}))

// Subscription Content hide and show
subscsContainer.addEventListener("click",function(e)
{
	let nbrEls = 0;
	const clicked = e.target.closest(".subsc_box");
	if (!clicked)
		return ;
	clicked.querySelector(".subsc_content").classList.toggle("subsc_content--active");
})
/* subscsContainer.addEventListener("click",function(e)
{
	let nbrEls = 0;
	const clicked = e.target.closest(".subsc_box");
	if (!clicked)
		return ;
	const contentEl = clicked.querySelector(".subsc_content");
	contentEl.querySelectorAll(".subsc_row").forEach(el=>{
		nbrEls++;
	})
	if (contentEl.classList.contains("subsc_content--active"))
	{
		console.log(1);
		contentEl.style.height = 0;
		contentEl.classList.remove("subsc_content--active");
	}
	else
	{
		const newHeight = (19 + 32) * nbrEls;
		contentEl.style.height = newHeight + 'px';
		contentEl.classList.add("subsc_content--active");
	}
	
}) */