const hackingFeedback = document.querySelector("#hacking-feedback");
const levelDisplay = document.querySelector("#process");
const result = document.querySelector("#result");

function hackingFake(target, second) {
    let progressLevel = 0;
    let percentPerSecond = 100 / second;
    let started = false;
    let hackingSuccessful = false;
    let dataFetching = true;
    let progressInterval = setInterval(() => {

        if (!dataFetching && hackingSuccessful) {
            let readingDataMessage = `Reading ${target} data ...`;

            let dataFetchingParagraph = document.createElement("p")
                .appendChild(document.createTextNode(readingDataMessage));
            hackingFeedback.after(dataFetchingParagraph);

            console.log(readingDataMessage);
            clearInterval(progressInterval);
        }
        else if (hackingSuccessful) {
            let progressMessage = `Progress : 100%`;
            result.innerHTML = progressMessage;
            console.log(progressMessage);
            let finalMessage = "Hacking successful";
            let finalParagraph = document.createElement("p");
            finalParagraph.appendChild(document.createTextNode(finalMessage));
            hackingFeedback.appendChild(finalParagraph);
            console.log(finalMessage);
            dataFetching = false;
        }

        else if (!started) {
            let start = `Starting hacking ${target}...`;
            levelDisplay.innerHTML = start;
            let progressMessage = `Progress : 0%`;
            result.innerHTML = progressMessage;
            console.log(start);
            console.log(progressMessage);
            progressLevel += percentPerSecond;
            started = true;
        }
        else if (started && dataFetching) {
            let progressMessage = `Progress : ${progressLevel}%`;
            result.innerHTML = progressMessage;
            console.log(progressMessage);
            progressLevel += percentPerSecond;
            if (progressLevel >= 100) {
                hackingSuccessful = true;
            }
        }
    }, 1000);
}

hackingFake("NSA", 7)