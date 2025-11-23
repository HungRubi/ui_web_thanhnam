import Header from "../../components/Header"
import Footer from "@/app/components/Footer"
const Page = () => {
    return (
        <>
            <Header/>
            <div className="w-full mb-10">
                <div className="container px-3 mx-auto">
                    <h1 className="text-[40px] text-gray-700 mt-10 text-center">
                        Privacy Policy
                    </h1>
                    <div className="fix-responsive text-gray-700 leading-8">
                        <p>&nbsp;</p>
                        <h3 className="text-3xl "><strong>Privacy policy</strong></h3>
                        <p className="mt-2">
                            <strong>Statement Information User</strong>
                        </p>
                        <p>
                            While using our Service, we may ask you to provide us with acertain personally identifiable 
                            information that can be used to contact or identify you. Web servers (the computers that &quot;serve up&quot; Web pages) 
                            automatically identify your computer by its IP address; when you request a page from zibjr.com, our servers log your 
                            IP&nbsp;address.We&nbsp;collect this information for the purpose of providing the Service and Web traffic analysis and trend.
                        </p>
                        <p className="mt-2">
                            <strong>Log Files</strong>
                        </p>
                        <p>
                            We may also collect information that your browser sends whenever you visit our Service. This information includes IP 
                            addresses, browser type, the time and date of your visit, the time spent on those pages and other statistics.
                        </p>
                        <p className="mt-2">
                            <strong>Cookies</strong>
                        </p>
                        <p>
                            Like many online services, we use cookies to collect information. Cookies are sent to your browser from a web site and
                            transferred to your device. We use cookies to collect information in order to improve our services for you. 
                            If you do not accept cookies, you may not be able to use some features of our Service and we recommend that 
                            you leave them turned on.
                        </p>
                        <p className="mt-2">
                            <strong>Links To Other Sites</strong>
                        </p>
                        <p>
                            We offer some of our Service in connection with other third parties, We process your information in accordance 
                            with this Privacy Policy, however, such third parties may have different privacy practices. Therefore, we encourage 
                            you to read their privacy policies prior to disclosing any Personal Information.
                        </p>
                        <p className="mt-2">
                            <strong>Third Party Company Service Provider</strong>
                        </p>
                        <p>
                            We may receive Personal and about you from companies that provide our Service by way of a co-branded or 
                            private-labeled website, companies that offer their products and/or services through our Service, and/or 
                            companies that otherwise collect such information. These third parties have access to your Personal 
                            Information only to perform specific tasks on our behalf and are obligated not to disclose or use your 
                            information for any other purpose.
                        </p>
                        <p className="mt-2">
                            <strong>Affiliates</strong>
                        </p>
                        <p>
                            We may share some or all your Personal Data with our parent company, subsidiaries, joint ventures, or other 
                            companies under a common control (&quot;Affiliates&quot;), in which case we will require our Affiliates to 
                            honor this Privacy Statement.
                        </p>
                        <p className="mt-2">
                            <strong>Individuals under 13</strong>
                        </p>
                        <p>
                            No information should be submitted on&nbsp;zibjr.com&nbsp;by users under the age of 13 years without consent 
                            of their parent or guardian.&nbsp;zibjr.com does not provide any personally-identifying information for users 
                            under the age of 13, regardless of its source, to any third party for any purpose whatsoever unless disclosed 
                            during collection. We encourage parents and legal guardians to monitor their children&quot;s Internet usage and 
                            to help enforce our Privacy Policy by instructing their children never to provide Personal Information to us 
                            without their parent&quot;s or legal guardian&quot;s permission.
                        </p>
                        <p className="mt-2">
                            <strong>International Transfer</strong>
                        </p>
                        <p>
                            Your information, including Personal Information, may be transferred to — and maintained on — computers located 
                            outside of your state, province, country or other governmental jurisdiction where the data protection laws may 
                            differ than those from your jurisdiction.
                        </p>
                        <p>
                            If you are located outside United States and choose to provide information to us, please note that we transfer the 
                            information, including Personal Information, to United States and process it there.
                        </p>
                        <p>
                            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to 
                            that transfer.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Page