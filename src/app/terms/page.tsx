import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for E.A Research - Understand the rules and guidelines for using our research platform.",
};

export default function TermsPage() {
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
              Terms of Use
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
                    Draft Terms Notice
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    These terms of use are currently in draft form and subject to change. 
                    We are actively developing our platform policies and will finalize this document 
                    as our research platform evolves. Please check back regularly for updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none pt-8">
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                Welcome to E.A Research. By accessing or using our website, research platform, 
                content management system, or any related services (collectively, the "Services"), 
                you agree to be bound by these Terms of Use ("Terms"). If you do not agree to 
                these Terms, please do not use our Services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and E.A Research 
                ("we", "us", or "our"), a research organization in partnership with Addis AI.
              </p>

              <h2>2. About Our Services</h2>
              <p>
                E.A Research is an academic research organization focused on:
              </p>
              <ul>
                <li>Equitable digital agriculture technologies</li>
                <li>Voice-first and ASR (Automatic Speech Recognition) interfaces</li>
                <li>Blockchain tokenization systems for agricultural supply chains</li>
                <li>Zero-knowledge privacy-preserving technologies</li>
                <li>Socio-technical design for African smallholder farmers</li>
              </ul>
              <p>
                Our Services include research publications, datasets, prototypes, research themes, 
                field updates, and a content management system for authorized collaborators.
              </p>

              <h2>3. User Categories</h2>
              
              <h3>3.1 General Visitors</h3>
              <p>
                Anyone may access public-facing content including research publications, datasets 
                (where available), prototypes, and research themes without registration.
              </p>

              <h3>3.2 Admin Users</h3>
              <p>
                Admin users have access to our content management system and are subject to 
                additional terms and responsibilities:
              </p>
              <ul>
                <li><strong>Super Admins:</strong> Full platform access including user management</li>
                <li><strong>Admins:</strong> Content management capabilities for research materials</li>
                <li><strong>Pending Users:</strong> Approved accounts awaiting role assignment</li>
              </ul>

              <h3>3.3 Research Collaborators</h3>
              <p>
                Individuals or organizations engaged in formal research collaboration with 
                E.A Research may be subject to additional agreements.
              </p>

              <h2>4. Account Registration and Security</h2>
              
              <h3>4.1 Admin Access Requests</h3>
              <p>
                To request admin access, you must:
              </p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Have a legitimate reason for content management access</li>
                <li>Be affiliated with an academic or research institution (preferred)</li>
                <li>Agree to use admin privileges responsibly</li>
              </ul>

              <h3>4.2 Account Security</h3>
              <p>
                If granted admin access, you must:
              </p>
              <ul>
                <li>Keep your password secure and confidential</li>
                <li>Change temporary passwords immediately upon first login</li>
                <li>Not share your account credentials with others</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3>4.3 Account Termination</h3>
              <p>
                We reserve the right to suspend or terminate accounts for:
              </p>
              <ul>
                <li>Violation of these Terms</li>
                <li>Misuse of admin privileges</li>
                <li>Inactivity for extended periods</li>
                <li>Security concerns</li>
                <li>Any reason at our discretion with or without notice</li>
              </ul>

              <h2>5. Acceptable Use</h2>
              
              <h3>5.1 Permitted Uses</h3>
              <p>You may use our Services to:</p>
              <ul>
                <li>Access and read research publications and materials</li>
                <li>Download datasets subject to their specific licenses</li>
                <li>Reference our work in academic publications (with proper citation)</li>
                <li>Collaborate on research projects (with appropriate agreements)</li>
                <li>Manage content if you have admin privileges</li>
              </ul>

              <h3>5.2 Prohibited Uses</h3>
              <p>You may NOT:</p>
              <ul>
                <li>Use our Services for any illegal purpose</li>
                <li>Violate any intellectual property rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Scrape, harvest, or data mine without permission</li>
                <li>Distribute malware, viruses, or harmful code</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Interfere with or disrupt our Services</li>
                <li>Use datasets or content in ways that violate their licenses</li>
                <li>Misuse admin privileges for personal gain</li>
                <li>Share sensitive research data without proper authorization</li>
              </ul>

              <h2>6. Intellectual Property Rights</h2>
              
              <h3>6.1 Our Content</h3>
              <p>
                Unless otherwise stated, all content on this platform including text, graphics, 
                logos, images, research materials, and software is the property of E.A Research 
                and our partners, protected by copyright and intellectual property laws.
              </p>

              <h3>6.2 Research Publications</h3>
              <p>
                Research publications may have specific licenses (e.g., Creative Commons). 
                Please refer to individual publication pages for usage rights.
              </p>

              <h3>6.3 Datasets</h3>
              <p>
                Datasets are subject to their own license terms (e.g., CC-BY-4.0, CC-BY-SA-4.0). 
                Users must comply with these licenses when using or redistributing datasets.
              </p>

              <h3>6.4 Open Source Components</h3>
              <p>
                Our platform uses open source software licensed under various terms. 
                These licenses are respected and apply to their respective components.
              </p>

              <h3>6.5 User Submissions</h3>
              <p>
                By submitting content to our platform (e.g., through contact forms or as admin users), 
                you grant us a license to use, reproduce, and display that content as necessary 
                to operate our Services and conduct research.
              </p>

              <h2>7. Research Ethics and Academic Integrity</h2>
              <p>
                All users of our Services agree to uphold:
              </p>
              <ul>
                <li>Academic honesty and integrity</li>
                <li>Proper citation and attribution practices</li>
                <li>Research ethics guidelines</li>
                <li>Data protection and privacy principles</li>
                <li>Informed consent requirements for research participants</li>
                <li>Responsible disclosure of research findings</li>
              </ul>

              <h2>8. Privacy and Data Protection</h2>
              <p>
                Our collection and use of personal information is governed by our{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. 
                By using our Services, you consent to such collection and use.
              </p>
              <p>
                As a research organization, we are committed to:
              </p>
              <ul>
                <li>Protecting participant privacy in research studies</li>
                <li>Anonymizing data for publications</li>
                <li>Implementing zero-knowledge privacy principles</li>
                <li>Complying with GDPR, CCPA, and relevant data protection laws</li>
              </ul>

              <h2>9. Third-Party Links and Services</h2>
              <p>
                Our Services may contain links to third-party websites, including:
              </p>
              <ul>
                <li>Research paper repositories (arXiv, SciSpace, etc.)</li>
                <li>Partner websites (Addis AI)</li>
                <li>DOI links to published papers</li>
                <li>External dataset repositories</li>
                <li>Code repositories (GitHub)</li>
              </ul>
              <p>
                We are not responsible for the content, privacy practices, or terms of these 
                third-party sites. Your use of them is at your own risk.
              </p>

              <h2>10. Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul>
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Accuracy, completeness, or reliability of content</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of data transmission</li>
              </ul>
              <p>
                Research findings and datasets are provided for academic purposes and should not 
                be considered as professional advice.
              </p>

              <h2>11. Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, E.A RESEARCH AND ITS PARTNERS SHALL NOT 
                BE LIABLE FOR:
              </p>
              <ul>
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of data, profits, or business opportunities</li>
                <li>Damages resulting from use or inability to use our Services</li>
                <li>Reliance on research findings or datasets</li>
                <li>Actions of other users or third parties</li>
              </ul>
              <p>
                Some jurisdictions do not allow the exclusion of certain warranties or limitations 
                of liability, so these limitations may not apply to you.
              </p>

              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless E.A Research, our partners, 
                and our respective officers, directors, employees, and agents from any claims, 
                liabilities, damages, losses, and expenses arising from:
              </p>
              <ul>
                <li>Your use of our Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your conduct in connection with the Services</li>
              </ul>

              <h2>13. Research Collaboration Terms</h2>
              <p>
                Formal research collaborations may require additional agreements including:
              </p>
              <ul>
                <li>Data sharing agreements</li>
                <li>Memoranda of understanding (MOUs)</li>
                <li>Institutional review board (IRB) protocols</li>
                <li>Intellectual property agreements</li>
                <li>Publication and authorship guidelines</li>
              </ul>
              <p>
                Contact us at{" "}
                <a href="mailto:emmanuel@earesearch.net">emmanuel@earesearch.net</a> to discuss 
                research collaboration opportunities.
              </p>

              <h2>14. Content Management System (CMS) Terms</h2>
              
              <h3>14.1 Admin Responsibilities</h3>
              <p>Admin users with CMS access must:</p>
              <ul>
                <li>Only publish accurate, verified research information</li>
                <li>Properly cite sources and respect copyright</li>
                <li>Follow academic publishing standards</li>
                <li>Not publish sensitive or confidential information</li>
                <li>Maintain the quality and integrity of our research repository</li>
                <li>Coordinate with the research team before major publications</li>
              </ul>

              <h3>14.2 Content Review</h3>
              <p>
                We reserve the right to review, edit, or remove any content published through 
                the CMS at our discretion.
              </p>

              <h2>15. Modifications to Services and Terms</h2>
              <p>
                We reserve the right to:
              </p>
              <ul>
                <li>Modify, suspend, or discontinue any part of our Services</li>
                <li>Update these Terms at any time</li>
                <li>Change access requirements or user roles</li>
              </ul>
              <p>
                Significant changes to Terms will be communicated via email to admin users 
                and posted on our website. Continued use of Services after changes constitutes 
                acceptance of modified Terms.
              </p>

              <h2>16. Geographic Restrictions</h2>
              <p>
                Our Services are accessible globally, but we make no representation that content 
                is appropriate or available for use in all locations. Users accessing Services 
                from jurisdictions with laws restricting internet use are responsible for compliance 
                with local laws.
              </p>

              <h2>17. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws. 
                Any disputes shall be resolved through:
              </p>
              <ol>
                <li>Good faith negotiation between parties</li>
                <li>Mediation if negotiation fails</li>
                <li>Arbitration or litigation in appropriate jurisdiction</li>
              </ol>

              <h2>18. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the 
                remaining provisions shall continue in full force and effect.
              </p>

              <h2>19. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy and any additional agreements 
                for research collaboration or CMS access, constitute the entire agreement 
                between you and E.A Research regarding use of our Services.
              </p>

              <h2>20. Contact Information</h2>
              <p>
                For questions about these Terms or our Services:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg my-4">
                <p className="mb-1"><strong>E.A Research</strong></p>
                <p className="mb-1">Research Partnership: E.A Research ◇ Addis AI</p>
                <p className="mb-1">Email: <a href="mailto:emmanuel@earesearch.net">emmanuel@earesearch.net</a></p>
                <p className="mb-1">Contact Form: <Link href="/contact" className="text-primary hover:underline">/contact</Link></p>
                <p className="mb-1">Admin Access: <Link href="/admin/request-access" className="text-primary hover:underline">/admin/request-access</Link></p>
              </div>

              <h2>21. Acknowledgment</h2>
              <p>
                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE 
                TO BE BOUND BY THESE TERMS OF USE.
              </p>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> These terms are in draft form and will be updated as our 
                  platform and research activities evolve. We are committed to transparency 
                  and will keep this document current with our actual practices and policies.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex gap-4 justify-center">
            <Link 
              href="/privacy"
              className="text-primary hover:underline"
            >
              View Privacy Policy →
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
