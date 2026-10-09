import React from "react";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT SIDE */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-300 mb-8 text-sm">
                Ready to start your renewable energy project? Our expert team is here 
                to help you navigate every step of the process.
              </p>

              <motion.div variants={stagger} initial="hidden" whileInView="show">

                {/* Registered Address */}
                <motion.div variants={fadeUp} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Registered Address</h3>
                    <p className="text-gray-400 font-semibold text-sm">
                      69/6A, Kirti Nagar,<br />
                      New Delhi - 110015
                    </p>
                  </div>
                </motion.div>

                {/* Branch 1 Delhi */}
                <motion.div variants={fadeUp} className="flex items-start space-x-4 mt-6">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Corporate Address - Branch 1 (Delhi)</h3>
                    <p className="text-gray-400 font-semibold text-sm">
                      429, 4th Floor, Ansal Chamber 2,<br />
                      Metro Station - Gate No. 3,<br />
                      Bikaji Cama Place, New Delhi - 110066
                    </p>
                  </div>
                </motion.div>

                {/* Branch 2 */}
                <motion.div variants={fadeUp} className="flex items-start space-x-4 mt-6">
                  <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Branch 2 Address (Lucknow)</h3>
                    <p className="text-gray-400 font-semibold text-sm">
                      H.No. 64, Seema City,<br />
                      Bijnor road, Lucknow - 226025
                    </p>
                  </div>
                </motion.div>

                {/* Branch 3 */}
                <motion.div variants={fadeUp} className="flex items-start space-x-4 mt-6">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Branch 3 Address (Surat)</h3>
                    <p className="text-gray-400 font-semibold text-sm">
                      519, Luxuria Business Hub,<br />
                      Near VR Mall, Vesu,<br />
                      Surat - 395007
                    </p>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="bg-gray-800 rounded-lg p-10">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">

                  {/* Phone */}
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    href="tel:+918527626868"
                    className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Phone className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-gray-400 font-semibold text-base">+91-8527626868</p>
                      <p className="text-gray-400 font-semibold text-base">+91-9319719115</p>
                      <p className="text-gray-400 font-semibold text-base">+91-8287933634</p>
                    </div>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    href="mailto:info@kecbiofuel.com"
                    className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Mail className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-gray-400 font-semibold text-base">info@kecbiofuel.com</p>
                      <p className="text-gray-400 font-semibold text-base">info@kisanexpereince.com</p>
                      <p className="text-gray-400 font-semibold text-base">Franchise@kisanexperience.com</p>
                    </div>
                  </motion.a>
                </div>

                {/* WhatsApp */}
                <motion.div whileHover={{ scale: 1.03 }} className="mt-8">
                  <a
                    href="https://wa.me/918287933634?text=Hello%20KEC%20Team,%20I%20would%20like%20to%20schedule%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
                  >
                    Schedule Consultation
                  </a>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
