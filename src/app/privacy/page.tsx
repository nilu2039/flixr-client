import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="p-10 leading-5 flex flex-col gap-5">
      <header>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> 26th July 2024
        </p>
      </header>
      <main className="leading-5 flex flex-col gap-5">
        <div>
          <p>
            Flixr&apos;s use and transfer to any other app of information
            received from Google APIs will adhere to Google API Services User
            Data Policy, including the Limited Use requirements.
          </p>
          <Link
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            Google API Services User Data Policy
          </Link>
        </div>
        <div>
          <p className="bg-secondary p-4 rounded">
            Flixr complies with the Google API Services User Data Policy,
            including the Limited Use requirements. You can view the policy{" "}
            <Link
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600"
            >
              here
            </Link>
            .
          </p>
        </div>
        <h2 className="text-2xl font-bold">1. Introduction</h2>
        <p>
          Welcome to Flixr! We are committed to protecting your privacy and
          ensuring that your personal information is handled in a safe and
          responsible manner. This Privacy Policy outlines the types of personal
          information we collect, how we use it, and the measures we take to
          protect it.
        </p>

        <h2 className="text-2xl font-bold">2. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> When you sign in to Flixr
            using your Google account, we collect your email address and basic
            profile information (name, profile picture).
          </li>
          <li>
            <strong>YouTube Data:</strong> With your permission, we access your
            YouTube account to upload videos, retrieve your channel information,
            and manage your video content.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Account Management:</strong> To authenticate and manage your
            Flixr account.
          </li>
          <li>
            <strong>Video Uploads:</strong> To upload videos to your YouTube
            channel as part of our automated workflow.
          </li>
          <li>
            <strong>Notifications:</strong> To send you notifications about the
            status of your video uploads.
          </li>
          <li>
            <strong>Personalization:</strong> To personalize your experience and
            provide relevant content and features.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">4. Data Storage and Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information. These measures include:
        </p>
        <ul>
          <li>
            <strong>Encryption:</strong> All sensitive data is transmitted via
            Secure Socket Layer (SSL) technology and encrypted.
          </li>
          <li>
            <strong>Access Controls:</strong> We restrict access to personal
            information to authorized personnel only.
          </li>
          <li>
            <strong>Data Storage:</strong> We store your data on secure servers
            and ensure regular backups to prevent data loss.
          </li>
          <li>
            <strong>Regular Audits:</strong> We conduct regular security audits
            to ensure our systems remain secure.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">5. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties except as described in this Privacy Policy. We may
          share your information with trusted third parties who assist us in
          operating our website, conducting our business, or servicing you,
          provided those parties agree to keep this information confidential.
        </p>

        <h2 className="text-2xl font-bold">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Access Your Data:</strong> You can request a copy of the
            personal information we hold about you.
          </li>
          <li>
            <strong>Correct Your Data:</strong> You can request that we correct
            any inaccurate or incomplete information.
          </li>
          <li>
            <strong>Delete Your Data:</strong> You can request that we delete
            your personal information, subject to certain conditions.
          </li>
          <li>
            <strong>Revoke Consent:</strong> You can revoke your consent for us
            to access your Google account at any time through your Google
            account settings.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of these websites. We encourage
          you to read the privacy policies of any third-party sites you visit.
        </p>

        <h2 className="text-2xl font-bold">8. Changes to Our Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our website.
          You are advised to review this Privacy Policy periodically for any
          changes.
        </p>

        <h2 className="text-2xl font-bold">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p>
          <strong>Email:</strong> nilanjanmandal15@gmail.com
        </p>
        <p>
          <strong>Flixr Team</strong>
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
