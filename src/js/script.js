let pages = [
    {
        id: "0",
        page: "#bg"
    },
    {
        id: "1",
        page: "#about"
    },
    {
        id: "2",
        page: "#projects"
    }
];
let circles = [];
let numOfCircl = 0;
let circlesAnimNum = 100;
let anim = null;
let lastScrollPosition = 0;

(function init() {
    loadingScreen();
    if(!window.chrome){
        document.querySelector("#mouseScroll").remove();
    }
    window.addEventListener("load", hideLoadingScreen)


    document.querySelectorAll("#menu li").forEach(menuElem => menuElem.addEventListener("click", handleMenu));
    document.querySelectorAll("#dotsMenu li").forEach(menuElem => menuElem.addEventListener("click", handleMenu));
    document.querySelectorAll(".container").forEach(cont => cont.addEventListener("wheel", handleScroll));
    document.querySelectorAll("#mobileMenu .mobileMenuElem").forEach(elem => elem.addEventListener("click", mobileMenuHandle))
    document.querySelector("#mobileMenuBtn").addEventListener("click", mobileMenuToggle);
})();

function loadingScreen(){
    let screen = document.createElement("div");

    screen.id = "loadingScreen";
    screen.innerHTML = `<img src="dist/img/logo.png" />`;
    document.body.appendChild(screen)
}

function hideLoadingScreen(){
    document.querySelector("#loadingScreen").style.opacity = "0";
    setTimeout(
        () => {
            document.querySelector("#loadingScreen").remove();
            document.querySelector(".headerDot").classList.add("jump")
        },
        300
    )
}

function handleMenu(e){
    let nextPage = pages.filter(page => {
        if(page.id === e.currentTarget.dataset.id){
            return page
        }
    });
    let currentPage = pages.filter(page => {
        if(page.id === document.body.dataset.page){
            return page
        }
    });

   
    hidePage(currentPage[0].page);
    showPage(nextPage[0].page);
    updatePageStatus(nextPage[0].id)
    fillDot();
}

function mobileMenuToggle(){
    const hamburger = document.querySelector('#mobileMenuBtn');
    const lines = [
        document.querySelector('#mobileMenuBtn #firstElem'), 
        document.querySelector('#mobileMenuBtn #midElem'), 
        document.querySelector('#mobileMenuBtn #lastElem')
    ];

    if(hamburger.dataset.mode === 'hidden'){
        hamburger.dataset.mode = 'shown';
        lines[2].style = `margin-top:-10px;`;
        lines[0].style = `margin: -6% 0;`;
        setTimeout( () => lines[0].style.transform = `rotate(45deg)`, 200);
        setTimeout( () => {
          lines[1].style.transform += `translateY(-200%) rotate(-45deg)`;
          lines[2].style.opacity = `0`;
        });
        document.querySelector('#mobileMenu').style.left = '0%';
    }
    else{
        hamburger.dataset.mode = 'hidden';
        lines[2].style = `margin-top: 5px;`;
        setTimeout( () => {
            lines[1].style.transform = `translateY(0.5px)`;
            lines[0].style.transform = `rotate(0deg)`;
            lines[1].style.transform = `translateY(0%) rotate(0deg)`;
            lines[2].style.opacity = `1`;
        }, 200);
        document.querySelector('#mobileMenu').style.left = '300%';
    }
}

function mobileMenuHandle(e){
    document.querySelectorAll(".mobileMenuElem").forEach(elem => elem.className = "mobileMenuElem");
    e.currentTarget.className += " active";

    handleMenu(e);
}

function fillDot(){
    document.querySelectorAll("#dotsMenu li").forEach(dot => dot.removeAttribute("class"));
    document.querySelector(`#dotsMenu li[data-id='${document.body.dataset.page}']`).className = "filledDot";
}

function hidePage(page){
    document.querySelector(page).style.height = 0;

    if(page === "#about"){
        document.querySelector(".row").style.display = "none"
        circles = [];
  
        return cancelAnimationFrame(anim)
    }
}

