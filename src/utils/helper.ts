import Swal, { SweetAlertOptions } from "sweetalert2";

const successAlert = (title: string, confirmButtonText: string) =>
  Swal.fire({
    title,
    icon: "success",
    confirmButtonText,
  });

const errorAlert = (title: string, confirmButtonText?: string) =>
  Swal.fire({
    title,
    icon: "error",
    confirmButtonText: "تلاش مجدد",
  });


export { successAlert, errorAlert };
