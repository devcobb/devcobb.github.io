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

(function init() {
    loadingScreen();

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
    screen.innerHTML = `<img src="../img/logo.png" />`;
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
        setTimeout( () => lines[0].style.transform = `rotate(45deg)`, 200);
        setTimeout( () => {
          lines[1].style.transform += `translateY(-200%) rotate(-45deg)`;
          lines[2].style.opacity = `0`;
        });
        document.querySelector('#mobileMenu').style.left = '0%';
    }
    else{
        hamburger.dataset.mode = 'hidden';
        lines[2].style = `margin-top:5px;`;
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
        document.querySelector(".row").style.opacity = "0";
        setTimeout(
            () => {
                document.querySelector(".row").style.display = "none"
            },
            300
        );

        circles = [];
  
        return cancelAnimationFrame(anim)
    }
}

function showPage(page){
    if(page === "#about"){
        document.querySelector(".row").style.display = "block";

        canvasSetup();
        renderCircles();
        drawCircles();
        circlesAnimation();

        setTimeout(
            () => {
                document.querySelector(".row").style.opacity = "1";
            },
            300
        );
    }
    else if(page === "#projects"){
        document.querySelectorAll(".projectBox").forEach(box => createLoadingBox(box))
        setTimeout(
            () => {
                document.querySelector("#projectBox").style.transform = "none";
                document.querySelectorAll(".projectRow").forEach(project => project.style.margin = "1%");
                document.querySelectorAll(".projectRow a").forEach(project => project.style.margin = "1%");
            },
            500
        );
    }

    document.querySelector(page).style.height = "100%";
}

function createLoadingBox(box){
    let img = new Image();
    let avaiableProjects = [
        {
            id: 0,
            img: "deliciae.JPG"
        },
        {
            id: 1,
            img: "calendation.JPG"
        },
        {
            id: 2,
            img: "filmer.JPG"
        },
        {
            id: 3,
            img: "financer.JPG"
        },
        {
            id: 4,
            img: "tubedit.JPG"
        },
        {
            id: 5,
            img: "crime.JPG"
        },
        {
            id: 6,
            img: "cardmemory.JPG"
        },
        {
            id: 7,
            img: "quiz.JPG"
        },
        {
            id: 8,
            img: "tanky.JPG"
        },
        {
            id: 9,
            img: "evolution.JPG"
        },
        {
            id: 10,
            img: "portoflio.JPG"
        },
        {
            id: 11,
            img: "constructionImg.png"
        },
    ];
    let loadingBox = document.createElement("div");
    loadingBox.id = "loadingBox"

    loadingBox.innerHTML = `<div id="loading"></div>`;
    box.appendChild(loadingBox);
    img.onload = () => {
        box.children[1].remove();
    }

    img.src = `../img/${avaiableProjects.filter(proj => proj.id === parseInt(box.dataset.id))[0].img}`;
    box.appendChild(img)
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
                y: numOfCircl >= 50 ? Math.floor(Math.random() * c.height) : c.height,
                size: Math.floor(Math.random() * (20 - 2)) + 2,
                color: randomColor()
            }
        )
    }
}

function randomColor(){
    let colors = ["#ffffff", "#262626", "#cccccc", "#efefef", "2d2d2d", "#1d1d1d"];

    return colors[Math.floor(Math.random() * colors.length)]
}