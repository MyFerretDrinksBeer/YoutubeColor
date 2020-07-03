

//Recieves message from extension pop-up script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

  	if(request.theme == "Default"){
  		sendResponse({farewell: "goodbye"});
  		Cookies.set('currentTheme', 'Default');
  		location.href = location.href;
  	}

  	if(request.theme == 'Dark'){
  		sendResponse({farewell: "goodbye"});
  		Cookies.set('currentTheme', 'Dark');
  		location.href = location.href;
  	}

  	if(request.theme == 'Created'){
  		sendResponse({farewell: "goodbye"});
  		console.log(request.colors);
  		Cookies.set('createdThemeColors', request.colors);
  		Cookies.set('currentTheme', 'Created');
  		location.href = location.href;
  	}	
});


//Automatically choose theme based on stored cookie
function auto(){
	if(Cookies.get('currentTheme') !== undefined){
		if(Cookies.get('currentTheme') == 'Default'){
			return;
		}else{
			if(Cookies.get('currentTheme') == 'Dark'){
				run('Dark');
			}
			if(Cookies.get('currentTheme') == 'Created'){
				run('Created');
			}
		}
	}
}
auto();


//Creates an array of colors based on the current theme
function colors(theme){
	var color;

	//Create an array of colors based on current theme
	if(theme == 'Dark'){	
		color = {back1:'#3b3b3b', back2:'#666', text1:'#f0f0f0', text2:'#b8b8b8', icon:'white', anchor:'#f09816'};
	}else{
		if(theme == 'Created'){
			var c = Cookies.get('createdThemeColors').split(',');

			color = {back1: c[1], back2: c[0], text1: c[2], text2: c[3], icon: c[4], anchor: c[5]};
		}
	}	

	return color;
}



