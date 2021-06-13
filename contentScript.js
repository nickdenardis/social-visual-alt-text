var insertAlt = function () {
    const timelineImages = document.querySelectorAll(
        'main div[data-testid="primaryColumn"] img[src^="https://pbs.twimg.com/media/"]'
    );

    const timelineGifs = document.querySelectorAll(
        'main div[data-testid="primaryColumn"] video[src^="https://video.twimg.com/tweet_video/"]'
    );

    timelineGifs.forEach(function (userGif) {
        if (userGif.getAttribute("data-altdisplayed") !== "true") {
            console.log(userGif.getAttribute("aria-label"));
            let gifLink =
                userGif.parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement;

            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            if (
                !userGif.getAttribute("aria-label") ||
                userGif.getAttribute("aria-label") == "Embedded video"
            ) {
                altText.style.backgroundColor = "red";
                altText.style.height = "12px";
            } else {
                altText.style.color = "white";
                altText.style.backgroundColor = "blue";
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = userGif.getAttribute("aria-label");
            }

            if (gifLink) {
                gifLink.append(altText);
            }

            userGif.setAttribute("data-altdisplayed", "true");
        }
    });

    timelineImages.forEach(function (userImage) {
        if (userImage.getAttribute("data-altdisplayed") !== "true") {
            let imageLink = userImage.closest("a");

            // If there are multiple images
            if (imageLink) {
                const imageCount =
                    imageLink.parentElement.querySelectorAll("a");
                if (imageCount.length > 1) {
                    imageLink =
                        imageLink.parentElement.parentElement.parentElement
                            .parentElement.parentElement;
                }
            }

            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            if (
                !userImage.getAttribute("alt") ||
                userImage.getAttribute("alt") == "Image"
            ) {
                altText.style.backgroundColor = "red";
                altText.style.height = "12px";
            } else {
                altText.style.color = "white";
                altText.style.backgroundColor = "blue";
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = userImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.append(altText);
            }
        }
        userImage.setAttribute("data-altdisplayed", "true");
    });
};

var twitterLoop = function twitterLoop() {
    insertAlt();
    setTimeout(twitterLoop, 500);
};

twitterLoop();
