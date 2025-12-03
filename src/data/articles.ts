export interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
  content: string;
  category: string;
}

export const processArticles: Article[] = [
  {
    id: '1',
    title: 'What Buyers Expect',
    description: 'Learn what buyers look for when evaluating businesses',
    readTime: '5 min read',
    category: 'process',
    content: `When preparing to sell your business, understanding what buyers expect is crucial for a successful transaction. Here's what most buyers look for:

**Financial Performance**
Buyers want to see consistent revenue growth and healthy profit margins. They'll examine at least 3 years of financial statements, looking for trends and stability. Clean, well-organized books signal a well-run business.

**Scalable Operations**
Buyers assess whether the business can grow without proportionally increasing costs. They look for documented processes, trained staff, and systems that don't rely solely on the owner.

**Customer Diversification**
A healthy customer base means no single client represents more than 10-15% of revenue. Buyers worry about concentration risk—if one major customer leaves, how will that impact the business?

**Recurring Revenue**
Subscription models, retainers, and repeat customers are highly valued. Predictable revenue streams reduce risk and increase valuation multiples.

**Strong Market Position**
Buyers want businesses with competitive advantages—unique products, strong brand recognition, exclusive contracts, or proprietary technology that's difficult to replicate.

**Clean Legal Standing**
All contracts, licenses, permits, and intellectual property should be properly documented and transferable. Unresolved disputes or pending litigation are red flags.

**Growth Potential**
Beyond current performance, buyers evaluate untapped opportunities. Can the business expand into new markets, add products, or improve operations? Show them the roadmap.`
  },
  {
    id: '2',
    title: 'How Due Diligence Works',
    description: 'Understanding the due diligence process from start to finish',
    readTime: '7 min read',
    category: 'process',
    content: `Due diligence is the comprehensive investigation buyers conduct before finalizing a purchase. Understanding this process helps you prepare and avoid surprises.

**Phase 1: Initial Review (1-2 weeks)**
After signing an LOI (Letter of Intent), buyers begin reviewing high-level documents. This includes financial summaries, organizational charts, and key contracts. First impressions matter—organized documentation builds confidence.

**Phase 2: Financial Deep Dive (2-4 weeks)**
Accountants analyze your financial statements, tax returns, and accounting practices. They'll verify revenue recognition, examine expenses, and calculate adjusted EBITDA. Be prepared to explain any anomalies or one-time expenses.

**Phase 3: Operational Review (2-3 weeks)**
Buyers examine how your business actually runs. They'll review customer contracts, vendor agreements, employee information, and operational procedures. Site visits may occur during this phase.

**Phase 4: Legal Review (2-3 weeks)**
Attorneys review all legal documents—contracts, leases, IP registrations, litigation history, and compliance records. They identify risks and ensure clean title transfer.

**Phase 5: HR & Benefits Review (1-2 weeks)**
Employee contracts, benefits plans, and organizational structure are examined. Key employee retention is often negotiated during this phase.

**What to Prepare**
- 3 years of financial statements and tax returns
- Customer and vendor contracts
- Employee roster and org chart
- Lease agreements and property documents
- IP registrations and licenses
- Insurance policies
- Any pending or past litigation documents

**Tips for Success**
Start preparing your data room early. Respond to requests promptly—delays raise concerns. Be honest about issues; buyers will find them anyway. Consider a "sell-side" due diligence review before going to market.`
  },
  {
    id: '3',
    title: 'Financial Documentation',
    description: 'Preparing your financial records for sale',
    readTime: '6 min read',
    category: 'process',
    content: `Well-prepared financial documentation is the foundation of a successful business sale. Here's how to get your records buyer-ready.

**Essential Financial Documents**

*Income Statements (3+ years)*
Show revenue, costs, and profitability over time. Ensure consistency in how you categorize expenses. Buyers look for trends and calculate growth rates.

*Balance Sheets (3+ years)*
Present your assets, liabilities, and equity. Accurate inventory valuations and receivables aging are critical. Clean up old balances and reconcile all accounts.

*Cash Flow Statements*
Demonstrate how cash moves through your business. Strong operating cash flow is more important to buyers than net income. Show you can fund operations without constant borrowing.

*Tax Returns (3+ years)*
These verify the accuracy of your financial statements. Discrepancies between books and tax returns require explanation. Ensure all returns are filed and taxes are current.

**Quality of Earnings Report**
Consider hiring an accountant to prepare a Quality of Earnings (QoE) analysis. This adjusts your financials to show true economic performance by:
- Removing one-time or non-recurring expenses
- Adjusting owner compensation to market rates
- Normalizing inventory and working capital
- Identifying revenue timing issues

**Common Issues to Address**

*Personal Expenses*
Remove personal expenses run through the business. Document these as "add-backs" to show true profitability.

*Related Party Transactions*
Transactions with family members or affiliated companies should be at market rates. Be prepared to justify any related party arrangements.

*Revenue Recognition*
Ensure revenue is recognized correctly and consistently. Buyers will scrutinize any aggressive recognition policies.

*Deferred Revenue*
If you collect payment before delivering services, track deferred revenue carefully. This is a liability that transfers to the buyer.

**Best Practices**
- Use accrual accounting, not cash basis
- Maintain clean, well-organized records
- Reconcile accounts monthly
- Work with a CPA familiar with M&A transactions
- Start cleanup 12-18 months before selling`
  }
];
