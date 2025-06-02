import React from "react";
import Container from "../../components/Cards/Container";
import StyledCard from "../../components/Cards/StyledCard";
import Header from "../../components/utility/Header";
import LogoWrapper from "../../components/Logo/LogoWrapper";
import Footer from "../../components/Footer/Footer";
import { useAuthContext } from "../../context/AuthProvider";
import useCandidateAuth from "../../hooks/useCandidateAuth";

const PrivacyPolicy = () => {
  const { user } = useAuthContext();
  const { candidateData } = useCandidateAuth();
  return (
    <>
      <Container>
        {(!user && !candidateData) && <LogoWrapper headerText="Privacy Policy" />}
        {(user || candidateData) && <Header withBack={(user || candidateData) ? "true" : false} HeaderText="Privacy Policy" />}
        <StyledCard>
          <article>
            <h3>Information We Collect</h3>
            <ul>
              <li>
                Identity and contact data (e.g., name, email, phone, address)
              </li>
              <li>
                Employment and professional history (e.g., education, resume,
                certifications)
              </li>
              <li>
                Application data (e.g., portfolio, cover letters, video
                interviews)
              </li>
              <li>
                Technical information (e.g., IP address, device/browser info,
                cookies)
              </li>
            </ul>
            <br />
            <h3>How We Use Your Data</h3>
            <p>
              We use your data to facilitate hiring, communicate with you, and
              share your application with hiring organizations. We also use it
              to improve our services. We do not use your data for purposes not
              disclosed here.
            </p>
            <br />
            <h3>Data Storage and Security</h3>
            <p>
              Data is stored securely (e.g., Cloudinary), encrypted in transit
              and at rest, and only accessible to authorized staff. We follow
              data minimization and retention principles per GDPR.
            </p>
            <br />
            <h3>Who Has Access</h3>
            <p>
              Access is limited to staff directly involved in recruiting or
              managing your application, and reviewers at the hiring
              organization. All third parties are under confidentiality
              agreements.
            </p>
            <br />
            <h3>Data Retention and Deletion</h3>
            <p>
              Data is retained only as long as necessary. If not hired, your
              data may be kept for up to 4 years. You may request deletion at
              any time unless legal obligations require retention.
            </p>
            <br />
            <h3>Your Privacy Rights</h3>
            <p>
              You have rights to access, delete, correct, restrict, or object to
              use of your data under GDPR and CCPA. Contact us to exercise these
              rights.
            </p>
            <br />
            <h3>Privacy Dispute Resolution</h3>
            <p>
              You may contact us directly or lodge a complaint with a data
              authority if you believe your privacy rights are violated.
            </p>
            <br />
            <h3>Contact Information</h3>
            <p>
              If you have questions or wish to exercise your rights, contact us
              at <strong>helloatvav@gmail.com</strong> or write to:
              <br />
              <strong>
                1021 E Lincolnway Suite #8086, Cheyenne, Wyoming 82001, United States
              </strong>
            </p>
          </article>
        </StyledCard>
      </Container>
      {(!user && !candidateData) && <Footer />}
    </>
  );
};

export default PrivacyPolicy;
