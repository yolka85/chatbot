(function(){
    "use strict";
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', '../data.json');
    ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        // This is where we'll do something with the retrieved data
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data);
        hideMsnTab();
        showNextScreen(data);
    } else {
        console.log("We connected to the server, but it returned an error.");
    }
    };

    ourRequest.onerror = function() {
    console.log("Connection error");
    };

    ourRequest.send();
   
    function createHTML(context){
        /* Progress line */
        var indicatorTemplate = document.getElementById("progress-line-template").innerHTML,
            statusIndicatorTemplateCompile = Handlebars.compile(indicatorTemplate),
            statusIndicatorHTML = statusIndicatorTemplateCompile(context);
            document.getElementById('progress-line').innerHTML = statusIndicatorHTML;
        /* ------------- */

        /* Steps */
        var stepTemplate = document.getElementById("steps-template").innerHTML,
            stepTemplateCompile = Handlebars.compile(stepTemplate),
            stepTemplateHTML = stepTemplateCompile(context);
            document.getElementById('screen1').innerHTML = stepTemplateHTML;
        /* ------------- */

        /* Categories list */
        var catTemplate = document.getElementById("categories-template").innerHTML,
            catTemplateCompile = Handlebars.compile(catTemplate),
            catTemplateHTML = catTemplateCompile(context);
            document.getElementById('screen2').innerHTML = catTemplateHTML;
        /* ------------- */

        /* Inputs with invoice details */
        var inputTemplate = document.getElementById("inputs-template").innerHTML,
            inputTemplateCompile = Handlebars.compile(inputTemplate),
            inputTemplateHTML = inputTemplateCompile(context);
            document.getElementById('inputs').innerHTML = inputTemplateHTML;
        /* ------------- */
    }

    /* Hide messenger tabs on click */
    function hideMsnTab (){
        var hideIcons = document.querySelectorAll('.msn-tab-closer');
        hideIcons.forEach(function(item){
            item.addEventListener('click', function(event){
                event.target.parentNode.style.display = 'none';
            })
        })
    }

    /* Next button */
    function showNextScreen(context) {
        var nextBtn = document.getElementById('next-btn');
        nextBtn.addEventListener('click', function(){
            var mainSection = document.getElementById ('main-section');
            console.log(mainSection.classList);
            console.log(context.statusIndicator.length);
            for (var i=1; i<=context.statusIndicator.length; i++){
                if(mainSection.classList.contains('screen-'+i) && i<context.statusIndicator.length){
                    mainSection.classList.remove('screen-'+i);
                    mainSection.classList.add('screen-'+(i+1));
                    break
                }
            }
        })
    }
})();