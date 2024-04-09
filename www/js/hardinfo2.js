//Copyright hardinfo2 project 2024, written by hwspeedy
//License: GPL2+

//Showing a chart.js graph
function draw_chart(graph,name) {
    var ctx = document.getElementById(name).getContext('2d');
    if(window.hasOwnProperty(name)) window[name].destroy();
    document.getElementById(name).height=graph.height;
    window[name] = new Chart(ctx, graph);
};


let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
	slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
	dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3500);
}


function toggleMenu() {
    event.preventDefault();
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
	x.className += " responsive";
    } else {
	x.className = "topnav";
    }
}

function showPage() {
    console.log("showPage " + this.name);
    //
    event.preventDefault();
    var topnav=document.querySelector('#myTopnav');
    if(event.target.tagName === 'A') topnav.classList.remove('responsive');
    //
    let navlist = document.querySelectorAll('.navlist');
    for (let x = 0; x < navlist.length; x++) {
        //if(navlist[x].name.substring(1,2) === "bs") navlist[x].name="bsstat";
	console.log(navlist[x].name);
	if (navlist[x] == this) {
	    navlist[x].classList.add('active');
	    document.getElementById("Page-" + navlist[x].name).style.display="block";
	} else {
	    navlist[x].classList.remove('active');
	    document.getElementById("Page-" + navlist[x].name).style.display="none";
	}
    }
}

function html_table(bmtypes,bmval,htmltable) {
    text="<table border=1 cellspacing=0 cellpadding=3><tr><td colspan=2 bgcolor=lightblue><b>"+bmtypes+"</b></td></tr>";
    for(var i=0;i<bmval.length;i++){
	text=text+"<tr><td>"+bmval[i][0]+"</td><td align=right>"+parseFloat(bmval[i][1]).toFixed(2)+"</td></tr>";
    }
    text=text+"</table>";
    htmltable.innerHTML=text;
}
function create_tables(bm) {
    var text="";
    var textg="";
    const bmval=new Array(15);
    const bmtypes=new Array();
    //Create top nav menu
    //Json: 0:cpu,1:bmtype,2:value
    for(var i=0; i<bm.length; i++){
	if(! bmtypes.includes(bm[i][1].toString()) ) {
	    bmtypes.push(bm[i][1].toString());
            t=bmtypes.indexOf(bm[i][1].toString());
	    bmval[t]=new Array();
        } else {
	    t=bmtypes.indexOf(bm[i][1].toString());
	}
        bmval[t].push( [bm[i][0],bm[i][2]] );
    }
    bmtypes.sort();
    for(var i=0; i<bmtypes.length; i++){
	text = text + '<a href="#" name="bs'+i+'" class="navlist">'+bmtypes[i].toString()+'</a>';
	textg = textg + '<a href="#" name="bg'+i+'" class="navlist">'+bmtypes[i].toString()+'</a>';
    }
    benchstat.innerHTML=text;
    benchgraph.innerHTML=textg;
    let navlist = document.querySelectorAll('.navlist');
    for (let i = 0; i < navlist.length; i++) {
	e=navlist[i];
	navlist[i].addEventListener('click', showPage, false);
    }
    //Create html tables
    if(bmtypes.length>0) bmval[0].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>1) bmval[1].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>2) bmval[2].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>3) bmval[3].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>4) bmval[4].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>5) bmval[5].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>6) bmval[6].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>7) bmval[7].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>8) bmval[8].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>9) bmval[9].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>10) bmval[10].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>11) bmval[11].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>12) bmval[12].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>13) bmval[13].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>14) bmval[14].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>15) bmval[15].sort((a,b)=>b[1]-a[1]);
    if(bmtypes.length>0) html_table(bmtypes[0],bmval[0],htmltables0);
    if(bmtypes.length>1) html_table(bmtypes[1],bmval[1],htmltables1);
    if(bmtypes.length>2) html_table(bmtypes[2],bmval[2],htmltables2);
    if(bmtypes.length>3) html_table(bmtypes[3],bmval[3],htmltables3);
    if(bmtypes.length>4) html_table(bmtypes[4],bmval[4],htmltables4);
    if(bmtypes.length>5) html_table(bmtypes[5],bmval[5],htmltables5);
    if(bmtypes.length>6) html_table(bmtypes[6],bmval[6],htmltables6);
    if(bmtypes.length>7) html_table(bmtypes[7],bmval[7],htmltables7);
    if(bmtypes.length>8) html_table(bmtypes[8],bmval[8],htmltables8);
    if(bmtypes.length>9) html_table(bmtypes[9],bmval[9],htmltables9);
    if(bmtypes.length>10) html_table(bmtypes[10],bmval[10],htmltables10);
    if(bmtypes.length>11) html_table(bmtypes[11],bmval[11],htmltables11);
    if(bmtypes.length>12) html_table(bmtypes[12],bmval[12],htmltables12);
    if(bmtypes.length>13) html_table(bmtypes[13],bmval[13],htmltables13);
    if(bmtypes.length>14) html_table(bmtypes[14],bmval[14],htmltables14);
    if(bmtypes.length>15) html_table(bmtypes[15],bmval[15],htmltables15);
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/getbenchmarks')
	.then((response) => response.text())
        .then((text) => {
	    create_tables(JSON.parse(text));
	});

    var elements=document.getElementsByClassName("icon");
    for (var i = 0; i < elements.length; i++) {
	elements[i].addEventListener('click', toggleMenu, false);
    }


    let navlist = document.querySelectorAll('.navlist');
    for (let i = 0; i < navlist.length; i++) {
	e=navlist[i];
	navlist[i].addEventListener('click', showPage, false);
    }

    fetch('/github/?release_info')
	.then((response) => response.text())
        .then((text) => {
	    githubnews.innerHTML=text;
	});
    fetch('/credits.ids')
	.then((response) => response.text())
        .then((text) => {
	    githubcredits.innerHTML=text;
	});

    //FIXME - Create graphs from getbenchmarks
    fetch('/api/getbenchmarkchart?BT=CPU+Blowfish+(Multi-Core)')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chart0');
	});    
    fetch('/api/getbenchmarkchart?BT=CPU+Blowfish+(Multi-Thread)')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chart1');
	});    
    fetch('/api/getbenchmarkchart?BT=CPU+N-Queens')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chart5');
	});
    fetch('/api/getbenchmarkchart?BT=Internal+Network+Speed')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chart10');
	});
    fetch('/api/getbenchmarkchart?BT=SysBench+CPU+(Multi-thread)')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chart11');
	});
    fetch('/api/getbenchmarkchart?BT=SysBench+CPU+(Single-thread)')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chart12');
	});

    fetch('/api/getcomparechart?CPU1=AMD+Ryzen+9+7950X&CPU2=AMD+Ryzen+9+5950X&CPU3=AMD+EPYC+9354P')
	.then((response) => response.text())
        .then((text) => {
	    draw_chart(JSON.parse(text),'chartcomp');
	});
    showSlides();
  },false);

