import Swal from 'sweetalert2'

export const showModalAlert = (data) => {

    Swal.fire({
        title: data.title,
        text: data.content,
        icon: data.error ? 'error' : 'success',
        background: 'rgb(17 24 39)',
        color: '#fff',
    })

}
export const showDialogDelete = async (data) => {
    const result = await Swal.fire({
        title: data.title,
        text: data.content,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        background: 'rgb(17 24 39)',
        color: '#fff',
        iconColor: 'rgb(245 158 11)'
    })

    return result;
}

export const showDialogOption = async (data) => {
    const result = await Swal.fire({
        title: data.title,
        text: data.content,
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: data.yesOption,
        denyButtonText: data.noOption,
        background: 'rgb(17 24 39)',
        color: '#fff',
        iconColor: 'rgb(245 158 11)'
    })

    return result;
}