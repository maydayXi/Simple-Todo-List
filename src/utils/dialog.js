import Swal from "sweetalert2";

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
    showUpdateDialog,
    showErrorDialog
};