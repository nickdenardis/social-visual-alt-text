// Search for items with alt text
let insertLNAlt = function () {
    // LinkedIn images
    const linkedinImages = document.querySelectorAll(
        "div.ivm-view-attr__img-wrapper img.update-components-image__image"
    );

    linkedinImages.forEach(function (lnImage) {
        if (lnImage.getAttribute("data-altdisplayed") !== "true") {
            let imageLink =
                lnImage.parentElement.parentElement.parentElement.parentElement
                    .parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            altText.style.borderBottomRightRadius = "14px";
            altText.style.borderBottomLeftRadius = "14px";

            // Move around the border radius
            lnImage.style.borderBottomRightRadius = "0px";
            lnImage.style.borderBottomLeftRadius = "0px";

            if (
                !lnImage.getAttribute("alt") ||
                lnImage.getAttribute("alt") ==
                    "No alternative text description for this image"
            ) {
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else if (lnImage.getAttribute("alt").includes("Image preview")) {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.insertAdjacentHTML('beforeend', newlineToBr(lnImage.getAttribute("alt")));
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "14px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.insertAdjacentHTML('beforeend', newlineToBr(lnImage.getAttribute("alt")));
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            lnImage.setAttribute("data-altdisplayed", "true");
        }
    });
};

let linkedInLoop = function linkedInLoop() {
    insertLNAlt();
    setTimeout(linkedInLoop, 500);
};

async function initLinkedIn() {
    const result = await getOptions();

    if (result.linkedinImages !== false) {
        linkedInLoop();
    }
}

initLinkedIn();
