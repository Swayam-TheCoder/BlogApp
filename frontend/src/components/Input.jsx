function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 
      focus:outline-none focus:border-green-500 text-white transition"
    />
  );
}

export default Input;