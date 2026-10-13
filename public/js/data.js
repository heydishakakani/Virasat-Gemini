// DEMO DATA. Virasat does not search real institutions yet: every result below is a sample.
// When a real search service exists, replace ASSETS with the response from it.

// Same three states and wording as the landing page: Nominee set / Missing nominee / Unknown.
export const STATUS = {
  present: { label: 'Nominee set', cls: 'yes', nominee: 'yes' },
  missing: { label: 'Missing nominee', cls: 'no', nominee: 'no' },
  review: { label: 'Unknown', cls: 'unknown', nominee: 'unknown' }
};

export const ASSETS = [
  { id: 'hdfc', emoji: '&#127974;', name: 'HDFC Bank Savings Account', type: 'Bank account', icon: 'bank', status: 'present',
    kv: { Institution: 'HDFC Bank', Account: 'XXXX 1234', Branch: 'Jaipur, Rajasthan', 'Account holder': '{name}' },
    nominee: { name: 'Suman Sharma', relationship: 'Spouse' },
    docs: ['Death certificate (certified copy)', 'Claimant ID and address proof', 'Bank’s claim form', 'Cancelled cheque of the claimant'],
    where: 'the home branch' },
  { id: 'icici', emoji: '&#128737;&#65039;', name: 'ICICI Prudential Life Plan', type: 'Insurance', icon: 'insurance', status: 'missing',
    kv: { Insurer: 'ICICI Prudential', Policy: 'XXXX 5521', Type: 'Life insurance', 'Policy holder': '{name}' },
    nominee: null,
    docs: ['Death certificate', 'Original policy document (or indemnity if lost)', 'Claim form', 'Legal heir or succession certificate', 'Claimant ID and bank details'],
    where: 'the insurer’s claims desk' },
  { id: 'axis', emoji: '&#128200;', name: 'Axis Mutual Fund', type: 'Mutual fund', icon: 'chart', status: 'review',
    kv: { 'Fund house': 'Axis Mutual Fund', Folio: 'XXXX 8890', Units: 'Shown on statement', 'Holder': '{name}' },
    nominee: { name: 'Not clear from records', relationship: '—' },
    docs: ['Death certificate', 'Latest consolidated account statement', 'Transmission request form', 'Claimant ID and bank proof'],
    where: 'the registrar (RTA) or the fund house' },
  { id: 'sbi', emoji: '&#127968;', name: 'SBI Home Loan', type: 'Property', icon: 'home', status: 'present',
    kv: { Lender: 'State Bank of India', 'Loan account': 'XXXX 2208', Property: 'Residential, Jaipur', Borrower: '{name}' },
    nominee: { name: 'Suman Sharma', relationship: 'Co-borrower' },
    docs: ['Death certificate', 'Loan account statement', 'Co-borrower’s ID', 'Insurance cover details, if any'],
    where: 'the loan branch' },
  { id: 'epf', emoji: '&#128188;', name: 'EPF Account', type: 'Government scheme', icon: 'gov', status: 'missing',
    kv: { Scheme: 'Employees’ Provident Fund', UAN: 'XXXX 7714', Employer: 'Last employer', Member: '{name}' },
    nominee: null,
    docs: ['Death certificate', 'Claim form (Form 20 or 10D as applicable)', 'Legal heir or succession certificate', 'Claimant bank proof'],
    where: 'the regional EPFO office' },
  { id: 'lic', emoji: '&#128737;&#65039;', name: 'LIC Jeevan Policy', type: 'Insurance', icon: 'insurance', status: 'present',
    kv: { Insurer: 'LIC of India', Policy: 'XXXX 3306', Type: 'Endowment', 'Policy holder': '{name}' },
    nominee: { name: 'Anita Sharma', relationship: 'Daughter' },
    docs: ['Death certificate', 'Original policy bond', 'Claim form', 'Nominee ID and bank details'],
    where: 'the servicing LIC branch' },
  { id: 'demat', emoji: '&#128202;', name: 'Zerodha Demat Account', type: 'Demat account', icon: 'trend', status: 'missing',
    kv: { Broker: 'Zerodha', 'Client ID': 'XXXX 4410', Depository: 'CDSL', Holder: '{name}' },
    nominee: null,
    docs: ['Death certificate', 'Transmission request form', 'Legal heir or succession certificate', 'Claimant demat account details'],
    where: 'the broker’s service team' },
  { id: 'home', emoji: '&#127969;', name: 'Family Home, Jaipur', type: 'Property', icon: 'home', status: 'review',
    kv: { Type: 'Residential property', City: 'Jaipur, Rajasthan', 'Title in name of': '{name}', Records: 'Sub-registrar' },
    nominee: { name: 'Society nominee on file?', relationship: 'To be checked' },
    docs: ['Death certificate', 'Sale or title deed', 'Property tax receipts', 'Society or housing board records', 'Legal heir or succession certificate'],
    where: 'the sub-registrar and housing society' }
];

export const GUIDANCE = {
  present: [
    'Take the death certificate and your ID to {where}.',
    'Submit the claim form with the nominee’s details.',
    'Ask for a written acknowledgement and the expected timeline.'
  ],
  missing: [
    'Ask {where} what it needs when no nominee is on file.',
    'Prepare a legal heir certificate or succession certificate. A lawyer or the local tehsil office can help.',
    'Submit the claim with that certificate, the death certificate and your ID.'
  ],
  review: [
    'Check the nominee details on the latest statement or ask {where}.',
    'Confirm the nominee is living and the details match official records.',
    'If anything differs, ask how to update it or how to claim without a nominee.'
  ]
};

export const NOMINEE_NOTE =
  'A nominee is usually a trustee who receives the money for the legal heirs. It does not by itself make them the owner. For large or disputed assets, speak to a lawyer.';
