function FormContainer({ children }) {
  return (
    <div
      style={{
        background: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '6px',
        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      }}
    >
      {children}
    </div>
  );
}

export default FormContainer;
