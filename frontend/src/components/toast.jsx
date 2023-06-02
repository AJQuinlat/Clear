
function info(title, message) {
    return `
    <div class="p-4 alert alert-info shadow-lg">
        <div>
            <span class="align-middle ml-1 mr-2 material-symbols-rounded" style="font-size: 2.5rem;">help</span>
            <div>
            <h3 class="font-bold font-lg">`+ title + `</h3>
            <div>`+ message + `</div>
        </div>
        <div class="ml-2 flex-none">
            <button class="btn btn-ghost btn-sm btn-circle" onclick="window.dismissToast(event)">
                <span class="material-symbols-rounded">close</span>
            </button>
        </div>
    </div>
    `;
}

function error(title, message) {
    return `
    <div class="p-4 alert alert-error shadow-lg">
        <div>
            <span class="align-middle ml-1 mr-2 material-symbols-rounded" style="font-size: 2.5rem;">cancel</span>
            <div>
            <h3 class="font-bold font-lg">`+ title + `</h3>
            <div>`+ message + `</div>
        </div>
        <div class="ml-2 flex-none">
            <button class="btn btn-ghost btn-sm btn-circle" onclick="window.dismissToast(event)">
                <span class="material-symbols-rounded">close</span>
            </button>
        </div>
    </div>
    `;
}

function warning(title, message) {
    return `
    <div class="p-4 alert alert-warning shadow-lg">
        <div>
            <span class="align-middle ml-1 mr-2 material-symbols-rounded" style="font-size: 2.5rem;">error</span>
            <div>
            <h3 class="font-bold font-lg">`+ title + `</h3>
            <div>`+ message + `</div>
        </div>
        <div class="ml-2 flex-none">
            <button class="btn btn-ghost btn-sm btn-circle" onclick="window.dismissToast(event)">
                <span class="material-symbols-rounded">close</span>
            </button>
        </div>
    </div>
    `;
}

function success(title, message) {
    return `
    <div class="p-4 alert alert-success shadow-lg">
        <div>
            <span class="align-middle ml-1 mr-2 material-symbols-rounded" style="font-size: 2.5rem;">check_circle</span>
            <div>
            <h3 class="font-bold font-lg">`+ title + `</h3>
            <div>`+ message + `</div>
        </div>
        <div class="ml-2 flex-none">
            <button class="btn btn-ghost btn-sm btn-circle" onclick="window.dismissToast(event)">
                <span class="material-symbols-rounded">close</span>
            </button>
        </div>
    </div>
    `;
}


export const showToast = async (title, message, alertType, position = 'left') => {
    // Get the body element
    const body = document.querySelector("body");
    // Find a element with the id 'clear-notification'
    let toasty = document.getElementById("clear-notification");
    if (!toasty) {
        // Create the toasty element after the body
        toasty = document.createElement("div");
        // Add the div id to the toasty element
        toasty.id = "clear-notification";
        // append the toasty element to the div
        body.appendChild(toasty);
    }
    // Add the style to the main toasty element so we can use it
    toastDefaultStyle(toasty, position);

    const toastyMessage = document.createElement("div");
    // Add padding class to the toasty message
    toastyMessage.className = "p-3 m-4 block transform transition-all duration-200 ease-out opacity-0";
    toasty.appendChild(toastyMessage);
    // Start the toasty animation
    toastsAnimation(toastyMessage);

    // Add the html to the toasty element
    switch (alertType) {
        case 'info':
            toastyMessage.innerHTML = info(title, message);
            break;
        case 'error':
            toastyMessage.innerHTML = error(title, message);
            break;
        case 'success':
            toastyMessage.innerHTML = success(title, message);
            break;
        default:
            toastyMessage.innerHTML = warning(title, message);
            break;
    }
    // Move the progress bar once reached the end of the toasty remove the toasty
    moveProgressBar(toastyMessage, 50);
};

/**
 * Add the default style to the main toasty element
 *
 * @param mixed element
 *
 * @return [type]
 */
function toastDefaultStyle(element, position) {
    // Add styles to the toasty element
    element.style.position = "fixed";
    element.style.zIndex = "999999";
    // Reset the toasty element position
    element.style.top = null;
    element.style.left = null;
    element.style.right = null;
    element.style.bottom = null;
    element.style.transform = null;

    // Align the object based on the position
    if (position === "top") {
        // Align on the middle of the screen
        element.style.top = "0";
        element.style.left = "50%";
        element.style.transform = "translateX(-50%)";
    } else if (position === "bottom") {
        element.style.bottom = "0";
        element.style.left = "50%";
        element.style.transform = "translateX(-50%)";
    } else if (position === "left") {
        element.style.left = "0";
        element.style.bottom = "0";
    } else {
        element.style.top = "0";
        element.style.right = "0";
    }
    element.style.margin = "0 auto";
}

/**
 * Animate the toasty message using tailwindcss animation classes
 *
 * @param mixed element
 *
 * @return [type]
 */
function toastsAnimation(element) {
    setTimeout(() => {
        // Remove class 'hidden' from the toasty element
        element.classList.remove("opacity-0");
        // Add class 'animate' to the toasty element
        element.classList.add("opacity-100");
    }, 200);
}

/**
 * Move the progress bar once reached the end of the toasty remove the toasty
 *
 * @param mixed element
 * @param mixed duration
 *
 */
function moveProgressBar(element, duration) {
    const target = element;
    let width = 1;
    let id = setInterval(frame, duration);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            setTimeout(() => {
                // Remove class 'hidden' from the toasty element
                element.classList.remove("opacity-100");
                // Add class 'animate' to the toasty element
                element.classList.add("opacity-0");

                setTimeout(() => {
                    target.remove();
                }, 300);
            }, 200);
        } else {
            width++;
        }
    }
}

/**
 * Used in the button when the user clicks the button to remove the toasty
 *
 * @param mixed element
 *
 */
function dismissToast(element) {
    const target = element.target;
    // Get target parent element
    const parent =
        target.parentElement.parentElement.parentElement.parentElement
            .parentElement;
    parent.remove();
}
// Add to the window so we can use the function in the button
window.dismissToast = dismissToast;
