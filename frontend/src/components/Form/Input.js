export default function Input({ inputRef, className, type, name, placeholder, id, validationLength }) {
  return (
    <>
      <input
        required
        ref={inputRef}
        minLength={validationLength?.min}
        maxLength={validationLength?.max}
        id={id}
        placeholder={placeholder}
        name={name}
        type={type}
        className={className}
      ></input>
      <span className={`popup__form-item-error ${id}-error`}></span>
    </>
  );
}
