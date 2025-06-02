import React from 'react'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import Container from '../../components/Cards/Container'
import LogoWrapper from '../../components/Logo/LogoWrapper'
import Footer from '../../components/Footer/Footer'

const TermsAndCondition = () => {
    return (
        <>
        <Container>

            {/* <LogoWrapper headerText='Terms and Conditions' /> */}
            <Header withBack={"true"} HeaderText='Terms and Conditions' />
            <StyledCard>
                <article>


                    <h3>Description of Platform and Use</h3>
                    <p>
                        HireHive is a global online platform that connects creative professionals (e.g., UI/UX designers, motion designers, 3D artists, etc.) with organizations posting job opportunities. These Terms govern your use of HireHive as a candidate. By registering an account and applying through HireHive, you agree to these Terms. HireHive facilitates the application process but does not guarantee any employment or particular outcome.
                    </p>
                    <br />

                    <h3>Candidate Responsibilities</h3>
                    <ul>
                        <li>Provide accurate and complete personal and professional information (contact details, education, work history, portfolios, etc.).</li>
                        <li>Keep your account credentials secure and immediately report any suspected unauthorized access.</li>
                        <li>Use HireHive solely to apply for jobs in good faith. Do not copy, sell, transfer, or exploit the service in unauthorized ways.</li>
                        <li>Comply with all applicable laws when using the platform. Do not post malicious code or unsolicited communications through the system.</li>
                    </ul>

                    <br />
                    <h3>Application Process (Five Stages)</h3>
                    <p>
                        Candidates undergo a fixed five-stage process:
                        <ol>
                            <li>Portfolio Submission – submit examples of your work or portfolio</li>
                            <li>Screening – complete a preliminary screening or assessment</li>
                            <li>Round 1 Interview – attend the first formal interview</li>
                            <li>Round 2 Interview – attend a second interview</li>
                            <li>Assignment – complete a final practical task</li>
                        </ol>
                        The Assignment stage is separate from the main rounds and typically involves a hands-on test or project.
                    </p>

                    <br />
                    <h3>Webcam Recording and Consent</h3>
                    <p>
                        Some assignments require recording a video of you performing the task. Before any webcam is activated, HireHive will explicitly notify you that recording will occur and will obtain your active consent (via a checkbox). You may withdraw your consent at any time, and before consenting, you will be informed exactly how the recorded video will be used.
                    </p>
                    <p>
                        The recorded video is securely stored (e.g., using Cloudinary) and is only accessible to authorized HireHive personnel and the hiring organization for evaluation of your assignment.
                    </p>
                    <br />
                    <h3>Data Security</h3>
                    <p>
                        We use industry-standard safeguards to protect your personal data. All data – including videos – is encrypted during transmission and at rest and stored on secure servers. Access is limited to authorized HireHive staff and hiring reviewers. Third-party service providers are bound by confidentiality obligations.
                    </p>
                    <br />
                    <h3>No Sale or Misuse of Data</h3>
                    <p>
                        HireHive does not sell or rent your personal data to third parties. We only use your data for recruitment purposes or as required by law.
                    </p>
                    <br/>
                    <h3>Your Data Rights</h3>
                    <p>
                        Under GDPR and CCPA/CPRA, you have rights to access, correct, delete, restrict processing, and receive a copy of your personal data. To exercise these rights, please contact us. We will verify your identity and respond in accordance with applicable law.
                    </p>
                    <br />
                    <h3>Acceptance of Terms and Modifications</h3>
                    <p>
                        By creating an account or applying, you accept these Terms. We may update the Terms at any time and will post changes on this page. Continued use after changes indicates acceptance.
                    </p>
                    <br />
                    <h3>Limitation of Liability</h3>
                    <p>
                        HireHive is provided “as is” without warranties. We are not liable for indirect or incidental damages arising from use of the platform. Liability is limited to fees paid (if any).
                    </p>
                    <br />
                    <h3>Governing Law and Dispute Resolution</h3>
                    <p>
                        These Terms are governed by the laws of [Jurisdiction]. Disputes will be resolved via arbitration or courts in [Jurisdiction], as chosen by HireHive. You waive any right to a jury trial or class-action participation.
                    </p>
                    <br />
                    <h2>Privacy Policy</h2>

                    <h3>Information We Collect</h3>
                    <ul>
                        <li>Identity and contact data (e.g., name, email, phone, address)</li>
                        <li>Employment and professional history (e.g., education, resume, certifications)</li>
                        <li>Application data (e.g., portfolio, cover letters, video interviews)</li>
                        <li>Technical information (e.g., IP address, device/browser info, cookies)</li>
                    </ul>
<br />
                    <h3>How We Use Your Data</h3>
                    <p>
                        We use your data to facilitate hiring, communicate with you, and share your application with hiring organizations. We also use it to improve our services. We do not use your data for purposes not disclosed here.
                    </p>
<br />
                    <h3>Data Storage and Security</h3>
                    <p>
                        Data is stored securely (e.g., Cloudinary), encrypted in transit and at rest, and only accessible to authorized staff. We follow data minimization and retention principles per GDPR.
                    </p>
                    <br />
                    <h3>Who Has Access</h3>
                    <p>
                        Access is limited to staff directly involved in recruiting or managing your application, and reviewers at the hiring organization. All third parties are under confidentiality agreements.
                    </p>
                    <br />
                    <h3>Data Retention and Deletion</h3>
                    <p>
                        Data is retained only as long as necessary. If not hired, your data may be kept for up to 4 years. You may request deletion at any time unless legal obligations require retention.
                    </p>
                    <br />
                    <h3>Your Privacy Rights</h3>
                    <p>
                        You have rights to access, delete, correct, restrict, or object to use of your data under GDPR and CCPA. Contact us to exercise these rights.
                    </p>
                    <br />
                    <h3>Privacy Dispute Resolution</h3>
                    <p>
                        You may contact us directly or lodge a complaint with a data authority if you believe your privacy rights are violated.
                    </p>
                    <br />
                    <h3>Contact Information</h3>
                    <p>
                        If you have questions or wish to exercise your rights, contact us at <strong>privacy@hirehive.com</strong> or write to:
                        <br />
                        <strong>HireHive Inc., 1234 Elm Street, Metropolis, NY, USA</strong>.
                    </p>
                </article>


            </StyledCard>
        </Container>
        {/* <Footer/> */}
        </>
    )
}

export default TermsAndCondition