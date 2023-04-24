import { ErrorMessage } from "formik"

function MyErrorMessage({ name }) {
    return (
        <ErrorMessage
            name={name}
            className="bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 -mt-2"
            component="div"
        />
    )
}

export default MyErrorMessage