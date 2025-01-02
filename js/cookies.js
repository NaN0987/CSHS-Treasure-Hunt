
// Utility function: creates/sets a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Utility function: gets a cookie with the specified name.
// Returns null if no cookie exists.
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Utility function: deletes the cookie with the specified name.
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Utility function: returns true if the user has cookies enabled
function areCookiesEnabled() {
    // Try setting a test cookie
    document.cookie = "testcookie=1; path=/";

    // Check if the cookie is accessible
    const cookiesEnabled = document.cookie.indexOf("testcookie=") !== -1;

    // Delete the test cookie
    deleteCookie("testcookie");

    return cookiesEnabled;
}


/* ---------------------------------------------------------------------------------------- */

// Check if someone is messing with the cookies
function cookieTamperCheck() {
    if ((getCookie("part") <= 0) || (getCookie("part") > 5)) {
        deleteCookie("part")
    }
}

/** Returns true if the person is on the right part of the treasure hunt */
function checkCookies(partNumber) {
    cookieTamperCheck();
    return (getCookie("part") - 1 >= partNumber)
}

/** Function to handle copying text to the clipboard */
function copyToClipboard(elementId) {
     // Get the text field
    var textElement = document.getElementById(elementId);
    
    // Copy the text inside the text field
    navigator.clipboard.writeText(textElement.innerText);
    
    // Alert the copied text
    console.log("Copied the text to clipboard: " + textElement.value);
}
