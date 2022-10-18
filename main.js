
var inputs = document.querySelectorAll('input');
var alerts = document.querySelectorAll("p.alert");
var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var mainBtn = document.getElementById('mainBtn');


var bookmarks ;

if(localStorage.getItem('bookmarks') != null)
{
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    displayData(bookmarks);
}
else
{
    bookmarks = [];
    hideAlerts();
}


function hideAlerts() {
    for (var i = 0; i < alerts.length; i++)
    {
        alerts[i].style.display = "none";
    }    
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) 
    {
        inputs[i].value = "";
    }
}




function displayData(bookList){

    var cartoona = [];

    for ( var i = 0 ; i < bookList.length ; i ++)
    {
        cartoona += `
        <div class=\"webwell row\" id="${bookList[i].name}" >
        <h2>${bookList[i].name}</h2>
        <a class="btn btn-primary" href="${bookList[i].url}" target="_blank">visit</a>
        <button onclick="setForm(${i})" class="btn btn-success btnUpdate">update</button>
        <button onclick="deleteSite(${i})" class="btn btn-danger btndelete">Delete</button>
        </div>
        `
    }
    document.getElementById('bookmarkList').innerHTML=cartoona ;
}


function deleteSite(siteIndex){

    bookmarks.splice(siteIndex,1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayData(bookmarks);
}



function submitItem() { 
  
    if(mainBtn.innerHTML == "Submit")
    {

        var siteNameValue = siteName.value;
        var siteUrlValue = siteUrl.value;
        if (checkName(siteNameValue) && checkUrl(siteUrlValue) )
         {
            hideAlerts();
            siteUrlValue = addHttp(siteUrlValue);
            var bookmark = { name: siteNameValue, url: siteUrlValue };
            bookmarks.push(bookmark);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayData(bookmarks);
            clearForm();
        } 
     
    
    }
   
}

function checkName(name) { 
    if (name == null || name == "") 
    {
        showNameError("Name is required");
    }
    else
    {
        for (var i = 0; i < bookmarks.length; i++)
        {
            if (bookmarks[i].name === name)
            {
                showNameError("this name already exist");
            }
                
        }
        return true;
    }
   
}

function checkUrl(url) {
    if (url == null || url == "") 
    {
        showUrlError("Url Field is required");
    }
    else
    {
        for (var i = 0; i < bookmarks.length; i++)
        {
        if (bookmarks[i].url === url)
        {
            showUrlError("this url already exist");
        }
        }
        return true;
    }
    
   
}

function showNameError(msg) {
    var nameError = document.getElementById('nameError');
    nameError.innerHTML = msg;
    nameError.style.display = 'block';
}

function showUrlError(msg) {
    var urlError = document.getElementById('urlError');
    urlError.innerHTML = msg;
    urlError.style.display = 'block';

}

function addHttp(url) {
    var regax = /^http|https /
    if(regax.test(url))
    {
        return url;
    }
    else
    {
        return "http://" + url;
    }
    
}
document.addEventListener("keypress", function(e) {
    console.log(e);
    if (e.keyCode == 13)
    {
        submit();
    }
        
})
 

function setForm(siteIndex){

    siteName.value = bookmarks[siteIndex].name;
    siteUrl.value = bookmarks[siteIndex].url;
    mainBtn.innerHTML = "update Site";
    document.getElementById("mainBtn").setAttribute( "onclick" , `updateSite(${siteIndex})` );
    
    
}


function updateSite(siteIndex )
{   
   
    var siteUpdateName = siteName.value;
    var siteUpdateUrl = siteUrl.value;   
    if (checkUpdateName(siteUpdateName) && checkUpdateUrl(siteUpdateUrl))
    {
        siteUpdateUrl = addHttp(siteUpdateUrl);
        bookmarks[siteIndex].name = siteUpdateName ;
        bookmarks[siteIndex].url = siteUpdateUrl ; 
        console.log(siteUpdateUrl);
        displayData(bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        mainBtn.innerHTML = "Submit";
        document.getElementById("mainBtn").setAttribute( "onclick" , `submitItem()` );
        clearForm();
    }


}
function checkUpdateName(name) {
    if (name == null || name == "") 
    {
        showNameError("Name is required");
    }
    else
    {
        return true;
    }
   
}

function checkUpdateUrl(url) {
    if (url == null || url == "") 
    {
        showUrlError("Url Field is required");
    }
    else
    {
        return true;
    }
   
}

function searchSiteName(term){

    
    var searchSiteName = [];
    for(var i = 0 ; i<bookmarks.length ; i++)
    {
        if(bookmarks[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            searchSiteName.push(bookmarks[i]);

        }
    }
    displayData(searchSiteName);
}

