// src/components/AddJobForm/ContractSelector.jsx
function ContractSelector({ contractType, setContractType }) {
  return (
    <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
      <option value="Job étudiant">Job étudiant</option>
      <option value="Stage">Stage</option>
      <option value="CDD">CDD</option>
      <option value="Bénévolat">Bénévolat</option>
    </select>
  );
}

export default ContractSelector;
