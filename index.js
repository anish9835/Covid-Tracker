// Navigation bar + Bannner STARTS
const body = document.querySelector("body");
const navMenu = document.querySelector(".nav-menu");
const menuList = document.querySelector(".menu-list");
const menuBar = document.querySelector(".bar-btn");
const closeBtn = document.querySelector(".close-btn");
const liveStat = document.querySelector("#live-stat");
const anchor = document.querySelectorAll(".link");
const cardHeader1 = document.querySelector("#collap-btn1");
const cardHeader2 = document.querySelector("#collap-btn2");
const cardHeader3 = document.querySelector("#collap-btn3");
const ctx = document.getElementById("myChart").getContext("2d");
const firstState = document.querySelector("#first");
const secondState = document.querySelector("#second");
const nmbData = document.querySelector("#nmbData");
const collapBtn = document.querySelector("#collap-btn");
const compareBtn = document.querySelector("#compare-btn");
const chart = document.getElementById("myChart");
const searchState1 = document.querySelector("#compare-state1");
const searchState2 = document.querySelector("#compare-state2");


console.log(menuList);
// MENU BAR STARTS

menuBar.addEventListener("click", () => {
    navMenu.classList.add("show");
    menuBar.classList.add("hide");
    body.classList.add("disable");
});
closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("show");
    menuBar.classList.remove("hide");
    body.classList.remove("disable");
});
for (var i = 0; i < 4; i++) {
    anchor[i].addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuBar.classList.remove("hide");
        body.classList.remove("disable");
    });
}

// MENU BAR ENDS

// COMPARE STATES SEARCH AND SHOW DATA STARTS
compareBtn.addEventListener("click", () => {
    if (nmbData.classList.contains("hide")) {
        nmbData.classList.remove("hide");
        chart.classList.remove("hide");
    }
});

collapBtn.addEventListener("click", () => {
    if (collapBtn.classList.contains("collapsed")) {
        nmbData.classList.add("hide");
        chart.classList.add("hide");
        searchState2.value = "";
        searchState1.value = "";
    }
});

// COMPARE STATES SEARCH AND SHOW DATA ENDS

window.onscroll = () => {
    if (this.scrollY > 20) {
        navMenu.classList.add("sticky");
        menuBar.classList.add("dark");
        liveStat.classList.add("dark");
        for (i = 0; i < 4; i++)
            anchor[i].classList.add("dark");
    } else {
        navMenu.classList.remove("sticky");
        menuBar.classList.remove("dark");
        liveStat.classList.remove("dark");
        for (i = 0; i < 4; i++)
            anchor[i].classList.remove("dark");
    }
}



// WORLD DATA STARTS



// 1 GET DATA FROM API STARTS

document.addEventListener("load", getWorldData())
async function getWorldData() {
    const api = await fetch('https://api.covid19api.com/summary');
    const jsonData = await api.json();
    console.log(jsonData);
    setData(jsonData);
}

const setData = (data) => {
    console.log(data);
    var length = data.Countries.length;
    var target = document.querySelector("#worldtbody");
    for (i = 0; i < length; i++) {
        var row = target.insertRow(i);

        var cell0 = row.insertCell(0);
        var country = data.Countries[i].Country;
        cell0.innerHTML = country;

        var cell1 = row.insertCell(1);
        var totalCases = data.Countries[i].TotalConfirmed;
        var str1 = totalCases.toLocaleString("en-US");
        cell1.innerHTML = str1;

        var cell2 = row.insertCell(2);
        var newCases = data.Countries[i].NewConfirmed;
        var str2 = newCases.toLocaleString("en-US");
        cell2.innerHTML = str2;

        var cell3 = row.insertCell(3);
        var totalDeaths = data.Countries[i].TotalDeaths;
        var str3 = totalDeaths.toLocaleString("en-US");
        cell3.innerHTML = str3;
        cell3.classList.add("textcolor");

        var cell4 = row.insertCell(4);
        var newDeaths = data.Countries[i].NewDeaths;
        var str4 = newDeaths.toLocaleString("en-US");
        cell4.innerHTML = newDeaths;
        cell4.classList.add("textcolor");
    }
}

// 2ND TABLE SEARCH STARTS

const worldSearchBox = () => {
    var searchResult = document.querySelector("#search-country");
    let filter = searchResult.value.toUpperCase();

    let myTable = document.querySelector("#worldtbody");

    let row = myTable.getElementsByTagName("tr");

    for (i = 0; i < row.length; i++) {
        let td = row[i].getElementsByTagName("td")[0];
        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                row[i].style.display = "";
            } else {
                row[i].style.display = "none";
            }
        }
    }
}

// TABLE SEARCH ENDS
// WORDL DATA ENDS


// INDIA DATA STARTS

// 1ST GETTING AND SETTING API DATA STARTS

