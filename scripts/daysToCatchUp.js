// JavaScript source code
"use strict"

let getDaysToCatchUp = (totalEpNum, canonEpNum, fillerEpNum, episodesPerDay, newEpisodesPerWeek) => {
    if (Number.isNaN(totalEpNum) || Number.isNaN(episodesPerDay) || Number.isNaN(newEpisodesPerWeek)) {
        return null;
    }
    if (Number.isNaN(canonEpNum)) {
        if (Number.isNaN(fillerEpNum)) {
            return null;
        } else {
            canonEpNum = totalEpNum - fillerEpNum;
        }
    }

    let days = canonEpNum / episodesPerDay;
    let newEps = newEpisodesPerWeek * days / 7;
    let newCanonEpNum = newEps * (canonEpNum / totalEpNum);
    let extraDays = newCanonEpNum / episodesPerDay;

    while(extraDays / 7 >= 1) {
        days = days + extraDays;

        newEps  = newCanonEpNum / 7;
        newCanonEpNum = newEps * (canonEpNum / totalEpNum);
        extraDays = newCanonEpNum / episodesPerDay;
    }

    days = days + extraDays;

    return days;
}

document.querySelector("#calculator").addEventListener("submit", function(e){
    e.preventDefault();

    const resultMessage = document.querySelector("#calculationResult");
    const currentEpisodesMessage = document.querySelector("#currentEpisodes");
    const fillerRateMessage = document.querySelector("#fillerRate");
    const estimatedDaysMessage = document.querySelector("#estimatedDays");

    const totalEpNum = document.querySelector("#totalEpisodesInput").valueAsNumber;
    const canonEpNum = document.querySelector("#canonEpisodesInput").valueAsNumber;
    const fillerEpNum = document.querySelector("#fillerEpisodesInput").valueAsNumber;
    const episodesPerDay = document.querySelector("#episodesPerDayInput").valueAsNumber;
    const newEpisodesPerWeek = document.querySelector("#episodesPerWeekInput").valueAsNumber;

    const daysEstimation = getDaysToCatchUp(totalEpNum, canonEpNum, fillerEpNum, episodesPerDay, newEpisodesPerWeek);

    if (daysEstimation === null) {
        alert("Error! Missing fields!");

        resultMessage.setAttribute("class", "invisible")
    } else {
        currentEpisodesMessage.innerText = totalEpNum;

        if (Number.isNaN(canonEpNum)) {
            fillerRateMessage.innerText = ((fillerEpNum / totalEpNum) * 100).toFixed(2);
        } else {
            fillerRateMessage.innerText = (1 - (canonEpNum / totalEpNum)) * 100;
        }
        
        estimatedDaysMessage.innerText = daysEstimation.toFixed(0);

        resultMessage.setAttribute("class", "visible")
    }
});