function showPage(page){
    if(page === "#about"){
        document.querySelector(".row").style.display = "block";

        createWave();
        canvasSetup();
        renderCircles();
        drawCircles();
        circlesAnimation();

        if(window.screen.width <= 600){
            let waveBox = document.createElement("div");

            waveBox.id = "waveBoxMobile";
            waveBox.innerHTML = `<img src="./dist/img/wave.png" />`;
            document.querySelector("#about").appendChild(waveBox);
            
            setTimeout(() => {
                document.querySelector("#waveBoxMobile") !== null ? document.querySelector("#waveBoxMobile").style.opacity = "1" : null;
            }, 300);
        }

        setTimeout(
            () => {
                document.querySelector(".row").style.opacity = "1";
            },
            300
        );
    }
    else if(page === "#bg"){
        if(document.querySelector("#waveBoxMobile") !== null){
            document.querySelector("#waveBoxMobile").remove();
        }
        else if(document.querySelector(".wave") !== null){
            document.querySelector(".wave").style.opacity = "0";

            setTimeout(() => {
                document.querySelector(".wave") !== null ? document.querySelector(".wave").remove() : null;
            }, 350);
        }
    }
    else if(page === "#projects"){
        if(window.screen.width <= 1024){
            fixProjectBoxForMobile();
        }

        if(document.querySelector("#waveBoxMobile") !== null){
            document.querySelector("#waveBoxMobile").remove();
        }
        createWave();
        loadProjects();

        document.querySelector("#loadMoreProjects").addEventListener("click", loadProjects)
    }

    document.querySelector(page).style.height = "100%";
}

function fixProjectBoxForMobile(){
    let firstRow = document.createElement("div");
    let secRow = document.createElement("div");
    let i = 0;

    firstRow.id = "firstRow";
    secRow.id = "secRow";

    if(document.querySelector("#firstRow") === null){
        document.querySelectorAll("#projectsWrap a").forEach(prj => {
            if(i < 3){
                firstRow.appendChild(prj)
            }
            else{
                secRow.appendChild(prj)
            }
    
            i++;
        });

        document.querySelector("#projectsWrap").append(firstRow, secRow)
    }
    else{
        document.querySelectorAll("#projectsWrap a").forEach(prj => {
            if(i < 3){
                document.querySelector("#firstRow").appendChild(prj)
            }
            else{
                document.querySelector("#secRow").appendChild(prj)
            }
    
            i++;
        });
    }
}

function createWave(){
    if(document.querySelector(".wave") === null){
        let wave = document.createElement("div");
        wave.className = "wave";
    
        document.body.appendChild(wave);
        document.querySelector(".wave").innerHTML = `<img src="dist/img/wave.png" />`;
        document.querySelector(".wave").addEventListener("wheel", handleScroll);
    }
}

function loadProjects(){
    if(document.querySelector(".projectLoadingScreen") !== null){
        return;
    }
        let avaiableProjects = [
            {id: 0, url: "https://video-finder.netlify.app/", name: "Video Finder", img: "dist/img/video-finder.jpg"},
            {id: 1, url: "#", name: "devcobb", img: "dist/img/portoflio.JPG"},
            {id: 2, url: "https://github.com/devcobb/Financer", name: "Financer", img: "dist/img/financer.JPG"},
            {id: 3, url: "dist/deliciae/html/index.html", name: "Deliciae", img: "dist/img/deliciae.JPG"},
            {id: 4, url: "dist/tanky/html/index.html", name: "Tanky", img: "dist/img/tanky.JPG"},
            {id: 5, url: "https://github.com/devcobb/Filmer", name: "Filmer", img: "dist/img/filmer.JPG"},
            {id: 6, url: "dist/calendation/html/index.html", name: "Calendation", img: "dist/img/calendation.JPG"},
            {id: 7, url: "dist/evolution/html/index.html", name: "Evolution", img: "dist/img/evolution.JPG"},
            {id: 8, url: "dist/crime/html/index.html", name: "Crime", img: "dist/img/crime.JPG"},
            {id: 9, url: "dist/tubedit/html/index.html", name: "Tubedit", img: "dist/img/tubedit.JPG"},
            {id: 10, url: "dist/cardmemory/html/index.html", name: "Cardmemory", img: "dist/img/cardmemory.JPG"},
            {id: 11, url: "dist/quiz/html/index.html", name: "Quiz App", img: "dist/img/quiz.JPG"},
        ];
    
        loadingScreenProject();
    
    
        setTimeout(
            () => {
    
    
                if(document.querySelector(".project").style.backgroundImage === ""){
                    //Init
                    document.querySelectorAll(".project").forEach(project => {
                        project.parentNode.href = avaiableProjects[Number(project.dataset.id)].url;
                        project.style.backgroundImage = `url('${avaiableProjects[Number(project.dataset.id)].img}')`;
                    });
    
                    hideLoadingScreenProject();
                }
                else{
                    if( Number(document.querySelectorAll(".project")[document.querySelectorAll(".project").length - 1].dataset.id) !== avaiableProjects[avaiableProjects.length - 1].id){
                        for(let i = 0; i < document.querySelectorAll(".project").length; i++){
                            document.querySelectorAll(".project")[i].parentNode.href= avaiableProjects[i + document.querySelectorAll(".project").length].url;
                            document.querySelectorAll(".project")[i].style.backgroundImage = `url(${avaiableProjects[i + document.querySelectorAll(".project").length].img})`;
                            document.querySelectorAll(".project")[i].dataset.id = i + document.querySelectorAll(".project").length;
                       }
                    }
                    else{
                        for(let i = 0; i < document.querySelectorAll(".project").length; i++){
                            document.querySelectorAll(".project")[i].parentNode.href= avaiableProjects[i].url;
                            document.querySelectorAll(".project")[i].style.backgroundImage = `url(${avaiableProjects[i].img})`;
                            document.querySelectorAll(".project")[i].dataset.id = i;
                       }
                    }
    
    
                   hideLoadingScreenProject();
                }
            }, 600
        )
}

