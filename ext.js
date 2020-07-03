
//Function for sending message to content script from pop-up
function send(t){
    if(t !== 'Created'){
         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {theme: t}, function(response) {
                console.log(response.farewell);
            });
        });
    }else{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {theme: t, colors: Cookies.get('createdTheme')}, function(response) {
                console.log(response.farewell);
            });
        });
    }
}


//Auto select theme based on last chosen theme (stored with cookies)
function autoSelect(){
    if(Cookies.get('currentTheme') !== null){
        //Change container style
        if(Cookies.get('currentTheme') == 'Default'){
            document.querySelectorAll('.container')[0].style.opacity = '1.0';
            document.querySelectorAll('IMG')[0].style.display = 'inline';
        }
        if(Cookies.get('currentTheme') == 'Dark'){
            document.querySelectorAll('.container')[1].style.opacity = '1.0';
            document.querySelectorAll('IMG')[1].style.display = 'inline';
        }
        if(Cookies.get('currentTheme') == 'Created'){  
            document.querySelectorAll('.container')[2].style.opacity = '1.0';
            document.querySelectorAll('IMG')[2].style.display = 'inline';
        }
    }else{
        Cookies.set('currentTheme', 'Default');  
    }
}
autoSelect();


//Funtion for when user selects a theme
function select(theme){
    Cookies.set('currentTheme', theme);

    //Remove all other style
    for(let i = 0; i < document.querySelectorAll('.container').length; i++){
        if(i !== document.querySelectorAll('.container').length-1){
            document.querySelectorAll('.container')[i].style.opacity = '0.6';
            document.querySelectorAll('IMG')[i].style.display = 'none';
        }
    }

    //Change container style
    document.getElementById('cont'+theme).style.opacity = '1.0';
    document.getElementById('check'+theme).style.display = 'inline';

    //Send message to content script
    send(theme);
}







//Add event listsners to containers because you can't add the onclick event in the actual html..... 
document.getElementById('contDefault').addEventListener('click', ()=>{select('Default')});
document.getElementById('contDark').addEventListener('click', ()=>{select('Dark')});
if(document.getElementById('contCreated') !== null){
    document.getElementById('contCreated').addEventListener('click', ()=>{select('Created')});
}

function getURL(){ 
   var aye =  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url;
        return url;
    });
   console.log(aye);
}
getURL();
