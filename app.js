const body = document.querySelector("body");
const themeToggle = document.querySelector(".theme-toggle");
const topicsBox = document.querySelector("#topicsBox");
const quote = document.querySelector("#qoute");
const author = document.querySelector("#author");
const contentSection = document.querySelector('.content-section');
const content = document.querySelector('.content');
const newQuoteBtn = document.querySelector("#new-quote-btn");
const colorsBtn = document.querySelector(".customization #colors-btn");
const typefacesBtn = document.querySelector(".customization #typefaces-btn");
const sizesBtn = document.querySelector(".customization #sizes-btn");

const copyBtn = document.querySelector(".export-section #copy-btn");
const downloadBtn = document.querySelector(".export-section #download-btn");

const API_URL = "https://script.google.com/macros/s/AKfycbzcuvGrLrONEpKGAXwVeA5tWKnoZFljlDcbRmkgehAqJb7ughw-imf4D977DLoN7m4O/exec";

// Filter Quotes
let selectedLang = document.getElementById("lang");
selectedLang.addEventListener("change", () => {
    topicsBox.replaceChildren();
    quote.replaceChildren();
    author.replaceChildren();

    content.classList.add("hidden");

    let loader = document.createElement("div");
    loader.classList.add("loaderBox");

    contentSection.appendChild(loader);
    // console.log(loader);


    let lang = document.getElementById("lang").value;
    filteredApiUrl = `${API_URL}?lang=${lang}`

    // console.log(filteredApiUrl);

    fetch(filteredApiUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            content.classList.remove("hidden");

            const allTopics = data.randomQuote.topics;
            allTopics.forEach((element, index) => {
                const topicData = document.createElement("span");
                topicData.classList.add("topic");
                topicData.innerText = (`#${element}`);
                topicsBox.appendChild(topicData);
            });

            quote.innerHTML = data.randomQuote.quote;
            author.innerHTML = (data.randomQuote.author);

            loader.classList.remove("loaderBox");
        })
        .catch((err) => {
            content.classList.remove("hidden");
            quote.innerHTML = "Somethings went worng!";
            loader.classList.remove("loaderBox");
        });
});


// Theme Mode Switcher - Start
themeToggle.addEventListener("click", () => {
    body.classList.toggle("lightMode");
});
// Theme Mode Switcher - End

// Random Qoute API Request - Start
function getQuote() {
    fetch(API_URL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const allTopics = data.randomQuote.topics;
            allTopics.forEach((element, index) => {
                const topicData = document.createElement("span");
                topicData.classList.add("topic");
                topicData.innerText = (`#${element}`);
                topicsBox.appendChild(topicData);
            });

            quote.innerHTML = data.randomQuote.quote;
            author.innerHTML = (data.randomQuote.author);
        })
        .catch((err) => {
            quote.innerHTML = "Somethings went worng!";
        });
};
getQuote();
// Random Qoute API Request - End

// Customization - Start

const optionsBoxVisibility = (isVisiable, element) => {
    const optionsBox = element;
    optionsBox.classList.toggle("hidden", !isVisiable);
};

//----- New Quote
newQuoteBtn.addEventListener("click", () => {
    topicsBox.replaceChildren();
    getQuote();
});

// ----- Colors Section
const colorsOptionsBox = document.querySelector("#colors-btn .options");

colorsBtn.addEventListener("mouseover", () => {
    optionsBoxVisibility(true, colorsOptionsBox);
});

colorsBtn.addEventListener("mouseout", () => {
    optionsBoxVisibility(false, colorsOptionsBox);
});

const allColors = ["red", "green", "yellow", "purple", "orange", "blue"];
const colorOpt = document.querySelectorAll("#colors-btn .options div");
colorOpt.forEach((element, index) => {
    element.style.backgroundColor = allColors[index];
    element.addEventListener("click", () => {
        contentSection.style.backgroundColor = allColors[index];
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
        quote.style.fontFamily = allTypefaces[index];
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
        quote.style.fontWeight = allFonts[index];
        quote.style.fontSize = allSizes[index];
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