function loadingScreenProject(){
    document.querySelectorAll(".project").forEach((project) => {
        let loadingBox = document.createElement("div");
    
        loadingBox.className = "projectLoadingScreen";
        project.appendChild(loadingBox)
    });
}

function hideLoadingScreenProject(){
    document.querySelectorAll(".projectLoadingScreen").forEach((project) => {
        project.style.opacity = 0;
    });

    setTimeout(() => {
        document.querySelectorAll(".projectLoadingScreen").forEach(project => project.remove());
    }, 500)
}

function updatePageStatus(idx){
    document.body.dataset.page = idx
}

function handleScroll(e){
    let currentPage = pages.filter(page => {
        if(page.id === document.body.dataset.page){
            return page
        }
    });
    let nextPage = null;
    let block = false;
    
    if(e.deltaY < 100){
        //Top
        if(currentPage[0].id !== "0"){
            nextPage = pages.filter(page => {
                if (Number(page.id) === Number(document.body.dataset.page) - 1) {
                    return page
                }
            });
        }
        else{
            block = true;
        }
    }
    else{
        //Bottom
        if(currentPage[0].id !== "2"){
            nextPage = pages.filter(page => {
                if (Number(page.id) === Number(document.body.dataset.page) + 1) {
                    return page
                }
            });
        }
        else{
            block = true;
        }

    }

    if(!block){
        hidePage(currentPage[0].page);
        showPage(nextPage[0].page);
        updatePageStatus(nextPage[0].id);
        fillDot();
    }
}

function canvasSetup(){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    numOfCircl = Math.floor(Math.random() * (100 - 50)) + 50;
}

function circlesAnimation(){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");


    ctx.clearRect(0, 0, c.width, c.height);

    if(circlesAnimNum >= 0){
        circles.forEach(circle => {
            circle.y -= 1;
        });

        circlesAnimNum -= 1;
    }
    else{
        numOfCircl = Math.floor(Math.random() * (10 - 5)) + 5;
        circlesAnimNum = 100;

        renderCircles();
    }

    drawCircles();
    anim = requestAnimationFrame(circlesAnimation);
}

function drawCircles(){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.fillStyle = circle.color;
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function renderCircles(){
    const c = document.querySelector("canvas");

    for(let i = 0; i < numOfCircl; i++){
        circles.push(
            {
                x: Math.floor(Math.random() * c.width),
                y: numOfCircl >= 50 ? Math.floor(Math.random() * c.height) :  Math.floor(c.height + (Math.random() * 150)),
                size: window.screen.width > 768 ? Math.floor(Math.random() * (20 - 2)) + 2 : Math.floor(Math.random() * (15 - 1)) + 1,
                color: randomColor()
            }
        )
    }
}

function randomColor(){
    let colors = ["#ffffff", "#262626", "#cccccc", "#efefef", "2d2d2d", "#1d1d1d"];

    return colors[Math.floor(Math.random() * colors.length)]
}