//Change all DOM elements according to selected theme
function change(theme){

	//Loop through all elements
	function looper(elm, type){
		//Check if element exists
		if(elm !== null){
			//For sub-background
			if(type == 'back1'){
				for(let i = 0; i < elm.length; i++){
					elm[i].style.backgroundColor = colors(theme).back1;
				}
			}
			//For main background
			if(type == 'back2'){
				for(let i = 0; i < elm.length; i++){
					elm[i].style.backgroundColor = colors(theme).back2;
				}
			}
			//For all main text
			if(type == 'text1'){
				for(let i = 0; i < elm.length; i++){
					elm[i].style.color = colors(theme).text1;
				}
			}
			//For all sub-text
			if(type == 'text2'){
				for(let i = 0; i < elm.length; i++){
					elm[i].style.color = colors(theme).text2;
				}
			}
			//For icons
			if(type == 'icon'){
				for(let i = 0; i < elm.length; i++){
					elm[i].style.color = colors(theme).icon;
				}
			}
			//For anchors
			if(type == 'anchor'){
				elm.style.color = colors(theme).anchor;
			}
		}
	}

	if($(document).ready()){

		/*
			-----------------GENERAL-----------------
		*/
		//Get DOM elements
		var main = document.querySelector("#content");
		var header = document.querySelector("#container");
		var sidebarSmall = document.querySelector("#content > ytd-mini-guide-renderer");
		var sidebarBig = document.querySelector("#sections");
		var navBtn = document.querySelector("#guide-icon");

		//Set colors to DOM elements
		main.style.backgroundColor = colors(theme).back2;
		main.style.color = colors(theme).text1;
		header.style.backgroundColor = colors(theme).back1;
		navBtn.style.color = colors(theme).icon;

		//Check if user has big or small sidebar exposed
		if(sidebarBig !== null){
			sidebarBig.style.backgroundColor = colors(theme).back1;
			if(document.querySelector("#sections > ytd-guide-section-renderer:nth-child(1)") !== null){
				document.querySelector("#sections > ytd-guide-section-renderer:nth-child(1)").style.backgroundColor = colors(theme).back1;
				document.querySelector("#sections > ytd-guide-section-renderer:nth-child(2)").style.backgroundColor = colors(theme).back1;
			}
			document.querySelector("#header").style.backgroundColor = colors(theme).back1;

			//All icons for big sidebar
			looper(document.querySelectorAll("#endpoint > paper-item > yt-icon.guide-icon.style-scope.ytd-guide-entry-renderer"), 'icon');
			looper(document.querySelectorAll("#endpoint > paper-item > yt-formatted-string"), 'icon');
		}
		if(sidebarSmall !== null){
			sidebarSmall.style.backgroundColor = colors(theme).back1;
			//Get containers of small sidebar icons 
			looper(document.querySelectorAll("#endpoint"), 'back1');
			looper(document.querySelectorAll("#icon"), 'icon')
		}
		//Get all other icons
		looper(document.querySelectorAll("#button > yt-icon"), 'icon');

		//Loop through all videos diplayed and effect the text	
		looper(document.querySelectorAll("#video-title"), 'text1');

		//Video author
		looper(document.querySelectorAll("#text > a"), 'text2');

		//All video views, and time since posted
		looper(document.querySelectorAll("#metadata-line > span:nth-child(1)"), 'text2');
		looper(document.querySelectorAll("#metadata-line > span:nth-child(2)"), 'text2');



		/*
			-----------------VIDEO PAGE-----------------
		*/

		//Video title
		if(document.querySelector("#container > h1 > yt-formatted-string") !== null){
			document.querySelector("#container > h1 > yt-formatted-string").style.color = colors(theme).text1;
		}
		
		//Video views
		if(document.querySelector("#count > yt-view-count-renderer > span.view-count.style-scope.yt-view-count-renderer") !== null){
			document.querySelector("#count > yt-view-count-renderer > span.view-count.style-scope.yt-view-count-renderer").style.color = colors(theme).text2;
		}

		//Video post date
		if(document.querySelector("#date > yt-formatted-string") !== null){
			document.querySelector("#date > yt-formatted-string").style.color = colors(theme).text2;
		}

		//General text
		looper(document.querySelectorAll("#text"), 'text2');

		//Author subs
		if(document.querySelector("#owner-sub-count") !== null){
			document.querySelector("#owner-sub-count").style.color = colors(theme).text2;
		}

		//Show more/less button
		if(document.querySelector("#less > yt-formatted-string")){
			document.querySelector("#less > yt-formatted-string").style.color = colors(theme).text2;
			document.querySelector("#more > yt-formatted-string").style.color = colors(theme).text2;

		}

		//Video description 
		if(document.querySelector("#description") !== null){
			looper(document.querySelectorAll("#description > yt-formatted-string > span"), 'text2');
		}

		//Video comments
		
		if(document.querySelector("#sections") !== null){
			document.querySelector("#sections").style.backgroundColor = colors(theme).back2;
		}
		

		//Sort button
		if(document.querySelector("#icon-label") !== null){
			document.querySelector("#icon-label").style.color = colors(theme).text2;
		}

		//Comment text
		if(document.querySelector("#content-text") !== null){
			looper(document.querySelectorAll("#content-text"), 'text2');
		}

		//Comment author
		if(document.querySelector("#header-author > yt-formatted-string > a") !== null){
			looper(document.querySelectorAll("#author-text > span"), 'text1');
			looper(document.querySelectorAll("#header-author > yt-formatted-string > a"), 'text2')
		}

		//Comment likes
		if(document.querySelector("#vote-count-middle") !== null){
			looper(document.querySelectorAll("#vote-count-middle"), 'text2');
		}



		/*
			-----------------USER PAGE-----------------
		*/
		if(document.querySelector("#contentContainer > div.banner-visible-area.style-scope.ytd-c4-tabbed-header-renderer") !== null){
			//Channel content
			if(document.querySelector("#page-manager > ytd-browse") !== null){
				document.querySelector("#page-manager > ytd-browse").style.backgroundColor = colors(theme).back2;
			}
			
			//Channel header
			if(document.querySelector("#header") !== null){
				document.querySelector("#header").style.backgroundColor = colors(theme).back2;
				document.querySelector("#channel-header").style.backgroundColor = colors(theme).back2;
				document.querySelector("#tabs-inner-container").style.backgroundColor = colors(theme).back2;
			}

			//Channel page nav
			if(document.querySelector("#tabsContent > paper-tab > div") !== null){
				looper(document.querySelectorAll("#tabsContent > paper-tab > div"), 'text1');
			}

			//Channel page name 
			if(document.querySelectorAll("#text")[1] !== null ){
				document.querySelectorAll("#text")[1].style.color = colors(theme).text1;
			}

			//Channel subs
			if(document.querySelector("#subscriber-count") !== null){
				document.querySelector("#subscriber-count").style.color = colors(theme).text2;
			}
		}
	}
}


//Main function that runs the script
function run(theme){
	setInterval(()=>{change(theme);},100);
}