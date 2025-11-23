document.getElementById("editor").value = loadValue("editor");

updatePreview("editor-change");

// Saving and loading functions
function saveValue(e) {
    var id = e.id;
    var value = e.value;
    localStorage.setItem(id, value);
    updatePreview("editor-change");
}

function loadValue(v) {
    if (!localStorage.getItem(v)) {
        return "";
    }
    return localStorage.getItem(v);
}

// Editor settings
function updatePreview(operation) {
    
    if (operation == "wrap-text") {
        if (document.getElementById("wrap-text").checked) {
            document.getElementById("editor").style.whiteSpace = "pre-wrap";
        } else {
            document.getElementById("editor").style.whiteSpace = "pre";
        }
        return;
    }
    if (operation == "editor-change") {
        var text = document.getElementById("editor").value;
        //  "[b]", "[/b]", 
        //  "[i]", "[/i]", 
        //  "[u]", "[/u]",
        //  "[strike]", "[/strike]", 
        text = text.replaceAll("[b]", "<b>");
        text = text.replaceAll("[/b]", "</b>");
        text = text.replaceAll("[i]", "<i>");
        text = text.replaceAll("[/i]", "</i>");
        text = text.replaceAll("[u]", "<u>");
        text = text.replaceAll("[/u]", "</u>");
        text = text.replaceAll("[strike]", "<s>");
        text = text.replaceAll("[/strike]", "</s>");
        text = text.replaceAll(/\n/g, "<br>");
        // Find [url] tags and replace them with <a> tags
        text = text.replaceAll(/\[url=(.*?)\](.*?)\[\/url\]/g, (orig, url, text) => {
            var domain = new URL(url).hostname;
            if (!url.includes("steampowered") && !url.includes("steamcommunity")) {
                return `<a href="${url}" class="link-preview">${text}</a> <div class="untrusted-domain">[${domain}]</div>`;
            } else {
                return `<a href="${url}" class="link-preview">${text}</a>`;
            }
        });
        document.getElementById("preview-container").innerHTML = text;
        return;
    }
}

function updateLineNumbers() {
    var editor = document.getElementById("editor");
    var lineNumbers = document.getElementById("line-numbers");
    var lines = editor.value.split("\n");
    var lineNumbersHTML = "";
    for (var i = 0; i < lines.length; i++) {
        lineNumbersHTML += "<span>" + (i + 1) + "</span>";
    }
    lineNumbers.innerHTML = lineNumbersHTML;
}
updateLineNumbers();