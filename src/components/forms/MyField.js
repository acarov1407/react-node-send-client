import { Field } from "formik"

function MyField({ data}) {
    return (
        <div>
            <label className="block text-gray-100 mb-2" htmlFor={data.id}>{data.label}</label>
            <Field
                type={data.type || "text"}
                id={data.id}
                name={data.name}
                className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-gray-300 focus:outline-none shadow text-white appearance-none"/>
        </div>
    )
}

export default MyField