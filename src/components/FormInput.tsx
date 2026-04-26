type Props = {
  label?: string;
  placeholder: string;
  type?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          px-3 py-2
          border border-gray-300
          rounded-md
          text-gray-800
          placeholder-gray-400
          focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          transition
        "
      />
    </div>
  );
}
