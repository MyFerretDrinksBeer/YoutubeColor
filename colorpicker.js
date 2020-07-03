$('.demo').minicolors();

$('.chooseColor').minicolors();

document.getElementById('contCreate').addEventListener('click', ()=>{
	$('#contCreate2').slideToggle();
})


document.getElementById('info').addEventListener('click', ()=>{
	$('#infoContainer').slideToggle();
})



//For creating your own theme
function createTheme(){
	var newTheme = {
		back1: document.getElementById('colorBack1').value, 
		back2: document.getElementById('colorBack2').value, 
		text1: document.getElementById('colorText1').value, 
		text2: document.getElementById('colorText2').value, 
		icon:document.getElementById('colorIcon').value, 
		anchor: document.getElementById('colorLink').value,
		name: document.getElementById('themeName').value
	};

	Cookies.set('createdTheme', [newTheme.back1, newTheme.back2, newTheme.text1, newTheme.text2, newTheme.icon, newTheme.anchor, newTheme.name]);
	console.log(Cookies.get('createdTheme').split(","));
	console.log(newTheme);

}

function loadSavedThemes(){
	if(Cookies.get('createdTheme') !== undefined){
		const parent = document.getElementById('themes');

		//Create theme container
		var cont = document.createElement('DIV');
		cont.className = 'container';
		cont.id = 'contCreated';
		//Create theme name 
		var span = document.createElement('SPAN');
		span.innerText = Cookies.get('createdTheme').split(',')[6];
		//Create check mark image
		var img = document.createElement('IMG');
		img.src = 'check.png';
		img.id = 'checkCreated';

		parent.appendChild(cont);
		cont.appendChild(span);
		cont.appendChild(img);

	}
}
loadSavedThemes();

document.getElementById('saveBtn').addEventListener('click', ()=>{
	createTheme();
	location.href = location.href;
})

