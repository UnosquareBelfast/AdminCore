import swal from 'sweetalert2';

export const Toast = swal.mixin({
  toast: true,
  timer: 4000,
  showConfirmButton: false,
});
