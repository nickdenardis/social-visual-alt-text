// If sync.get fails, we default to everything on
let options = {
    twitterImages: true,
    twitterGifs: true,
    instagramImages: true,
    facebookImages: true,
    tweetdeckImages: true,
    colorNoAlt: "#FF0000",
    colorAltBg: "#0000FF",
    aiColorAltBg: "#750238",
    colorAltText: "#FFFFFF",
};

// Get the users preferences
chrome.storage.sync.get(["options"], function (result) {
    if (result.options) {
        options.twitterImages = result.options.hasOwnProperty("twitterImages")
            ? result.options.twitterImages
            : options.twitterImages;
        options.twitterGifs = result.options.hasOwnProperty("twitterGifs")
            ? result.options.twitterGifs
            : options.twitterGifs;
        options.instagramImages = result.options.hasOwnProperty(
            "instagramImages"
        )
            ? result.options.instagramImages
            : options.instagramImages;
        options.tweetdeckImages = result.options.hasOwnProperty(
            "tweetdeckImages"
        )
            ? result.options.tweetdeckImages
            : options.tweetdeckImages;

        options.colorNoAlt = result.options.colorNoAlt || options.colorNoAlt;
        options.colorAltBg = result.options.colorAltBg || options.colorAltBg;
        options.aiColorAltBg =
            result.options.aiColorAltBg || options.aiColorAltBg;
        options.colorAltText =
            result.options.colorAltText || options.colorAltText;
    }
});

// Make the options available to other JS files
export { options };
