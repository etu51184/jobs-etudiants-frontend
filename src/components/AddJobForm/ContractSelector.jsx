// src/components/AddJobForm/ContractSelector.jsx
import { useLang } from '../../contexts/LanguageContext.jsx';

function ContractSelector({ contractType, setContractType }) {
    const { t } = useLang();
  return (
    <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
      <option value="studentJob">{t('studentJob')}</option>
      <option value="internship">{t('internship')}</option>
      <option value="contract">{t('contract')}</option>
      <option value="volunteer">{t('volunteer')}</option>
    </select>
  );
}

export default ContractSelector;
