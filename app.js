const body = document.querySelector("body");
const themeToggle = document.querySelector(".theme-toggle");
const topicsBox = document.querySelector("#topicsBox");
const qouteBox = document.querySelector("#qouteBox");
const authorBox = document.querySelector("#authorBox");
const contentSection = document.querySelector('.content-section');
const content = document.querySelector('.content');
const newQuoteBtn = document.querySelector("#new-quote-btn");
const colorsBtn = document.querySelector(".customization #colors-btn");
const typefacesBtn = document.querySelector(".customization #typefaces-btn");
const sizesBtn = document.querySelector(".customization #sizes-btn");

const copyBtn = document.querySelector(".export-section #copy-btn");
const downloadBtn = document.querySelector(".export-section #download-btn");

const API_URL = "https://script.google.com/macros/s/AKfycbzPDiQRc2y-gJ7-iaYuMyu_fWtd2Yru4i3Re8G04N2OdV19ecw-847ORRh9UTBjeRoz/exec";

// Quote Loader - Start
function quoteLoader() {
    topicsBox.replaceChildren();
    qouteBox.replaceChildren();
    authorBox.replaceChildren();

    topicsBox.classList.add("loadingElements");
    qouteBox.classList.add("loadingElements");
    authorBox.classList.add("loadingElements");

    let loader = document.createElement("div");
    loader.classList.add("loaderBox");
    contentSection.appendChild(loader);
}
// Quote Loader - End


// Random Qoute API Request - Start
function getQuote(url) {
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            topicsBox.classList.remove("loadingElements");
            qouteBox.classList.remove("loadingElements");
            authorBox.classList.remove("loadingElements");

            const allTopics = data.randomQuote.topics;
            allTopics.forEach((element, index) => {
                const topicData = document.createElement("span");
                topicData.classList.add("topic");
                topicData.innerText = (`#${element}`);
                topicsBox.appendChild(topicData);
            });

            qouteBox.innerHTML = data.randomQuote.quote;
            authorBox.innerHTML = (`- ${data.randomQuote.author}`);
        })
        .catch((err) => {
            qouteBox.innerHTML = "Somethings went worng!";
        });
};
getQuote(API_URL);
// Random Qoute API Request - End

// New Quote - Start
newQuoteBtn.addEventListener("click", () => {
    quoteLoader();
    getQuote(API_URL);
});

document.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
        quoteLoader();
        getQuote(API_URL);
    }
});
// New Quote - End

// Filter Quotes - Start
// let selectFilters = document.querySelectorAll("selectFilters");
let selectedLang = document.getElementById("lang");
let selectedEmotion = document.getElementById("emotion");
let selectedAuthor = document.getElementById("author");
let selectedLength = document.getElementById("length");



let lang = document.getElementById("lang").value;
let emotion = document.getElementById("emotion").value;
let author = document.getElementById("author").value;
let length = document.getElementById("length").value;


let filteredApiUrl;

selectedLang.addEventListener("change", () => {
    quoteLoader();
    lang = document.getElementById("lang").value;
    filteredApiUrl = `${API_URL}?lang=${lang}&emotion=${emotion}&author=${author}&length=${length}`;
    console.log(filteredApiUrl);
    getQuote(filteredApiUrl);
});
selectedEmotion.addEventListener("change", () => {
    quoteLoader();
    emotion = document.getElementById("emotion").value;

    filteredApiUrl = `${API_URL}?lang=${lang}&emotion=${emotion}&author=${author}&length=${length}`;
    console.log(filteredApiUrl);
    getQuote(filteredApiUrl);
});
selectedAuthor.addEventListener("change", () => {
    quoteLoader();
    author = document.getElementById("author").value;

    filteredApiUrl = `${API_URL}?lang=${lang}&emotion=${emotion}&author=${author}&length=${length}`;
    console.log(filteredApiUrl);
    getQuote(filteredApiUrl);
});
selectedLength.addEventListener("change", () => {
    quoteLoader();
    length = document.getElementById("length").value;

    filteredApiUrl = `${API_URL}?lang=${lang}&emotion=${emotion}&author=${author}&length=${length}`;
    console.log(filteredApiUrl);
    getQuote(filteredApiUrl);
});

// Filter Quotes - End


// Theme Mode Switcher - Start
themeToggle.addEventListener("click", () => {
    body.classList.toggle("lightMode");
});
// Theme Mode Switcher - End

