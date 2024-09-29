// Search for items with alt text
let insertIGAlt = function () {
    // Instagram images
    const instagramImages = options.instagramImages
        ? document.querySelectorAll(
              'main article img[src^="https://scontent"]:not([draggable="false"], [alt*="highlight story picture"]), div[role="button"] img[src^="https://scontent"]:not([draggable="false"], [alt*="highlight story picture"])'
          )
        : [];

    instagramImages.forEach(function (igImage) {
        if (igImage.getAttribute("data-altdisplayed") !== "true") {
            // Instagram June 2021 visible container (single image working)
            let imageLink = igImage.parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            const onViewPage = window.location.href.includes("/p/");
            const inOverlay = igImage.closest("article");

            // Deteremine where to put the alt text in the DOM
            if (!onViewPage) {
                imageLink = igImage.closest('div[role="button"]');
            } else if (inOverlay) {
                imageLink = igImage.closest('div[role="button"]');
                imageLink =
                    imageLink.parentElement.parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement
                        .parentElement;
            } else {
                // If on individual item view
                let hasMultipleImages = false;
                let mainSection = document.querySelector("section main");
                if (mainSection !== null) {
                    hasMultipleImages =
                        mainSection.querySelector("ul") !== null;
                    imageLink =
                        document.querySelector("section main").firstElementChild
                            .firstElementChild;
                }
            }

            if (
                !igImage.getAttribute("alt") ||
                igImage.getAttribute("alt") == "Image"
            ) {
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else if (
                igImage.getAttribute("alt").includes("May be an image of") ||
                igImage.getAttribute("alt").includes("Photo by")
            ) {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = igImage.getAttribute("alt");
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = igImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            igImage.setAttribute("data-altdisplayed", "true");
        }
    });
};

let instagramLoop = function instagramLoop() {
    insertIGAlt();
    setTimeout(instagramLoop, 500);
};

async function initInstagram() {
    const result = await getOptions();
    if (result.instagramImages !== false) {
        instagramLoop();
    }
}

initInstagram();
