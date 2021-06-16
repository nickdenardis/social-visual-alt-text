// If sync.get fails, we default to everything on
let default_options = {
    twitterImages: true,
    twitterGifs: true,
    colorNoAlt: '#FF0000',
    colorAltBg: '#0000FF',
    colorAltText: '#FFFFFF',
};

// Saves options to chrome.storage
function save_options() {
    let options = {
        twitterImages: document.getElementById("twitter_images").checked,
        twitterGifs: document.getElementById("twitter_gifs").checked,
        colorNoAlt: document.getElementById("color_no_alt").value,
        colorAltBg: document.getElementById("color_alt_background").value,
        colorAltText: document.getElementById("color_alt_text").value,
    };

    chrome.storage.sync.set(
        {
            options: options,
        },
        function () {
            // Update status to let user know options were saved.
            let status = document.getElementById("status");
            status.textContent = "Options saved.";
            setTimeout(function () {
                status.textContent = "";
            }, 750);
        }
    );
}

// Restores select box and checkbox state using the preferences
function restore_options() {
    // Use default values
    chrome.storage.sync.get(
        {
            options: default_options
        },
        function (items) {
            document.getElementById("twitter_images").checked =
                items.options.twitterImages || default_options.twitterImages;
            document.getElementById("twitter_gifs").checked =
                items.options.twitterGifs || default_options.twitterGifs;
            document.getElementById("color_no_alt").value =
                items.options.colorNoAlt || default_options.colorNoAlt;
            document.getElementById("color_alt_background").value =
                items.options.colorAltBg || default_options.colorAltBg;
            document.getElementById("color_alt_text").value =
                items.options.colorAltText || default_options.colorAltText;
            }
    );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
