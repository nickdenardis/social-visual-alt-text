// Saves options to chrome.storage
function save_options() {
    let twitterImages = document.getElementById("twitter_images").checked;
    let twitterGifs = document.getElementById("twitter_gifs").checked;
    chrome.storage.sync.set(
        {
            twitterImages: twitterImages,
            twitterGifs: twitterGifs,
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
// stored in chrome.storage.
function restore_options() {
    // Use default values
    chrome.storage.sync.get(
        {
            twitterImages: true,
            twitterGifs: true,
        },
        function (items) {
            document.getElementById("twitter_images").checked =
                items.twitterImages;
            document.getElementById("twitter_gifs").checked = items.twitterGifs;
        }
    );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
