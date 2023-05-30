function Container({ children }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '6px',
        marginBottom: '16px',
        padding: '0 20px',
        filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
      }}
    >
      {children}
    </div>
  );
}

export default Container;
