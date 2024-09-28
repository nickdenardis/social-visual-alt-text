// Search for items with alt text
let insertIGAlt = function () {
    // Instagram images
    const instagramImages = options.instagramImages
        ? document.querySelectorAll(
              'main article img[src^="https://scontent"]:not([draggable="false"], [alt*="highlight story picture"]), div[role="button"] img[src^="https://scontent"]:not([draggable="false"], [alt*="highlight story picture"]), main article img[src^="https://instagram"]:not([alt*="profile picture"])'
          )
        : [];

    instagramImages.forEach(function (igImage) {
        if (igImage.getAttribute("data-altdisplayed") !== "true") {
            // Instagram June 2021 visible container (single image working)
            let imageLink = igImage.parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            // altText.style.maxWidth = "600px";

            let hasMultipleImages = false;
            let mainSection = document.querySelector('section main')
            if (mainSection !== null) {
                hasMultipleImages = mainSection.querySelector('ul') !== null;
                imageLink = document.querySelector('section main').firstElementChild.firstElementChild;
            }
            

            if (
                !igImage.getAttribute("alt") ||
                igImage.getAttribute("alt") == "Image"
            ) {
                imageLink =
                    igImage.parentElement.parentElement.parentElement
                        .parentElement.parentElement;
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
        // If on an individual instagram page
        const url = window.location.href;
        const onViewPage = url.includes('/p/') && url.split('/').length > 2;
        const onReelPage = url.includes('/reel/') && url.split('/').length > 2;

        if (!onReelPage) {
            (onViewPage)?insertIGAlt():instagramLoop();
        }
    }
}

initInstagram();
