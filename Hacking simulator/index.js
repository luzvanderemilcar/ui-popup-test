let hackingFeedback = document.querySelector("#hacking-feedback");
let levelDisplay = document.querySelector("#process");
let result = document.querySelector("#result");

function hackingFake(target, second) {
    let progressLevel = 0;
    let started = false;
    let success = false;
    let dataFetching = false;
    let progressInterval = setInterval(() => {
       
   if (dataFetching) {
       let readingDataMessage = document.createTextNode(`Reading ${target} data ...`);
                  let dataFetchingParagraph = document.createElement("p");
                  let p = dataFetchingParagraph.appendChild(readingDataMessage);
                  hackingFeedback.after(p);
                  clearInterval(progressInterval);
   }
   
      else if (success) {
           let finalParagraph = document.createElement("p");
           let finalMessage = document.createTextNode("Hacking successful");
           let p = finalParagraph.appendChild(finalMessage);
           hackingFeedback.appendChild(p);
           success = false;
           dataFetching = true
       }
       else if (!started) {
    levelDisplay.innerHTML =`Starting hacking ${target}...`;
           started = true;
       }
       else if (progressLevel > 0 && progressLevel < 100) {
           result.innerHTML =`Progress : ${progressLevel}%`;
           progressLevel += second;
       }
       else if (progressLevel == 0) {
            result.innerHTML =`Progress : ${progressLevel}%`;
            progressLevel += second;
        }
        else if (progressLevel == 100) {
            result.innerHTML =`Progress : ${progressLevel}%`;
            success = true;
        }
    }, second * 100);
}

hackingFake("NSA", 10);