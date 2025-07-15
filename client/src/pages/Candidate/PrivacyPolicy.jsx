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
            <ul className="typography-body text-font-gray list-disc list-inside mt-2">
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
            <p className="typography-body text-font-gray mt-2">
              We use your data to facilitate hiring, communicate with you, and
              share your application with hiring organizations. We also use it
              to improve our services. We do not use your data for purposes not
              disclosed here.
            </p>
            <br />
            <h3>Data Storage and Security</h3>
            <p className="typography-body text-font-gray mt-2">
              Data is stored securely (e.g., Cloudinary), encrypted in transit
              and at rest, and only accessible to authorized staff. We follow
              data minimization and retention principles per GDPR.
            </p>
            <br />
            <h3>Who Has Access</h3>
            <p className="typography-body text-font-gray mt-2">
              Access is limited to staff directly involved in recruiting or
              managing your application, and reviewers at the hiring
              organization. All third parties are under confidentiality
              agreements.
            </p>
            <br />
            {/*  Google Sign‑In & Calendar Access */}
            <h3>Google Sign‑In & Calendar Data</h3>
            <p className="typography-body text-font-gray mt-2">
              We offer Google Sign‑In to authenticate users and sync calendar events. In this process, we request:
              <ul className="list-disc list-inside">
                <li><strong>profile</strong> – name and profile photo;</li>
                <li><strong>email</strong> – user’s email address;</li>
                <li><strong>https://www.googleapis.com/auth/calendar.events</strong> – view and manage your calendar events;</li>
                <li><strong>https://www.googleapis.com/auth/calendar</strong> – read and modify calendars as needed.</li>
              </ul>
              These permissions are used solely for login and syncing meetings between your Google Calendar and our app.
            </p>
        <br/>      
            {/*  Limited Use Compliance */}
            <h3>Limited Use Compliance</h3>
            <p className="typography-body text-font-gray mt-2">
              “Value at Void’s use and transfer of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.”  
              This means we only store and use Google data as described above, and we do not sell it or use it for advertising. 
            </p>
            <br/>
            {/*  Calendar Data Storage & Sharing */}
            <h3>Calendar Data Storage & Sharing</h3>
            <p className="typography-body text-font-gray mt-2">
              Calendar data is encrypted in transit and at rest. We store it securely and access it only as needed to sync meetings. We do not share your calendar information with third parties except:
              <ul className="list-disc list-inside">
                <li>to comply with legal obligations, or</li>
                <li>if necessary to maintain operation per Google’s Limited Use policy.</li>
              </ul>
            </p>
            <br/>
            {/*  Data Retention & Deletion */}
            <h3>Calendar Data Retention & Deletion</h3>
            <p className="typography-body text-font-gray mt-2">
              Calendar information is retained only as long as you keep your account active or for up to 1 year after account deletion. You may request deletion of your calendar data at any time by unauthorize option.
            </p>
            <br/>
            {/*  Scope Justification for Google */}
            <h3>Scope Justification</h3>
            <p className="typography-body text-font-gray mt-2">
              We request calendar access so users can view, create, update, and delete meetings from within our app—providing full two-way synchronization with Google Calendar.
            </p>
            <h3>Data Retention and Deletion</h3>
            <p className="typography-body text-font-gray mt-2">
              Data is retained only as long as necessary. If not hired, your
              data may be kept for up to 4 years. You may request deletion at
              any time unless legal obligations require retention.
            </p>
            <br />
            <h3>Your Privacy Rights</h3>
            <p className="typography-body text-font-gray mt-2">
              You have rights to access, delete, correct, restrict, or object to
              use of your data under GDPR and CCPA. Contact us to exercise these
              rights.
            </p>
            <br />
            <h3>Privacy Dispute Resolution</h3>
            <p className="typography-body text-font-gray mt-2">
              You may contact us directly or lodge a complaint with a data
              authority if you believe your privacy rights are violated.
            </p>
            <br />
            <h3>Contact Information</h3>
            <p className="typography-body text-font-gray mt-2">
              If you have questions or wish to exercise your rights, contact us
              at <strong className="text-white" >helloatvav@gmail.com</strong> or write to:
              <br />
              <strong className="text-white">
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
