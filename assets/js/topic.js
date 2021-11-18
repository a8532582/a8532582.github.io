let targetUrl = `../assets/images/topicImg/${targetFolder}`;
async function fetchJSON() {
    const response = await fetch(`${targetUrl}/${loadJsonName}`);
    const ansJson = await response.json();
    return ansJson;
}

async function clickAns(target) {
    let checkPrev = false;
    let questNum =  target.replace(/[^0-9]/ig, "");
    if(questNum>1){
        checkPrev = localStorage.getItem(`quest${questNum-1}`);
    }
    if(checkPrev === null && questNum>1){
        alert("不可以作弊喔");
        return;
    }
    let quest = document.getElementById(target);
    let ansCheck = false;
    let jsonData = await fetchJSON();
    let ansInput = quest.value;
    if (jsonData[target].ans === ansInput) {
        ansCheck = true
        localStorage.setItem(quest.id, ansCheck);
        getRuneMethod(ansCheck, quest, questNum);
    } else {
        alert("答案錯誤");
    }
    return ansCheck
}

async function getRuneMethod(ansCheck, questInput, questNum) {
    let questImg = document.getElementById(`questImg${questNum}`);
    let questRune = document.getElementById(`questrune${questNum}`);
    let background = document.getElementById(`background${questNum}`);
    let inputBlock = document.getElementById(`inputBlock${questNum}`);
    let targetDiv = questInput.parentElement
    targetDiv.remove();
    if (ansCheck) {
        questImg.src = "../assets/images/topicImg/common/ARG-題目背景1920X1080.jpg"
        questImg.style.position = "absolute";

        questRune.src = `${targetUrl}/${questInput.id}-rune.png`
        questRune.style.width = "30%"
        questRune.style.position = "relative"
        questRune.style.marginLeft = "35%"
        questRune.style.paddingTop = "15%"

        background.src = "../assets/images/topicImg/common/符文專用的純色背景.jpg"
        background.style.paddingTop = "4%"
        if (questNum < 3) {
            let nextButton = document.createElement("input");
            nextButton.src = "../assets/images/topicImg/common/下一題按鈕(按下前).png"
            nextButton.type = "image";
            nextButton.style.width = "30%"
            nextButton.style.position = "relative"
            nextButton.style.zIndex = "2";
            nextButton.style.marginTop = "4%"
            nextButton.style.marginLeft = "19%"
            nextButton.onclick = function () {
                if (localStorage.getItem(questInput.id) === "true") {
                    let nextStage = document.getElementById(`quest${parseInt(questNum) + 1}block`);
                    nextStage.style.display = "inline";
                }
            }
            nextButton.onmouseover = function(){
                nextButton.src = "../assets/images/topicImg/common/下一題按鈕(按下後).png"
            }
            nextButton.onmouseout = function(){
                nextButton.src = "../assets/images/topicImg/common/下一題按鈕(按下前).png"
            }

            let downloadRune = document.createElement("input");
            downloadRune.src = "../assets/images/topicImg/common/收集符文(按下前).png"
            downloadRune.type = "image";

            downloadRune.onmouseover = function(){
                downloadRune.src = "../assets/images/topicImg/common/收集符文(按下後).png"
            }
            downloadRune.onmouseout = function(){
                downloadRune.src = "../assets/images/topicImg/common/收集符文(按下前).png"
            }
            downloadRune.style.width = "34%"
            downloadRune.style.position = "relative"
            downloadRune.style.zIndex = "2";
            downloadRune.onclick = function () {
                window.open(`${targetUrl}/${questInput.id}-rune.png`)
            }
            inputBlock.appendChild(nextButton)
            inputBlock.appendChild(downloadRune)
        } else {
            let downloadRune = document.createElement("input");
            downloadRune.src = "../assets/images/topicImg/common/收集符文(按下前).png"
            downloadRune.type = "image";

            downloadRune.onmouseover = function(){
                downloadRune.src = "../assets/images/topicImg/common/收集符文(按下後).png"
            }
            downloadRune.onmouseout = function(){
                downloadRune.src = "../assets/images/topicImg/common/收集符文(按下前).png"
            }
            downloadRune.style.width = "34%"
            downloadRune.style.position = "relative"
            downloadRune.style.zIndex = "2";
            downloadRune.style.marginTop = "4%"
            downloadRune.style.marginLeft = "32%"
            downloadRune.onclick = function () {
                window.open(`${targetUrl}/${questInput.id}-rune.png`)
            }
            inputBlock.appendChild(downloadRune)
        }

    }else{
        alert("不能作弊喔")
    }
}