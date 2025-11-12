import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for E.A Research - Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const lastUpdated = "November 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-yellow-50 dark:bg-yellow-950 border-yellow-500 text-yellow-700 dark:text-yellow-300">
              <AlertCircle className="w-3 h-3 mr-1" />
              DRAFT DOCUMENT
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              E.A Research ◇ Addis AI Research Collaboration
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Draft Notice */}
          <Card className="mb-8 border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    Draft Policy Notice
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    This privacy policy is currently in draft form and subject to change. 
                    We are actively developing our data practices and will finalize this document 
                    as our research platform evolves. Please check back regularly for updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none pt-8">
              
              <h2>1. Introduction</h2>
              <p>
                E.A Research ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website and use our research platform, including 
                our content management system and research collaboration tools.
              </p>
              <p>
                As a research organization focused on equitable digital agriculture, voice-first 
                technologies, and privacy-preserving systems, we understand the critical importance 
                of data protection and transparency.
              </p>

              <h2>2. Information We Collect</h2>
              
              <h3>2.1 Information You Provide</h3>
              <ul>
                <li>
                  <strong>Contact Information:</strong> Name, email address, organization, 
                  and message content when you submit inquiries through our contact form
                </li>
                <li>
                  <strong>Admin Access Requests:</strong> Name, email, organization, and 
                  reason for requesting admin access to our content management system
                </li>
                <li>
                  <strong>Account Information:</strong> Email, name, and password (encrypted) 
                  for admin users who manage research content
                </li>
                <li>
                  <strong>Research Contributions:</strong> Any content, data, or materials 
                  you submit as part of research collaboration
                </li>
              </ul>

              <h3>2.2 Information Automatically Collected</h3>
              <ul>
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent on pages, referring URLs
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, operating system, IP address
                </li>
                <li>
                  <strong>Cookies:</strong> Authentication cookies for admin sessions
                </li>
              </ul>

              <h3>2.3 Research Data</h3>
              <p>
                Our research focuses on agricultural technologies, voice-first interfaces, and 
                privacy-preserving systems. Any research data we collect is handled in accordance 
                with academic research ethics and institutional review board guidelines where applicable.
              </p>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Process and manage admin access requests</li>
                <li>Provide access to our content management system for approved users</li>
                <li>Share research findings, publications, and updates</li>
                <li>Improve our website and research platform</li>
                <li>Conduct academic research (with appropriate consent and anonymization)</li>
                <li>Send email notifications related to admin access approvals/rejections</li>
                <li>Maintain security and prevent unauthorized access</li>
              </ul>

              <h2>4. Data Storage and Security</h2>
              
              <h3>4.1 Database Storage</h3>
              <p>
                User data is stored in a secure PostgreSQL database (Neon) with encryption at rest. 
                Passwords are hashed using bcrypt with industry-standard salt rounds.
              </p>

              <h3>4.2 Hosting</h3>
              <p>
                Our website is hosted on Netlify with automatic HTTPS encryption. All data 
                transmitted between your browser and our servers is encrypted in transit.
              </p>

              <h3>4.3 Email Communications</h3>
              <p>
                Email notifications are sent via Resend with industry-standard security practices. 
                We never include sensitive passwords or credentials in plain text emails beyond 
                initial temporary access credentials.
              </p>

              <h3>4.4 Access Controls</h3>
              <p>
                Admin access is restricted through role-based permissions (super_admin, admin, pending). 
                Only authorized personnel can access user management features.
              </p>

              <h2>5. Data Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information. We may share data in the following limited circumstances:</p>
              <ul>
                <li>
                  <strong>Research Collaboration:</strong> With our research partner Addis AI 
                  for joint research activities (with appropriate consent)
                </li>
                <li>
                  <strong>Service Providers:</strong> With third-party services that help us 
                  operate our platform (Netlify, Neon, Resend) under strict data processing agreements
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our 
                  rights, safety, or property
                </li>
                <li>
                  <strong>Academic Publication:</strong> Research findings may be published in 
                  anonymized, aggregated form that cannot identify individuals
                </li>
              </ul>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                <li><strong>Object:</strong> Object to certain types of data processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:emmanuel@earesearch.net">emmanuel@earesearch.net</a>
              </p>

              <h2>7. Cookies and Tracking</h2>
              <p>
                We use minimal cookies necessary for website functionality:
              </p>
              <ul>
                <li>
                  <strong>Authentication Cookies:</strong> To maintain your admin session 
                  (NextAuth.js session tokens)
                </li>
                <li>
                  <strong>Theme Preferences:</strong> To remember your dark/light mode preference
                </li>
              </ul>
              <p>
                We do not use third-party tracking cookies or analytics tools that compromise your privacy.
              </p>

              <h2>8. Data Retention</h2>
              <p>We retain data for the following periods:</p>
              <ul>
                <li><strong>Contact Form Submissions:</strong> Until resolved, then archived</li>
                <li><strong>Admin Access Requests:</strong> Indefinitely for audit and security purposes</li>
                <li><strong>Admin User Accounts:</strong> Until account deletion or deactivation</li>
                <li><strong>Research Data:</strong> As required by academic research standards and institutional policies</li>
              </ul>

              <h2>9. International Data Transfers</h2>
              <p>
                Our services are hosted on servers located in various regions. By using our platform, 
                you consent to the transfer of your data to these locations. We ensure appropriate 
                safeguards are in place for international transfers.
              </p>

              <h2>10. Children's Privacy</h2>
              <p>
                Our platform is not intended for individuals under 16 years of age. We do not 
                knowingly collect personal information from children. If you believe we have 
                inadvertently collected such information, please contact us immediately.
              </p>

              <h2>11. Research Ethics</h2>
              <p>
                As an academic research organization, we adhere to:
              </p>
              <ul>
                <li>Institutional Review Board (IRB) guidelines when conducting human subjects research</li>
                <li>Informed consent procedures for research participants</li>
                <li>Data anonymization and aggregation for research publications</li>
                <li>Zero-knowledge privacy principles in our technology development</li>
              </ul>

              <h2>12. Third-Party Services</h2>
              <p>Our platform uses the following third-party services:</p>
              <ul>
                <li><strong>Netlify:</strong> Website hosting and deployment</li>
                <li><strong>Neon:</strong> PostgreSQL database hosting</li>
                <li><strong>Resend:</strong> Email notification service</li>
                <li><strong>IPFS/Pinata:</strong> Decentralized storage for public assets</li>
              </ul>
              <p>
                Each service has its own privacy policy. We recommend reviewing their policies 
                if you have concerns about their data practices.
              </p>

              <h2>13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our 
                practices or for legal compliance. We will notify users of significant changes 
                via email or prominent notice on our website. The "Last Updated" date at the 
                top of this policy indicates when it was last revised.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                For questions, concerns, or requests regarding this Privacy Policy or our data practices:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg my-4">
                <p className="mb-1"><strong>E.A Research</strong></p>
                <p className="mb-1">Research Partnership: E.A Research ◇ Addis AI</p>
                <p className="mb-1">Email: <a href="mailto:emmanuel@earesearch.net">emmanuel@earesearch.net</a></p>
                <p className="mb-1">Contact Form: <Link href="/contact" className="text-primary hover:underline">/contact</Link></p>
              </div>

              <h2>15. Governing Law</h2>
              <p>
                This Privacy Policy shall be governed by and construed in accordance with applicable 
                data protection laws, including GDPR (EU), CCPA (California), and relevant African 
                data protection regulations.
              </p>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This is a draft policy and will be updated as our 
                  platform and research activities evolve. We are committed to transparency 
                  and will keep this document current with our actual practices.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex gap-4 justify-center">
            <Link 
              href="/terms"
              className="text-primary hover:underline"
            >
              View Terms of Use →
            </Link>
            <Link 
              href="/contact"
              className="text-primary hover:underline"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
