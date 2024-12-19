
interface MyTextInputProps {
    label: string;
    type: string;
    id: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
}


export default function MyTextInput({ label = "", type = "", id = "", placeholder = "", value, setValue }: MyTextInputProps) {
    return (
        <>
            <label className="form-label fw-semibold">{label}</label>
            <input
                type={type}
                className="form-control fw-lighter border border-1 border-dark"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
        </>
    )
}