document.addEventListener("load", getIndiaData())
async function getIndiaData() {
    const indApi = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
    const indData = await indApi.json();
    console.log(indData.data.regional);
    setIndData(indData);
}

const setIndData = (indJsonData) => {
    console.log(indJsonData);
    var l = indJsonData.data.regional.length;
    var target = document.querySelector("#indtbody");
    for (i = 0; i < l; i++) {
        var row = target.insertRow(i);
        var cell0 = row.insertCell(0);
        var state = indJsonData.data.regional[i].loc;
        cell0.innerHTML = state;

        var cell1 = row.insertCell(1);
        var totalCase = indJsonData.data.regional[i].totalConfirmed;
        var str1 = totalCase.toLocaleString("en-US");
        cell1.innerHTML = str1;

        var cell2 = row.insertCell(2);
        var foreignCase = indJsonData.data.regional[i].confirmedCasesForeign;
        var str2 = foreignCase.toLocaleString("en-US");
        cell2.innerHTML = str2;

        var cell3 = row.insertCell(3);
        var totalDeath = indJsonData.data.regional[i].deaths;
        var str3 = totalDeath.toLocaleString("en-US");
        cell3.innerHTML = str3;
        cell3.classList.add("textcolor");

        var cell4 = row.insertCell(4);
        var discharged = indJsonData.data.regional[i].discharged;
        var str4 = discharged.toLocaleString("en-US");
        cell4.innerHTML = str4;
    }
}

// 2ND TABLE SEARCH STARTS

const indSearchBox = () => {
    var searchResult = document.querySelector("#search-state");
    let filter = searchResult.value.toUpperCase();

    let myTable = document.querySelector("#indtbody");

    let row = myTable.getElementsByTagName("tr");

    for (i = 0; i < row.length; i++) {
        let td = row[i].getElementsByTagName("td")[0];
        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                row[i].style.display = "";
            } else {
                row[i].style.display = "none";
            }
        }
    }
}

// TABLE SEARCH ENDS

// INDIA DATA ENDS


// COMPARE INDIA DATA STARTS

const compareState = () => {
    var searchResult = document.querySelector("#compare-state1");
    var searchResult1 = document.querySelector("#compare-state2");
    var filter = searchResult.value.toUpperCase();
    var filter1 = searchResult1.value.toUpperCase();

    let myTable = document.querySelector("#indtbody");

    let row = myTable.getElementsByTagName("tr");

    for (var i = 0; i < row.length; i++) {
        var td = row[i].getElementsByTagName("td");
        var textValue = td[0].textContent || td[0].innerHTML;
        if (textValue.toUpperCase() === filter)
            break;
    }
    let state1Data = td;
    for (var i = 0; i < row.length; i++) {
        var td = row[i].getElementsByTagName("td");
        var textValue1 = td[0].textContent || td[0].innerHTML;
        if (textValue1.toUpperCase() === filter1)
            break;
    }
    let state2Data = td;
    var ylabel = [];
    ylabel.push(parseInt(state1Data[1].textContent.replace(/\,/g, '')));
    ylabel.push(parseInt(state1Data[2].textContent.replace(/\,/g, '')));
    ylabel.push(parseInt(state1Data[3].textContent.replace(/\,/g, '')));
    ylabel.push(parseInt(state1Data[4].textContent.replace(/\,/g, '')));

    var ylabel1 = [];
    ylabel1.push(parseInt(state2Data[1].textContent.replace(/\,/g, '')));
    ylabel1.push(parseInt(state2Data[2].textContent.replace(/\,/g, '')));
    ylabel1.push(parseInt(state2Data[3].textContent.replace(/\,/g, '')));
    ylabel1.push(parseInt(state2Data[4].textContent.replace(/\,/g, '')));

    const config = {
        type: "bar",
        data: {
            labels: [
                "Total Cases",
                "Foreign Cases",
                "Total Deaths",
                "Recovered",
            ],
            datasets: [{
                label: textValue,
                data: ylabel,
                backgroundColor: "rgba(153,205,1,0.6)",
            }, {
                label: textValue1,
                data: ylabel1,
                backgroundColor: "rgba(15,153,10,0.6)",
            }, ],
        },
    };
    if (window.bar != undefined)
        window.bar.destroy();
    window.bar = new Chart(ctx, config);

    firstState.children[0].innerHTML = textValue;
    firstState.children[1].lastChild.textContent = state1Data[1].textContent;
    firstState.children[2].lastChild.textContent = state1Data[3].textContent;
    firstState.children[3].lastChild.textContent = state1Data[4].textContent;

    secondState.children[0].innerHTML = textValue1;
    secondState.children[1].textContent = `Total Cases : ${state2Data[1].textContent}`;
    secondState.children[2].textContent = `Total Deaths :${state2Data[3].textContent}`;
    secondState.children[3].textContent = `Recovered : ${state2Data[4].textContent}`;
}

// COMPARE INDIA DATA ENDS