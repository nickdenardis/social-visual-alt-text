// Search for all media gallery containers
let insertMDAlt = function () {

    const mastodonMediaGalleries = options.mastodonImages
        ? document.querySelectorAll("#mastodon .media-gallery")
        : [];

    // Iterate over all media galleries
    mastodonMediaGalleries.forEach(function (mDMediaGallery) {

        if (mDMediaGallery.getAttribute("data-altdisplayed") !== "true") {

            let visualAlt = document.createElement("div");
            visualAlt.setAttribute("aria-hidden", "true");
            
            let mastodonImages = mDMediaGallery.querySelectorAll('.media-gallery__item img');

            // Iterate over all images in that media gallery
            mastodonImages.forEach(function (mDImage) {

                if (mDImage.getAttribute("data-altdisplayed") !== "true") {

                    // Container for visible text
                    let altText = document.createElement("div");
                    altText.style.borderRadius = "4px";
                    altText.style.marginTop = "1px";

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
                            "Arial, 'Helvetica Neue', Helvetica, sans-serif";
                        altText.textContent = mDImage.getAttribute("alt");
                    }

                    visualAlt.appendChild(altText);
                    mDImage.setAttribute("data-altdisplayed", "true");
                }
            });

            // Add container with all alts to this particular media gallery
            mDMediaGallery.after(visualAlt);
            mDMediaGallery.setAttribute("data-altdisplayed", "true");
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
