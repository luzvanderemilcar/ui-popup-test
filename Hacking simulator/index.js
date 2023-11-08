const hackingFeedback = document.querySelector("#hacking-feedback");
const levelDisplay = document.querySelector("#process");
const result = document.querySelector("#result");

function hackingFake(target, second) {
    let progressLevel = 0;
    let started = false;
    let success = false;
    let dataFetching = false;
    let progressInterval = setInterval(() => {

        if (dataFetching) {
            let readingDataMessage = `Reading ${target} data ...`;

            let p = dataFetchingParagraph.appendChild(document.createTextNode(readingDataMessage));
            hackingFeedback.after(p);
            console.log(readingDataMessage);
            clearInterval(progressInterval);
        }

        else if (success) {
            let progressMessage = `Progress : ${progressLevel}%`;
            result.innerHTML = progressMessage;
            console.log(progressMessage);
            let finalMessage = "Hacking successful";
            let finalParagraph = document.createElement("p");
            let p = finalParagraph.appendChild(document.createTextNode(finalMessage));
            hackingFeedback.appendChild(p);
            console.log(finalMessage);
            success = false;
            dataFetching = true
        }
        else if (!started) {
            let start = `Starting hacking ${target}...`;
            levelDisplay.innerHTML = start;
            console.log(start);
            started = true;
        }
        else if (progressLevel >= 0 && progressLevel <= 100) {
            let progressMessage = `Progress : ${progressLevel}%`;
            result.innerHTML = progressMessage;
            console.log(progressMessage);

            progressLevel += second;
            if (progressLevel == 100) {
                success = true;
            }
        }
    }, second * 100);
}

hackingFake("NSA", 10);