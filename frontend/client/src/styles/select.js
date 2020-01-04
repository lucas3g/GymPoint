/** SELECT STYLE */
export const selectStyle = {
  option: provided => ({
    ...provided,
    width: '100%',
  }),
  control: () => ({
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    width: 200,
    color: '#444',
    marginRight: 15,
  }),
};

export const selectStyleAsync = {
  option: provided => ({
    ...provided,
    padding: 10,
    width: '100%',
  }),
  control: () => ({
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: 5,
    fontSize: 16,
    height: 45,
    width: 850,
    marginTop: 5,
    color: '#444',
    marginBottom: 10,
  }),
};
