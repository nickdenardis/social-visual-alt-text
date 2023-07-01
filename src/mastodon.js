// Search for items with alt text
let insertMDAlt = function () {
    const mastodonImages = options.mastodonImages
        ? document.querySelectorAll("#mastodon .media-gallery__item img")
        : [];

    let visualAlt = document.createElement("div");
    visualAlt.setAttribute("aria-hidden", "true");
    let imageContainer = null;

    mastodonImages.forEach(function (mDImage) {
        if (mDImage.getAttribute("data-altdisplayed") !== "true") {
            imageContainer = mDImage.parentElement.parentElement.parentElement;

            // Container for visible text
            let altText = document.createElement("div");
            altText.style.borderBottomRightRadius = "14px";
            altText.style.borderBottomLeftRadius = "14px";

            if (
                !mDImage.getAttribute("alt") ||
                mDImage.getAttribute("alt") == ""
            ) {
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "14px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = mDImage.getAttribute("alt");
            }

            if (imageContainer) {
                visualAlt.appendChild(altText);
            }

            mDImage.setAttribute("data-altdisplayed", "true");

            if (imageContainer) {
                imageContainer.after(visualAlt);
                visualAlt = document.createElement("div");
            }
        }
    });
};

let mastodonLoop = function mastodonLoop() {
    insertMDAlt();
    setTimeout(mastodonLoop, 500);
};

async function initMastodon() {
    // Only continue and pull options if this is a Mastodon site (could be at any URL)
    if (document.getElementById("mastodon") !== null) {
        const result = await getOptions();
        if (result.mastodonImages !== false) {
            mastodonLoop();
        }
    }
}

initMastodon();
