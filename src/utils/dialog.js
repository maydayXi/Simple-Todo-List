import Swal from "sweetalert2";

const showUserNotFoundError = error => {
    const { response } = error;
    const { status, statusText, data } = response;
    const { message } = data;

    return Swal.fire({
        icon: "error",
        title: statusText,
        text: status == 404 ? `User ${statusText}` : message[0]
    }).then(() => status);
};

const showEmailEmpty = () =>
    Swal.fire("Oops", "請輸入 Email", "error");

const showPasswordEmpty = () => 
    Swal.fire("Oops", "請輸入密碼", "error");

const showRedirectToSignIn = () => 
    Swal.fire("Sign In", "You need sign up a new account", "info");

const showPasswordConfirmError = () => 
    Swal.fire("Oops", "兩次密碼輸入不一致", "error");


const showSignUpFormValidateError = form => 
    Swal.fire("Oops", `${Object.keys(form).map(key => !form[key] 
        ? `<p class='alert-text'>請輸入：[${key}]</p>` : "")
        .join("")}`, "error");

const showUpdateDialog = value => {
    return Swal.fire({
        icon: "info",
        title: "Update todo item",
        input: "text",
        inputValue: value,
        inputPlaceholder: "待辦事項 Content",
        showCancelButton: true,
        /**
         * Get new todo item content
         * @param {string} input new todo item content
         * @returns {string}
         */
        preConfirm: input => input,
    });
};

const showErrorDialog = error => {
    const { response, code } = error;
    const { data } = response;
    const { message } = data;
    return Swal.fire({
        icon: "error",
        title: code,
        text: message || data
    });
};

export {
    showUserNotFoundError,
    showEmailEmpty,
    showPasswordEmpty,
    showRedirectToSignIn,
    showPasswordConfirmError,
    showSignUpFormValidateError,
    showUpdateDialog,
    showErrorDialog
};