// Customization - Start

const optionsBoxVisibility = (isVisiable, element) => {
    const optionsBox = element;
    optionsBox.classList.toggle("hidden", !isVisiable);
};

// ----- Colors Section
const colorsOptionsBox = document.querySelector("#colors-btn .options");

colorsBtn.addEventListener("mouseover", () => {
    optionsBoxVisibility(true, colorsOptionsBox);
});

colorsBtn.addEventListener("mouseout", () => {
    optionsBoxVisibility(false, colorsOptionsBox);
});

const allColors = [
    "linear-gradient(150deg, rgb(0, 176, 158), rgb(19, 77, 93), rgb(16, 23, 31))",
    "linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)",
    "linear-gradient(90deg, hsla(330, 36%, 53%, 1) 0%, hsla(289, 68%, 19%, 1) 100%)",
    "linear-gradient(90deg, hsla(192, 95%, 50%, 1) 0%, hsla(225, 89%, 47%, 1) 100%)",
    "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
    "linear-gradient(90deg, hsla(286, 48%, 91%, 1) 0%, hsla(340, 73%, 75%, 1) 50%, hsla(263, 58%, 45%, 1) 100%)"
];
const colorOpt = document.querySelectorAll("#colors-btn .options div");
contentSection.style.backgroundImage = allColors[0];


colorOpt.forEach((element, index) => {
    element.style.backgroundImage = allColors[index];
    element.addEventListener("click", () => {
        contentSection.style.backgroundImage = allColors[index];
        // document.documentElement.style.setProperty('--background-color', allColors[index]);
    });
});

// ----- Typefaces Section
const typefacesOptionsBox = document.querySelector("#typefaces-btn .options");

typefacesBtn.addEventListener("mouseover", () => {
    optionsBoxVisibility(true, typefacesOptionsBox);
});

typefacesBtn.addEventListener("mouseout", () => {
    optionsBoxVisibility(false, typefacesOptionsBox);
});

const allTypefaces = ["Space Grotesk", "Caveat", "Poppins"];
const typefacesOpt = document.querySelectorAll("#typefaces-btn .options div");
typefacesOpt.forEach((element, index) => {
    element.style.fontFamily = allTypefaces[index];
    element.addEventListener("click", () => {
        qouteBox.style.fontFamily = allTypefaces[index];
    });
});


// ----- Size Section
const sizesOptionsBox = document.querySelector("#sizes-btn .options");

sizesBtn.addEventListener("mouseover", () => {
    optionsBoxVisibility(true, sizesOptionsBox);
});

sizesBtn.addEventListener("mouseout", () => {
    optionsBoxVisibility(false, sizesOptionsBox);
});

const allFonts = ["400", "500", "600"];
const allSizes = ["1.5rem", "2rem", "2.5rem"];

const sizessOpt = document.querySelectorAll("#sizes-btn .options div");
sizessOpt.forEach((element, index) => {
    element.style.fontSize = allSizes[index];
    element.addEventListener("click", () => {
        qouteBox.style.fontWeight = allFonts[index];
        qouteBox.style.fontSize = allSizes[index];
    });
});

// Customization - End



// Export Options - Start
document.addEventListener('DOMContentLoaded', function () {

    // Copy content as a PNG to Clipboard
    copyBtn.addEventListener("click", () => {
        domtoimage.toBlob(contentSection)
            .then(function (blob) {
                console.log(blob);
                try {
                    navigator.clipboard.write([
                        new ClipboardItem({
                            'image/png': blob
                        })
                    ]);
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((err) => {
                console.error("Oops! something went wrong!", err);
            });
    });


    // Convert content to PNG and trigger download
    downloadBtn.addEventListener("click", () => {
        domtoimage.toPng(contentSection)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'downloaded_image.png';
                link.click();
            })
            .catch((err) => {
                console.error("Oops! something went wrong!", err);
            });
    });

});

// Export Options - End


// ---------------------------
const toggleFiltersButton = document.getElementById("toggleFiltersOnMobile");
const filtersContainer = document.getElementById("filters");

toggleFiltersButton.addEventListener("click", () => {
    // Toggle the display property between 'block' and 'none'
    filtersContainer.style.display = (filtersContainer.style.display === "none") ? "block" : "none";
});



// ----------------


