import OpenAI from 'openai';
import type { AnalysisResult, DocumentType, RedFlag } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeDocument(text: string, type: DocumentType): Promise<AnalysisResult> {
  if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here') {
    throw new Error('OpenAI API key not configured. Please add your API key to the .env file.');
  }

  try {
    const analysisPrompt = createAnalysisPrompt(text, type);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a legal document analysis expert. Analyze terms of service, privacy policies, and other legal documents to help consumers understand what they're agreeing to. Provide clear, actionable insights in JSON format."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Clean the response by removing markdown code block fences
    const cleanedResponse = response
      .replace(/^```json\s*/i, '')  // Remove opening ```json
      .replace(/\s*```\s*$/i, '')   // Remove closing ```
      .trim();

    // Parse the JSON response
    const analysis = JSON.parse(cleanedResponse);
    
    // Convert to our AnalysisResult format
    return {
      summary: analysis.summary || [],
      redFlags: analysis.redFlags.map((flag: any, index: number) => ({
        id: `flag-${index}`,
        type: flag.type || 'General',
        title: flag.title || 'Concerning Clause',
        description: flag.description || '',
        severity: Math.min(5, Math.max(1, flag.severity || 3)),
        confidence: Math.min(100, Math.max(0, flag.confidence || 75)),
        whyItMatters: flag.whyItMatters || '',
        startIndex: findTextPosition(text, flag.excerpt || '', 0),
        endIndex: findTextPosition(text, flag.excerpt || '', 0) + (flag.excerpt?.length || 50)
      })) as RedFlag[],
      transparencyScore: Math.min(100, Math.max(0, analysis.transparencyScore || 50)),
      scoreJustification: analysis.scoreJustification || 'Analysis completed.',
      consumerWarning: analysis.consumerWarning || undefined,
      analyzedAt: new Date()
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze document. Please check your API key and try again.');
  }
}

function createAnalysisPrompt(text: string, type: DocumentType): string {
  const documentTypeMap = {
    tos: 'Terms of Service',
    privacy: 'Privacy Policy',
    eula: 'End User License Agreement',
    cookie: 'Cookie Policy',
    other: 'Legal Document'
  };

  return `
Analyze this ${documentTypeMap[type]} document and provide a comprehensive breakdown in JSON format.

Document text:
"""
${text}
"""

Please provide your analysis in this exact JSON structure:

{
  "summary": [
    "Clear, concise bullet points explaining key terms in plain English (8-12 points max)",
    "Focus on what users actually need to know",
    "Use simple language, avoid legal jargon"
  ],
  "redFlags": [
    {
      "type": "Category like 'Data Sharing', 'Liability Waiver', 'Binding Arbitration', etc.",
      "title": "Short, clear title of the concerning clause",
      "description": "Brief explanation of what this clause means",
      "severity": 1-5, // 1=minor concern, 5=major red flag
      "confidence": 0-100, // How confident you are this is problematic
      "whyItMatters": "Explain the real-world impact on users",
      "excerpt": "Direct quote from the document (keep under 200 chars)"
    }
  ],
  "transparencyScore": 0-100, // Overall transparency rating
  "scoreJustification": "2-3 sentence explanation of the score",
  "consumerWarning": "Optional warning if score < 40 or severe issues found"
}

Focus on identifying:
- Unusual data collection/sharing practices
- Liability limitations that favor the company
- Binding arbitration clauses
- Auto-renewal terms
- Content ownership claims
- Account termination policies
- Vague or overly broad language
- Changes to terms policies

Be thorough but practical - highlight issues that actually matter to consumers.
`;
}

function findTextPosition(text: string, excerpt: string, startFrom: number = 0): number {
  if (!excerpt) return startFrom;
  
  // Clean up the excerpt for better matching
  const cleanExcerpt = excerpt.replace(/[^\w\s]/g, '').toLowerCase();
  const cleanText = text.replace(/[^\w\s]/g, '').toLowerCase();
  
  const position = cleanText.indexOf(cleanExcerpt, startFrom);
  return position >= 0 ? position : startFrom;
}

// Sample terms for testing
export const sampleTerms = {
  discord: `
TERMS OF SERVICE

Last modified: March 28, 2022

Welcome to Discord! These Terms of Service ("Terms") govern your use of Discord's services.

BY USING OUR SERVICES, YOU AGREE TO THESE TERMS. IF YOU DON'T AGREE TO THESE TERMS, DO NOT USE OUR SERVICES.

1. Who we are
Discord Inc. provides the Discord service, which allows users to communicate via text, voice, and video.

2. Age requirements and responsibility of parents and legal guardians
You must be at least 13 years old to use Discord. If you are under 18, you must have your parent or legal guardian's permission to use Discord.

3. What you can expect from us
Discord provides communication services including servers, direct messages, voice channels, and more. We may modify or discontinue any part of our service at any time.

4. Your Discord account
You are responsible for your account and everything that happens on it. You must keep your login information secure.

5. Content in Discord's services
You retain ownership of content you create, but you grant Discord a license to use, copy, modify, and distribute your content in connection with operating the service.

6. Discord's rights to content
We may review content to ensure it complies with our Terms and Community Guidelines. We may remove content that violates our policies.

7. Data and privacy
Your privacy matters to us. Please review our Privacy Policy to understand how we collect and use information.

8. Paid services
Discord offers paid subscriptions and other paid features. All sales are final unless otherwise required by law.

9. Restrictions on your use of Discord's services
You may not use Discord to violate laws, harass others, distribute malware, or engage in other harmful activities.

10. Termination
We may terminate your account if you violate these Terms. You may also delete your account at any time.

11. Appeals
If we take action against your account, you may appeal our decision through our appeals process.

12. Indemnity
You agree to indemnify Discord from claims arising from your use of the service.

13. Disclaimers
DISCORD IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.

14. Limitation of liability
DISCORD'S LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.

15. Settling disputes between you and Discord
Most disputes can be resolved through our support team. For legal disputes, you agree to binding arbitration.

16. More important stuff
These Terms constitute the entire agreement between you and Discord. If any provision is found invalid, the rest remains in effect.

17. Contacting each other
You can contact us through our support channels. We may contact you via email or through the Discord service.
`,

  tiktok: `
TERMS OF SERVICE

Effective Date: February 2, 2022

Welcome to TikTok! These Terms of Service govern your use of TikTok, including our mobile applications and websites.

1. Your Relationship With Us
TikTok Pte. Ltd. operates TikTok for users in certain regions. By using TikTok, you agree to these Terms.

2. Using TikTok
You must be at least 13 years old to use TikTok. You are responsible for your account and must keep your login credentials secure.

3. Your Content
You retain ownership of content you submit to TikTok, but you grant us a broad license to use, modify, publicly perform, publicly display, reproduce, and distribute your content.

4. TikTok's Content and Services
TikTok provides a platform for creating, sharing, and discovering short-form videos. We may modify our services at any time.

5. Community Guidelines
You must follow our Community Guidelines. We may remove content or suspend accounts that violate our policies.

6. Copyright
We respect intellectual property rights. We will respond to valid copyright infringement notices.

7. Privacy
Your privacy is important to us. Please review our Privacy Policy to understand how we handle your information.

8. Safety
We work to keep TikTok safe, but we cannot guarantee the safety of all content or interactions on our platform.

9. Third-Party Services
TikTok may integrate with third-party services. Your use of these services is subject to their own terms.

10. Purchases and Payments
TikTok offers virtual items and other paid features. All purchases are final unless otherwise required by law.

11. Prohibited Uses
You may not use TikTok for illegal activities, harassment, spam, or other harmful purposes.

12. Termination
We may suspend or terminate your account if you violate these Terms. You may also delete your account at any time.

13. Disclaimers and Limitation of Liability
TIKTOK IS PROVIDED "AS IS" AND WE DISCLAIM ALL WARRANTIES. OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.

14. Indemnification
You agree to defend and indemnify TikTok from claims arising from your use of the service.

15. Dispute Resolution
Disputes will be resolved through binding arbitration, not in court. You waive your right to participate in class actions.

16. Governing Law
These Terms are governed by the laws of Singapore for users in certain regions.

17. Changes to These Terms
We may update these Terms from time to time. Continued use of TikTok after changes constitutes acceptance.

18. Contact Us
If you have questions about these Terms, please contact us through our support channels.
`,

  instagram: `
TERMS OF USE

Effective Date: December 20, 2020

Welcome to Instagram! These Terms of Use govern your use of Instagram and other Meta Company Products.

1. The Instagram Service
Instagram is a service that allows you to share photos, videos, and messages with friends and followers.

2. Who Can Use Instagram
You must be at least 13 years old to create an account. You must provide accurate information when creating your account.

3. What You Can Share and Do on Instagram
You own the content you create and share on Instagram, but you grant us a license to use your content in connection with our service.

4. The Permissions You Give Us
You give us permission to use your content, including in ads and sponsored content. You also allow us to download and store your content.

5. Additional Rights We Retain
We may remove content that violates our policies or terms. We may also limit or restrict access to Instagram.

6. Content Removal and Disabling or Terminating Your Account
We may remove content or disable accounts that violate our terms or Community Guidelines.

7. Our Agreement and What Happens if We Disagree
These Terms constitute our agreement. Disputes will be resolved in U.S. courts or through arbitration.

8. Unsolicited Material
We don't accept unsolicited ideas or materials. Any materials you send may be used without compensation.

9. About These Terms
We may update these Terms. Your continued use constitutes acceptance of changes.

Data Policy Summary:
- We collect information about your activity on Instagram
- We use this information to personalize your experience and show you relevant ads
- We share information with other Meta Companies and third-party partners
- You can control some of your privacy settings, but some data collection is required for the service
- We may transfer your information internationally
- We retain your information even after you delete your account for legal and business purposes

Community Guidelines Summary:
- Share only photos and videos that you've taken or have the right to share
- Post authentic content
- Follow the law
- Respect other members of the Instagram community
- Don't spam people or post inappropriate content
- Help keep our community safe by reporting content that violates our guidelines
`,

  paypal: `
USER AGREEMENT

Last Update: September 21, 2021

Welcome to PayPal! This user agreement governs your use of your PayPal account and the PayPal services.

1. About Your PayPal Account
When you open a PayPal account, you agree to this user agreement. You must provide accurate information and keep your account information current.

2. Sending and Receiving Money
You can use PayPal to send and receive money. We may limit your account activity until you verify your identity.

3. Fees
We charge fees for some transactions. Fee information is available on our website and will be disclosed before you complete a transaction.

4. Account Balances and Multiple Currencies
You may hold balances in your PayPal account in multiple currencies. We may convert currencies at our exchange rates.

5. Managing Your Money
You can add money to your PayPal account from a bank account or other funding source. You can also withdraw money to your bank account.

6. PayPal Credit and Other Lending Products
We may offer credit products that allow you to borrow money. These products have separate terms and conditions.

7. Merchant Services
If you're a merchant, additional terms apply to your use of PayPal for business transactions.

8. PayPal Buyer Protection
We offer protection for eligible purchases. Coverage is subject to our Buyer Protection policy.

9. PayPal Seller Protection
We offer protection for eligible sales. Coverage is subject to our Seller Protection policy.

10. Restricted Activities and Holds
You may not use PayPal for illegal activities or activities that violate our Acceptable Use Policy. We may place holds on your account.

11. Account Closure, Suspension, or Limitation
We may close, suspend, or limit your account if you violate this agreement or if required by law.

12. Disputes with PayPal
If you have a dispute with PayPal, you agree to resolve it through binding arbitration rather than in court.

13. General Terms
This agreement constitutes the entire agreement between you and PayPal. We may update this agreement from time to time.

14. Definitions
Various terms used in this agreement have specific meanings as defined in this section.

Key Policies:
- We may hold your funds for up to 21 days for new accounts or suspicious activity
- We can freeze your account if we suspect fraudulent activity
- Chargebacks and disputes may result in account limitations
- We share your information with merchants and other third parties
- You're responsible for all activity on your account
- We may close your account at any time with 60 days notice
- Binding arbitration is required for disputes - you cannot sue us in court
- We can change our fees and terms with notice
- Your account may be limited if you don't verify your identity
- We may report suspicious activity to law enforcement
`
};