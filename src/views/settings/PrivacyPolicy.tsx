import { View, StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../common/Header";
import { globalStyles } from "../../../global.style";
import data from "./TermsCondition.json";

const PrivacyPolicy = () => {
  return (
    <View style={globalStyles.container}>
      <Header title="Privacy Policy" />
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View>
          <Text style={localStyle.text}>
            This Privacy Policy provides our policies and procedures for
            collecting, using, and disclosing your information. Users can access
            the NetLynxs service (the “Service”) through our website
            (www.NetLynxs.com), applications on devices, and through APIs. A
            “Device” is any computer used to access the NetLynxs Service,
            including without limitation a desktop, laptop, mobile phone,
            tablet, or other consumer electronic device. This Privacy Policy
            governs your access of the NetLynxs Service, regardless of how you
            access it, and by using our Services you consent to the collection,
            transfer, processing, storage, disclosure and other uses described
            in this Privacy Policy. All of the different forms of data, content,
            and information described below are collectively referred to as
            “information”.
          </Text>
          <Text style={localStyle.title}>THE PRINCIPLES WE ABIDE BY</Text>
          <Text style={localStyle.text}>
            We comply with all applicable privacy laws respecting our processing
            and storage of any personal information that may be used in
            conjunction with the Services, and we deal with your data under
            these general principles:
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Lawfulness, fairness, transparency and right to access: We may not
            reveal the granular details of how we protect your data, because
            that would compromise its security – but we will let you know why we
            need it, what we need it for, and process it securely and in
            accordance with applicable laws. If you have any questions
            respecting your data and how it’s being used, you need only ask us,
            and we will answer. This includes any questions you may have about
            the types and categories of personal information that we may have
            collected about you.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Limitations of purpose: We will limit use of your data to the
            extent necessary to provide you with our products and services, with
            the clear exceptions that are set out in this Privacy Policy
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Minimization of data: We only collect information that we need,
            and that you choose to give to us. We will not collect personal
            information gratuitously from you for no reason.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Accuracy: We make reasonable efforts to keep your data accurate
            and up to date, based on your input; if you notify us of any changes
            to your data, we will make sure to change it in our systems in a
            timely manner.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Limitation of data retention and right to deletion: We believe in
            streamlining the way that we handle data so that it minimizes data
            redundancy and unnecessary retention. We have instituted processes
            to delete personal information from our systems when it is no longer
            required, and to delete personal information upon request (subject
            to the exceptions set forth in this Privacy Policy).
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Integrity and confidentiality: We process your information using
            appropriate technical or organizational measures designed to ensure
            appropriate security of your personal data, including protection
            against unauthorized or unlawful processing and against accidental
            loss, destruction or damage.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Non-discrimination: We believe in treating our customers fairly
            and equally. We will never treat any customer differently simply
            because they have chosen to exercise their rights under any
            applicable privacy legislation, such as requesting access to, or
            requesting deletion of, personal information. Having said that, use
            of the Service may be dependent upon the use of certain personal
            information to provide results requested by you, and therefore a
            request for deletion of personal information will require an
            investigation into whether there are any other parties with rights
            in and to that information (such as any insurance provider that you
            used in relation to your claim), and may result, from a purely
            technical standpoint, in a limitation of, or inability to use, the
            Service. This Privacy Policy contains more detail as to how we live
            up to these principles
          </Text>
          <Text style={localStyle.title}>
            THE INFORMATION WE COLLECT AND STORE
          </Text>
          <Text style={localStyle.text}>
            We may collect and store the following information when running the
            NetLynxs Service
          </Text>
          <Text style={localStyle.title}>Information You Provide</Text>
          <Text style={localStyle.text}>
            When you register an account, we collect some personal information,
            such as your name, phone number, email address, home postal address,
            and home insurance policy. When you invite others to join NetLynxs
            by using our referral page, we send them a one-time email for that
            referral.
          </Text>
          <Text style={localStyle.title}>Files</Text>
          <Text style={localStyle.text}>
            We collect and store the files you upload, download, or access with
            the Service (“Files”). If you add a file to your account that has
            been previously uploaded by you or another user, we may associate
            all or a portion of the previous file with your account rather than
            storing a duplicate.
          </Text>
          <Text style={localStyle.title}>Log Data</Text>
          <Text style={localStyle.text}>
            We collect and store the files you upload, download, or access with
            the Service (“Files”). If you add a file to your account that has
            been previously uploaded by you or another user, we may associate
            all or a portion of the previous file with your account rather than
            storing a duplicate.
          </Text>
          <Text style={localStyle.title}>Cookies</Text>
          <Text style={localStyle.text}>
            We collect and store the files you upload, download, or access with
            the Service (“Files”). If you add a file to your account that has
            been previously uploaded by you or another user, we may associate
            all or a portion of the previous file with your account rather than
            storing a duplicate.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • We collect and store the files you upload, download, or access
            with the Service (“Files”). If you add a file to your account that
            has been previously uploaded by you or another user, we may
            associate all or a portion of the previous file with your account
            rather than storing a duplicate.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Store information identifying your current browser uniquely,
            allowing us to correlate present and past visits to the site, to
            better understand how you interact with the Service, to monitor
            aggregate usage and web traffic routing on the Service, and to help
            prevent fraudulent payments.
          </Text>
          <Text style={localStyle.text}>
            You can instruct your browser, by changing its options, to stop
            accepting cookies or to prompt you before accepting a cookie from
            the websites you visit. If you do not accept cookies, however, you
            may not be able to use all aspects of the Service.
          </Text>
          <Text style={localStyle.title}>Personalization</Text>
          <Text style={localStyle.text}>
            We may use cookies to deliver targeted content specific to your
            interest using ad platforms such as AdRoll, Facebook, LinkedIn,
            HubSpot. You may opt out of receiving targeted ads by changing your
            browser options or utilizing third party opt-out or ad blocker
            tools.
          </Text>

          <Text style={localStyle.title}>HOW WE USE PERSONAL INFORMATION</Text>
          <Text style={localStyle.title}>Personal Information</Text>
          <Text style={localStyle.text}>
            In the course of using the Service, we may collect personal
            information that can be used to contact or identify you (“Personal
            Information”). Personal Information is and may only be used by us:
            (i) to provide and improve our Service, (ii) to administer your use
            of the Service, (iii) to better understand your needs and interests,
            (iv) to personalize and improve your experience, (v) to provide or
            offer software updates and product announcements, and (vi) as
            otherwise expressly set forth in this Privacy Policy. If you no
            longer wish to receive communications from us, please follow the
            “unsubscribe” instructions provided in any of those communications
            or update your account settings information.
          </Text>

          <Text style={localStyle.title}>Geo-Location Information</Text>
          <Text style={localStyle.text}>
            Some Devices allow applications to access real-time location-based
            information (for example, GPS). Our mobile apps do not collect such
            information from your mobile device at any time while you download
            or use our mobile apps as of the date this policy went into effect
            but may do so in the future with your consent to improve our
            Services. Some photos you place in NetLynxs may contain recorded
            location information. We may use this information to optimize your
            experience. If you do not wish to share files embedded with your
            geo-location information with us, please do not upload them. If you
            don't want to store location data in your photos, please consult the
            documentation for your camera to turn off that feature. Also, some
            of the information we collect from a Device, for example IP address,
            can sometimes be used to approximate a Device's location.
          </Text>

          <Text style={localStyle.title}>Analytics</Text>
          <Text style={localStyle.text}>
            We also collect some information (ourselves or using third party
            services) using logging and cookies, such as IP address, which can
            sometimes be correlated with Personal Information. We use this
            information for the above purposes and to monitor and analyze use of
            the Service, for the Service’s technical administration, to increase
            our Service’s functionality and user-friendliness, and to verify
            users have the authorization needed for the Service to process their
            requests.
          </Text>

          <Text style={localStyle.title}>
            INFORMATION SHARING AND DISCLOSURE
          </Text>
          <Text style={localStyle.text}>
            Subject to any exceptions stated in this document, should NetLynxs
            collect any of your Personal Information, we will follow these
            practices regarding the disclosure and distribution of that
            information.
          </Text>

          <Text style={localStyle.title}>
            YOUR PERSONAL INFORMATION IS ALWAYS PROTECTED
          </Text>
          <Text style={localStyle.text}>
            NetLynxs uses reasonable precautions to protect your Personal
            Information and store it securely. Access to your Personal
            Information is restricted to those personnel who need it, and
            NetLynxs takes reasonable steps to prevent the unauthorized use or
            disclosure of your personal information. NetLynxs only uses and
            discloses your Personal Information if it helps us facilitate your
            needs, improve our products and services, meet legal and regulatory
            requirements, or – to the limited extent possible – manage our
            internal business operations. Additionally, if there are any
            disclosure or use restrictions in your consent to the collection of
            your personal information, NetLynxs will abide by those
            restrictions. NetLynxs may combine your information with other
            information into an aggregate form, so your information no longer
            personally identifies you. We may then disclose the aggregate
            information to third parties, so they can obtain an overall picture
            of HostGator products, services, customer sectors and/or usage
            patterns. We may also disclose any other information that is not
            considered to be private or personal information by law.
          </Text>

          <Text style={localStyle.title}>
            WE ONLY SHARE YOUR INFORMATION WITH YOUR CONSENT
          </Text>
          <Text style={localStyle.text}>
            NetLynxs provides your information to third parties only for
            purposes to which you have consented, and we require such third
            parties to keep your information confidential. In a few situations,
            NetLynxs may be required to disclose your information without your
            prior consent. For example, NetLynxs may disclose your information
            if we are required to do so by law, or if we believe in good faith
            that such disclosure is necessary to:
          </Text>

          <Text style={localStyle.bulletPoint}>
            • Comply with law or legal process.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Protect and defend our rights and property, or the rights and
            property of a third party.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Protect against misuse or unauthorized use of any of HostGator
            products, software, services, or other proprietary materials.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Protect the personal safety of any person.
          </Text>
          <Text style={localStyle.bulletPoint}>
            • Allow for a change of ownership of NetLynxs and associated
            transfer of all personal information to the new owner of NetLynxs –
            this does not affect the protection of your information under this
            Privacy Policy.
          </Text>

          <Text style={localStyle.text}>
            NetLynxs will always try to provide you with prior notice of such
            disclosure; however, such notice may not always be possible or
            reasonable given the circumstances. Additionally, the nature of the
            Services requires the routine use of your information in the
            provision of the Services. Your Personal Information will only be
            used to the limited extent necessary to provide the services that
            you have requested, and may include the following uses:
          </Text>

          <Text style={localStyle.bulletPoint}>
            • To allow third party suppliers, vendors, contractors, and other
            parties to provide products and services to us or to you, or to
            otherwise act on our behalf (this may include, without limitation,
            our authorization of such third parties to email our users regarding
            updates, surveys and other inquiries regarding their experience with
            our software and service)
          </Text>
          <Text style={localStyle.bulletPoint}>
            • To allow for audits, and surveys to, among other things, validate
            the size and composition of the users of HostGator services, and
            understand their experience with HostGator software and Services.
          </Text>

          <Text style={localStyle.title}>WE DO NOT SELL YOUR INFORMATION</Text>
          <Text style={localStyle.text}>
            We do not rent, sell, or share your Personal Information with
            non-affiliated companies for their direct marketing purposes. In
            fact, we do not rent, sell, or share your Personal Information with
            non-affiliated companies for any reason, unless we have your express
            permission. As stated above, however, we do combine your information
            with other information into an aggregate form, so your information
            no longer personally identifies you – and we may, on occasion, sell
            that anonymized data set as part of our products and services.
          </Text>

          <Text style={localStyle.title}>
            CHANGING OR DELETING YOUR INFORMATION
          </Text>
          <Text style={localStyle.text}>
            If you are a registered user, you may review, update, correct, or
            delete the Personal Information provided in your registration or
            account profile by changing your “account settings”. If your
            personally identifiable information changes, or if you no longer
            desire our service, you may update or delete it by making the change
            on your account settings. In some cases, we may retain copies of
            your information if required by law. A situation may arise where you
            desire to have all of your personal information that is contained in
            HostGator records deleted or destroyed. If this is what you wish,
            please contact our Privacy Officer, who will take care of your
            request, as described below. However, there may be situations where
            we are obligated to retain copies of your information to allow us to
            comply with laws or respond to legal processes, to complete
            outstanding transactions with you, or maintain the integrity of our
            systems. The applicability of these exceptions to your information
            will be fully communicated with you when we process your request.
            For questions about your Personal Information on our Service, or to
            review, update, correct or delete any Personal Information that is
            not included in your registration or account profile, please contact
            info@NetLynxs.com. We will respond to your inquiry within 30 days.
          </Text>
          <Text style={localStyle.title}>DATA RETENTION</Text>
          <Text style={localStyle.text}>
            We will retain your information for as long as your account is
            active or as needed to provide you services. We may retain and use
            your information as necessary to comply with our legal obligations,
            resolve disputes, and enforce our agreements. Consistent with these
            requirements, we will try to delete your information quickly upon
            request. Please note, however, that there might be latency in
            deleting information from our servers and backed-up versions might
            exist after deletion. In addition, we do not delete from our server
            files that you have in common with other users; however, all
            confidentiality and privacy protections remain in place with respect
            to such files.
          </Text>
          <Text style={localStyle.title}>COMMUNITY</Text>
          <Text style={localStyle.text}>
            Our Service offers publicly accessible community services such as
            blogs, forums, and wikis. You should be aware that any information
            you provide in these areas may be read, collected, and used by
            others who access them. Your posts may remain even after you cancel
            your account. For questions about your Personal Information on our
            Service, please contact info@NetLynxs.com. Our Site includes links
            to other websites whose privacy practices may differ from those of
            NetLynxs. If you submit personal information to any of those sites,
            your information is governed by their privacy statements. We
            encourage you to carefully read the privacy statement of any Web
            site you visit.
          </Text>

          <Text style={localStyle.title}>SECURITY</Text>
          <Text style={localStyle.text}>
            We follow generally accepted standards to protect the information
            submitted to us, both during transmission and once we receive it. No
            method of electronic transmission or storage is 100% secure,
            however. Therefore, we cannot guarantee its absolute security. If
            you have any questions about security on our website, contact us at
            info@NetLynxs.com
          </Text>
          <Text style={localStyle.title}>OUR POLICY TOWARD CHILDREN</Text>
          <Text style={localStyle.text}>
            Our Services are not directed to persons under 13. We do not
            knowingly collect personally identifiable information from children
            under 13. If a parent or guardian becomes aware that his or her
            child has provided us with Personal Information without their
            consent, he or she should contact us at info@NetLynxs.com. If we
            become aware that a child under 13 has provided us with Personal
            Information, we will take steps to delete such information from our
            files.
          </Text>

          <Text style={localStyle.title}>CONTACTING US</Text>
          <Text style={localStyle.text}>
            If you have any questions about this Privacy Policy, please contact
            us at info@NetLynxs.com or at:
          </Text>

          <Text style={localStyle.text}>
            C/O NetLynxs Inc.{"\n"} 45 Four Winds Dr., Unit C, {"\n"}Toronto, ON
            M3J 1K7 {"\n"}
            Phone: 1-647-954-6882
          </Text>

          <Text style={localStyle.title}>CHANGES TO OUR PRIVACY POLICY</Text>
          <Text style={localStyle.text}>
            This Privacy Policy may change from time to time. If we make a
            change to this privacy policy that we believe materially reduces
            your rights, we will provide you with notice (for example, by
            email). And we may provide notice of changes in other circumstances
            as well. By continuing to use the Service after those changes become
            effective, you agree to be bound by the revised Privacy Policy. This
            privacy policy supplements any agreements you already have with
            NetLynxs, such as your Terms of Service, Acceptable Use Policy, and
            any software license agreement. Our privacy policy does not replace
            the terms of those agreements. By agreeing to those terms and using
            HostGator website, products, software and services, you are
            consenting to the collection and use of your personal information by
            NetLynxs in accordance with this privacy policy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const localStyle = StyleSheet.create({
  title: {
    color: "#111",
    fontFamily: "Avenir-Heavy",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    color: "#111",
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    textAlign: "justify",
  },
  bulletPoint: {
    color: "#111",
    fontSize: 15,
    fontFamily: "Avenir-Regular",
    marginTop: 12,
    textAlign: "justify",
  },
  contentEnd: {
    marginTop: 12,
  },
});
export default PrivacyPolicy;
