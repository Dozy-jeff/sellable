import { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    title: 'Financial Documentation',
    description: 'Organize and clean up your financial records',
    articles: [
      {
        id: 'article-1-1',
        title: 'Understanding Your Balance Sheet',
        description: 'Learn the key components buyers look for in a balance sheet',
        readTime: '8 min',
        stepId: 'step-1',
        content: `
# Understanding Your Balance Sheet

A balance sheet is one of the most important documents buyers will review when evaluating your business. It provides a snapshot of your company's financial health at a specific point in time.

## Key Components

### Assets
Assets are what your company owns. They're typically divided into:
- **Current Assets**: Cash, accounts receivable, inventory
- **Fixed Assets**: Equipment, property, vehicles
- **Intangible Assets**: Patents, trademarks, goodwill

### Liabilities
Liabilities are what your company owes:
- **Current Liabilities**: Accounts payable, short-term debt
- **Long-term Liabilities**: Mortgages, long-term loans

### Equity
The difference between assets and liabilities represents the owner's equity in the business.

## What Buyers Look For

1. **Healthy Current Ratio**: Current assets should be at least 1.5x current liabilities
2. **Manageable Debt Levels**: Debt-to-equity ratio below 2.0
3. **Quality of Assets**: Real, verifiable assets that can be transferred
4. **Trending Equity**: Growing owner's equity over time

## Action Steps

- Gather the last 3 years of balance sheets
- Reconcile all accounts to supporting documentation
- Remove any personal assets from business balance sheet
- Document any liens or encumbrances on assets
        `
      },
      {
        id: 'article-1-2',
        title: 'Creating a Clean P&L Statement',
        description: 'Best practices for profit and loss statements',
        readTime: '10 min',
        stepId: 'step-1',
        content: `
# Creating a Clean P&L Statement

Your Profit and Loss (Income) Statement tells the story of your business's profitability. A "clean" P&L is essential for buyers to understand true earnings.

## Structure of a P&L

### Revenue
- Gross sales
- Returns and allowances
- Net revenue

### Cost of Goods Sold (COGS)
- Direct materials
- Direct labor
- Manufacturing overhead

### Operating Expenses
- Salaries and wages
- Rent and utilities
- Marketing and advertising
- Professional fees

### Net Income
Revenue minus all expenses equals your bottom line.

## Common Issues to Address

### Add-backs and Normalization
Buyers will want to see "normalized" earnings that reflect true operational performance:
- Owner's excess compensation
- One-time expenses
- Personal expenses run through business
- Non-recurring items

### Red Flags to Eliminate
- Inconsistent categorization
- Missing documentation
- Unusual spikes or drops without explanation
- Personal expenses mixed with business

## Preparation Checklist

1. Categorize all transactions consistently
2. Separate personal from business expenses
3. Document all add-backs with supporting evidence
4. Prepare monthly trending for at least 24 months
5. Reconcile to tax returns
        `
      },
      {
        id: 'article-1-3',
        title: 'Tax Return Preparation for Sale',
        description: 'Aligning tax returns with financial statements',
        readTime: '7 min',
        stepId: 'step-1',
        content: `
# Tax Return Preparation for Sale

Tax returns serve as the ultimate verification of your financial statements. Buyers and their advisors will carefully compare your returns to your presented financials.

## Why Tax Returns Matter

### Third-Party Verification
Tax returns are filed with the IRS and represent legally binding statements about your business's finances.

### Cash vs. Accrual
Many small businesses use cash accounting for taxes but should present financials on an accrual basis. Be prepared to explain any differences.

## Key Areas of Review

### Schedule C / Form 1120S
- Revenue matching to P&L
- Expense categories
- Owner compensation

### Payroll Returns
- Total wages paid
- Employee count verification
- Contractor payments (1099s)

### State and Local Returns
- Sales tax compliance
- State income tax
- Property tax

## Common Discrepancies

- Different accounting methods
- Timing differences
- Aggressive tax positions
- Missing state filings

## Action Steps

1. Gather last 3 years of all tax returns
2. Create reconciliation between P&L and tax returns
3. Document any differences with explanations
4. Resolve any outstanding tax issues
5. Ensure all returns are filed and current
        `
      }
    ],
    tasks: [
      {
        id: 'task-1-1',
        title: 'Create Balance Sheet',
        description: 'Prepare a current balance sheet with all assets and liabilities'
      },
      {
        id: 'task-1-2',
        title: 'Create Income Statement',
        description: 'Prepare P&L for the last 3 years with monthly detail'
      },
      {
        id: 'task-1-3',
        title: 'Gather Tax Returns',
        description: 'Collect and organize last 3 years of tax returns'
      },
      {
        id: 'task-1-4',
        title: 'Reconcile Financials',
        description: 'Reconcile P&L to tax returns and document differences'
      }
    ]
  },
  {
    id: 'step-2',
    title: 'Operations Documentation',
    description: 'Document your business processes and procedures',
    articles: [
      {
        id: 'article-2-1',
        title: 'Writing Effective SOPs',
        description: 'How to create standard operating procedures',
        readTime: '12 min',
        stepId: 'step-2',
        content: `
# Writing Effective SOPs

Standard Operating Procedures (SOPs) are critical for demonstrating that your business can run without you. They're one of the most important factors in achieving a premium valuation.

## Why SOPs Matter

### Reduced Risk
Buyers see documented processes as lower risk - the business doesn't depend solely on the owner's knowledge.

### Faster Transition
Well-documented procedures make for smoother ownership transitions and faster training.

### Higher Multiples
Businesses with comprehensive SOPs often command 0.5-1.0x higher multiples.

## Key Areas to Document

### Core Operations
- Order fulfillment process
- Service delivery workflow
- Quality control procedures
- Inventory management

### Customer-Facing
- Sales process
- Customer onboarding
- Support procedures
- Complaint resolution

### Administrative
- Accounting procedures
- HR processes
- Vendor management
- Compliance requirements

## SOP Format

Each SOP should include:
1. Purpose and scope
2. Roles and responsibilities
3. Step-by-step procedures
4. Required tools/systems
5. Quality checkpoints
6. Exception handling

## Getting Started

1. List all recurring business activities
2. Prioritize by frequency and importance
3. Interview key employees
4. Document current state
5. Refine and standardize
6. Train and validate
        `
      },
      {
        id: 'article-2-2',
        title: 'Employee Roles and Responsibilities',
        description: 'Documenting your organizational structure',
        readTime: '8 min',
        stepId: 'step-2',
        content: `
# Employee Roles and Responsibilities

A clear organizational structure demonstrates that your business has the team to operate independently. Buyers want to see defined roles and capable employees.

## Creating an Org Chart

### Current Structure
- Reporting relationships
- Functional areas
- Key positions
- Vacant roles

### Document for Each Role
- Title and department
- Key responsibilities
- Required skills
- Compensation range
- Performance metrics

## Key Employee Considerations

### Retention Risk
Identify key employees and their importance to operations. Consider:
- Length of tenure
- Unique skills or relationships
- Flight risk
- Retention strategies

### Compensation Analysis
- Market rate comparison
- Benefits package
- Bonus structures
- Equity or profit sharing

## Documentation Needed

1. Organization chart
2. Job descriptions for all positions
3. Employee roster with tenure and compensation
4. Performance review history
5. Training and certifications
6. Non-compete/NDA status

## Red Flags to Address

- Over-reliance on single employees
- Undefined roles
- Missing job descriptions
- High turnover
- Key person dependencies
        `
      },
      {
        id: 'article-2-3',
        title: 'Customer Concentration Analysis',
        description: 'Understanding and mitigating customer risk',
        readTime: '9 min',
        stepId: 'step-2',
        content: `
# Customer Concentration Analysis

Customer concentration is one of the biggest risk factors buyers evaluate. High concentration can significantly impact valuation and deal terms.

## Understanding Concentration

### Calculation
Customer concentration is typically measured as percentage of revenue from top customers:
- Top customer as % of revenue
- Top 5 customers as % of revenue
- Top 10 customers as % of revenue

### Risk Levels
- **Low Risk**: No customer > 10%, top 5 < 30%
- **Moderate Risk**: One customer 10-20%, top 5 < 50%
- **High Risk**: One customer > 20%, top 5 > 50%
- **Severe Risk**: One customer > 50%

## Impact on Valuation

High concentration can result in:
- Lower multiples (0.5-2.0x reduction)
- Earnout provisions tied to customer retention
- Escrow holdbacks
- Deal structure changes

## Mitigation Strategies

### Before Sale
- Diversify customer base
- Secure long-term contracts
- Develop customer relationships beyond owner
- Cross-sell to existing customers

### During Sale
- Customer interviews (carefully managed)
- Contract assignments
- Retention incentives
- Transition support

## Documentation Required

1. Revenue by customer (last 3 years)
2. Customer tenure history
3. Contract terms and renewals
4. Relationship map (who knows whom)
5. Growth/decline trends by customer
        `
      }
    ],
    tasks: [
      {
        id: 'task-2-1',
        title: 'Create Organization Chart',
        description: 'Document reporting structure and all employee roles'
      },
      {
        id: 'task-2-2',
        title: 'Write Core SOPs',
        description: 'Document standard operating procedures for key processes'
      },
      {
        id: 'task-2-3',
        title: 'Customer Analysis',
        description: 'Analyze customer concentration and prepare mitigation plan'
      },
      {
        id: 'task-2-4',
        title: 'Employee Documentation',
        description: 'Prepare employee roster, job descriptions, and compensation details'
      }
    ]
  },
  {
    id: 'step-3',
    title: 'Legal & Compliance',
    description: 'Ensure all legal and regulatory requirements are met',
    articles: [
      {
        id: 'article-3-1',
        title: 'Contract Review and Assignment',
        description: 'Preparing contracts for ownership transfer',
        readTime: '10 min',
        stepId: 'step-3',
        content: `
# Contract Review and Assignment

Contracts are the backbone of your business relationships. Buyers need to understand what contracts exist and whether they can be transferred to new ownership.

## Types of Contracts to Review

### Customer Contracts
- Service agreements
- Purchase orders
- Master service agreements
- Subscription terms

### Vendor Contracts
- Supplier agreements
- Distribution agreements
- Service providers
- Technology licenses

### Employee Agreements
- Employment contracts
- Non-competes
- NDAs
- IP assignments

### Property and Equipment
- Real estate leases
- Equipment leases
- Vehicle leases

## Key Issues to Identify

### Change of Control Provisions
Many contracts have clauses triggered by ownership change:
- Consent requirements
- Termination rights
- Renegotiation triggers
- Assignment restrictions

### Unfavorable Terms
- Below-market pricing
- Onerous terms
- Personal guarantees
- Exclusivity clauses

## Preparation Steps

1. Create complete contract inventory
2. Review each for change of control provisions
3. Identify contracts requiring consent
4. Note any personal guarantees
5. Flag unfavorable terms
6. Develop assignment strategy
        `
      },
      {
        id: 'article-3-2',
        title: 'Intellectual Property Protection',
        description: 'Securing and documenting your IP assets',
        readTime: '8 min',
        stepId: 'step-3',
        content: `
# Intellectual Property Protection

Intellectual property can be one of your most valuable assets. Proper documentation and protection is essential for maximizing value.

## Types of IP

### Trademarks
- Business name
- Product names
- Logos
- Slogans

### Patents
- Utility patents
- Design patents
- Patent applications

### Copyrights
- Software code
- Content and media
- Marketing materials
- Documentation

### Trade Secrets
- Customer lists
- Pricing formulas
- Processes
- Recipes

## IP Audit Checklist

1. Inventory all IP assets
2. Verify ownership (not licensed)
3. Confirm registrations are current
4. Check for encumbrances
5. Document employee IP assignments
6. Review contractor IP provisions

## Common Issues

### Ownership Questions
- Contractor-created IP without assignment
- Employee inventions
- Joint development
- Licensed vs. owned confusion

### Protection Gaps
- Unregistered trademarks
- Expired patents
- Missing assignments
- Inadequate NDAs

## Documentation Needed

1. IP asset register
2. Registration certificates
3. Assignment agreements
4. License agreements (inbound/outbound)
5. Employee invention assignments
6. Contractor IP provisions
        `
      },
      {
        id: 'article-3-3',
        title: 'Regulatory Compliance Review',
        description: 'Ensuring all licenses and permits are current',
        readTime: '7 min',
        stepId: 'step-3',
        content: `
# Regulatory Compliance Review

Compliance issues can derail a transaction or result in significant post-closing liabilities. A thorough compliance review protects both parties.

## Areas of Compliance

### Business Licenses
- State registration
- Local business licenses
- Industry-specific permits
- Professional licenses

### Employment Law
- I-9 verification
- Wage and hour compliance
- Benefits compliance (ERISA, ACA)
- Workplace safety (OSHA)

### Tax Compliance
- Income tax filings
- Sales tax collection
- Payroll tax deposits
- Property tax payments

### Industry-Specific
- Healthcare (HIPAA)
- Financial services
- Food service
- Environmental

## Compliance Audit Steps

1. List all required licenses and permits
2. Verify current status
3. Check for any violations or complaints
4. Review correspondence with regulators
5. Confirm insurance coverage
6. Document compliance programs

## Red Flags

- Lapsed licenses
- Outstanding violations
- Missing permits
- Tax liens
- Litigation
- Regulatory investigations

## Creating a Compliance Binder

Organize documentation by category:
1. Business formation documents
2. Licenses and permits
3. Tax clearance certificates
4. Insurance policies
5. Compliance certifications
6. Regulatory correspondence
        `
      }
    ],
    tasks: [
      {
        id: 'task-3-1',
        title: 'Contract Inventory',
        description: 'Create list of all contracts with key terms and assignment provisions'
      },
      {
        id: 'task-3-2',
        title: 'IP Documentation',
        description: 'Document all intellectual property and verify ownership'
      },
      {
        id: 'task-3-3',
        title: 'License Review',
        description: 'Verify all business licenses and permits are current'
      },
      {
        id: 'task-3-4',
        title: 'Compliance Binder',
        description: 'Organize all compliance documentation in one location'
      }
    ]
  },
  {
    id: 'step-4',
    title: 'Data Room Preparation',
    description: 'Organize all documents for buyer due diligence',
    articles: [
      {
        id: 'article-4-1',
        title: 'Setting Up Your Data Room',
        description: 'Best practices for organizing deal documents',
        readTime: '9 min',
        stepId: 'step-4',
        content: `
# Setting Up Your Data Room

A well-organized data room accelerates due diligence and demonstrates professionalism. It's often a buyer's first impression of how you run your business.

## Data Room Structure

### Recommended Folder Structure
1. **Corporate Documents**
   - Formation documents
   - Bylaws/Operating agreement
   - Stock/membership records

2. **Financial Information**
   - Financial statements
   - Tax returns
   - Projections

3. **Operations**
   - SOPs
   - Org chart
   - Employee information

4. **Customers**
   - Revenue analysis
   - Top customer details
   - Contracts

5. **Vendors**
   - Key supplier agreements
   - Terms and conditions

6. **Legal**
   - Contracts
   - IP documentation
   - Litigation history

7. **Compliance**
   - Licenses
   - Insurance
   - Regulatory filings

## Best Practices

### Organization
- Consistent naming conventions
- Clear folder structure
- Index or table of contents
- Version control

### Access Control
- Role-based permissions
- Activity tracking
- Watermarking
- NDA required for access

### Platform Selection
- Virtual data room providers
- Security features
- Ease of use
- Cost considerations

## Common Mistakes

- Disorganized files
- Missing documents
- Outdated information
- Poor naming conventions
- No index or guide
        `
      },
      {
        id: 'article-4-2',
        title: 'Due Diligence Checklist',
        description: 'What buyers will ask for and why',
        readTime: '11 min',
        stepId: 'step-4',
        content: `
# Due Diligence Checklist

Understanding what buyers will request helps you prepare proactively. A complete data room reduces delays and builds buyer confidence.

## Financial Due Diligence

### Historical Financials
- [ ] Income statements (3 years monthly)
- [ ] Balance sheets (3 years)
- [ ] Cash flow statements
- [ ] Tax returns (3 years)
- [ ] Bank statements (12 months)

### Supporting Schedules
- [ ] Accounts receivable aging
- [ ] Accounts payable aging
- [ ] Inventory detail
- [ ] Fixed asset schedule
- [ ] Debt schedule

### Quality of Earnings
- [ ] Revenue by customer
- [ ] Revenue by product/service
- [ ] Gross margin analysis
- [ ] Operating expense detail
- [ ] Add-back documentation

## Operational Due Diligence

### Customers
- [ ] Top 20 customer revenue
- [ ] Customer contracts
- [ ] Retention rates
- [ ] Sales pipeline

### Employees
- [ ] Organization chart
- [ ] Employee roster
- [ ] Compensation details
- [ ] Benefits summary
- [ ] Employment agreements

### Operations
- [ ] SOPs
- [ ] Vendor list
- [ ] Technology stack
- [ ] Equipment list

## Legal Due Diligence

### Corporate
- [ ] Formation documents
- [ ] Shareholder agreements
- [ ] Meeting minutes
- [ ] Stock ledger

### Contracts
- [ ] Customer agreements
- [ ] Vendor agreements
- [ ] Leases
- [ ] Loan agreements

### IP and Compliance
- [ ] IP registrations
- [ ] Licenses and permits
- [ ] Litigation history
- [ ] Insurance policies
        `
      }
    ],
    tasks: [
      {
        id: 'task-4-1',
        title: 'Create Data Room Structure',
        description: 'Set up folders and organization system for all documents'
      },
      {
        id: 'task-4-2',
        title: 'Upload Financial Documents',
        description: 'Add all financial statements, tax returns, and supporting schedules'
      },
      {
        id: 'task-4-3',
        title: 'Upload Operational Documents',
        description: 'Add SOPs, employee info, customer analysis, and vendor details'
      },
      {
        id: 'task-4-4',
        title: 'Upload Legal Documents',
        description: 'Add all contracts, IP documentation, and compliance records'
      },
      {
        id: 'task-4-5',
        title: 'Create Data Room Index',
        description: 'Prepare table of contents and document guide for buyers'
      }
    ]
  }
];

export function calculateStepFromScore(score: number): number {
  if (score >= 85) return 4;
  if (score >= 70) return 3;
  if (score >= 50) return 2;
  return 1;
}

export function getScoreBonus(completedArticles: string[], completedTasks: string[]): number {
  // Each completed article adds 1 point, each task adds 2 points
  return completedArticles.length * 1 + completedTasks.length * 2;
}
