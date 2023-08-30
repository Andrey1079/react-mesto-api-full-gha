export default function Form({ onSubmit, name, text, children, className }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} name={name} className={className}>
      {children}

      <input
        value={text}
        type="submit"
        className={className.includes("popup") ? "popup__submit-button button" : "auth__submit-button"}
      />
    </form>
  );
}
