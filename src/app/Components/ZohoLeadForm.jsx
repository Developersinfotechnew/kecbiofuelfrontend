import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/*
  DESIGN TOKENS
  Color   — pine #0b1710 (bg), moss #16261c (card), wheat #d4a373 (accent/signature),
            sage #8ba38f (muted text), ivory #f3f1ea (headline text)
  Type    — display: serif (font-serif, tight tracking) for headline;
            body: sans for everything else
  Layout  — split screen: image left (full bleed, gradient + rotated label strip),
            form right (glass card, hairline wheat top border)
  Signature — vertical rotated "seed packet" label running down the image edge,
              echoes agri/biofuel branding without literal leaf icons
*/

const FORM_HTML = `
<div id='crmWebToEntityForm' class='zcwf_lblLeft crmWebToEntityForm'>
  <form id='webform867962000000417175' action='https://crm.zoho.in/crm/WebToLeadForm' name='WebToLeads867962000000417175' method='POST' onSubmit="javascript:document.charset='UTF-8'; return checkMandatory867962000000417175()" accept-charset='UTF-8'>
    <input type='text' style='display:none;' name='xnQsjsdp' value='faf50ce3521daeb9d5bf865f590dc262ad42c547a1c5a005888afad0ea92e865'/>
    <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
    <input type='text' style='display:none;' name='xmIwtLD' value='16da3bbb6230dce30d58c80719ea055f2f92b09f68bb6139e36df7a27145647deebaa6895340aba774dea643fd669142'/>
    <input type='text' style='display:none;' name='actionType' value='TGVhZHM='/>
    <input type='text' style='display:none;' name='returnURL' value='null'/>

    <div class='zcwf_two_col'>
      <div class='zcwf_row zcwf_half'>
        <div class='zcwf_col_lab'><label for='Last_Name'>Name <span class='req'>*</span></label></div>
        <div class='zcwf_col_fld'>
          <input type='text' id='Last_Name' aria-required='true' aria-label='Last Name' name='Last Name' maxlength='80'/>
        </div>
      </div>
      <div class='zcwf_row zcwf_half'>
        <div class='zcwf_col_lab'><label for='Phone'>Phone Number <span class='req'>*</span></label></div>
        <div class='zcwf_col_fld'>
          <input type='text' id='Phone' aria-required='true' aria-label='Phone' name='Phone' maxlength='30'/>
        </div>
      </div>
    </div>

    <div class='zcwf_two_col'>
      <div class='zcwf_row zcwf_half'>
        <div class='zcwf_col_lab'><label for='City'>City</label></div>
        <div class='zcwf_col_fld'>
          <input type='text' id='City' aria-label='City' name='City' maxlength='100'/>
        </div>
      </div>
      <div class='zcwf_row zcwf_half'>
        <div class='zcwf_col_lab'><label for='State'>State</label></div>
        <div class='zcwf_col_fld'>
          <input type='text' id='State' aria-label='State' name='State' maxlength='100'/>
        </div>
      </div>
    </div>

    <div class='zcwf_two_col'>
      <div class='zcwf_row zcwf_half'>
        <div class='zcwf_col_lab'><label for='Email'>Email Address</label></div>
        <div class='zcwf_col_fld'>
          <input type='text' ftype='email' autocomplete='false' id='Email' aria-label='Email' name='Email' maxlength='100'/>
        </div>
      </div>
      <div class='zcwf_row zcwf_half'>
        <div class='zcwf_col_lab'><label for='LEADCF5'>Interested In</label></div>
        <div class='zcwf_col_fld'>
          <select class='zcwf_col_fld_slt' id='LEADCF5' onChange='addAriaSelected867962000000417175()' aria-label='LEADCF5' name='LEADCF5'>
            <option value='-None-'>-None-</option>
            <option value='Elite Franchise'>Elite Franchise</option>
            <option value='Master Franchise'>Master Franchise</option>
            <option value='Fertilizer Enquiry'>Fertilizer Enquiry</option>
            <option selected value='Plant Setup'>Plant Setup</option>
            <option value='EPC'>EPC</option>
            <option value='EPTP'>EPTP</option>
            <option value='PMC'>PMC</option>
            <option value='O&amp;M'>O&amp;M</option>
            <option value='Association'>Association</option>
            <option value='Become Distributor(Trader)'>Become Distributor(Trader)</option>
            <option value='Cluster Model'>Cluster Model</option>
            <option value='General Trading'>General Trading</option>
          </select>
        </div>
      </div>
    </div>

    <div class='zcwf_row'>
      <div class='zcwf_col_lab'><label for='LEADCF3'>Message</label></div>
      <div class='zcwf_col_fld'>
        <textarea id='LEADCF3' aria-label='LEADCF3' name='LEADCF3'></textarea>
      </div>
    </div>

    <input type='hidden' style='display:none;' name='aG9uZXlwb3Q' value=''/>

    <div class='zcwf_row' style='margin-top:6px;'>
      <div class='zcwf_col_fld'>
        <input type='submit' id='formsubmit' role='button' class='formsubmit zcwf_button' value='Send Enquiry' aria-label='Submit' title='Submit'/>
        <input type='reset' class='zcwf_button zcwf_reset' role='button' name='reset' value='Reset' aria-label='Reset' title='Reset'/>
      </div>
    </div>
  </form>
</div>
`;

const ZOHO_INLINE_JS = `
function addAriaSelected867962000000417175(){
  var optionElem = event.target;
  var previousSelectedOption = optionElem.querySelector('[aria-selected=true]');
  if (previousSelectedOption) { previousSelectedOption.removeAttribute('aria-selected'); }
  optionElem.querySelectorAll('option')[optionElem.selectedIndex].ariaSelected = 'true';
}
function validateEmail867962000000417175(){
  var form = document.forms['WebToLeads867962000000417175'];
  var emailFld = form.querySelectorAll('[ftype=email]');
  for (var i = 0; i < emailFld.length; i++){
    var emailVal = emailFld[i].value;
    if ((emailVal.replace(/^\\s+|\\s+$/g,'')).length != 0){
      var atpos = emailVal.indexOf('@');
      var dotpos = emailVal.lastIndexOf('.');
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length){
        alert('Please enter a valid email address.');
        emailFld[i].focus();
        return false;
      }
    }
  }
  return true;
}
function checkMandatory867962000000417175(){
  var mndFileds = ['Last Name', 'Phone'];
  var fldLangVal = ['Name', 'Phone Number'];
  for (var i = 0; i < mndFileds.length; i++){
    var fieldObj = document.forms['WebToLeads867962000000417175'][mndFileds[i]];
    if (fieldObj){
      if (((fieldObj.value).replace(/^\\s+|\\s+$/g,'')).length == 0){
        if (fieldObj.type == 'file'){
          alert('Please select a file to upload.');
          fieldObj.focus();
          return false;
        }
        alert(fldLangVal[i] + ' cannot be empty.');
        fieldObj.focus();
        return false;
      } else if (fieldObj.nodeName == 'SELECT'){
        if (fieldObj.options[fieldObj.selectedIndex].value == '-None-'){
          alert(fldLangVal[i] + ' cannot be none.');
          fieldObj.focus();
          return false;
        }
      } else if (fieldObj.type == 'checkbox'){
        if (fieldObj.checked == false){
          alert('Please accept ' + fldLangVal[i]);
          fieldObj.focus();
          return false;
        }
      }
    }
  }
  if (!validateEmail867962000000417175()) { return false; }
  var urlparams = new URLSearchParams(window.location.search);
  if (urlparams.has('service') && urlparams.get('service') === 'smarturl'){
    var webform = document.getElementById('webform867962000000417175');
    var smarturlfield = document.createElement('input');
    smarturlfield.setAttribute('type', 'hidden');
    smarturlfield.setAttribute('value', urlparams.get('service'));
    smarturlfield.setAttribute('name', 'service');
    webform.appendChild(smarturlfield);
  }
  document.querySelector('.crmWebToEntityForm .formsubmit').setAttribute('disabled', true);
  return true;
}
window.addAriaSelected867962000000417175 = addAriaSelected867962000000417175;
window.checkMandatory867962000000417175 = checkMandatory867962000000417175;
window.validateEmail867962000000417175 = validateEmail867962000000417175;
`;

// Replace with your own hosted photo (plant / field / franchise site).
const IMAGE_URL =
  "/images/contactzoholead.png";

const ContactSplit = () => {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.text = ZOHO_INLINE_JS;
    document.body.appendChild(inlineScript);

    const analyticsScript = document.createElement("script");
    analyticsScript.id = "wf_anal";
    analyticsScript.src =
      "https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=1b80443e99c9e5c0236be31a34a7b607a2f7ea709dba509b559cdba721dbf7b945c8322da1cc9e69ed23eded778fbe99gid907cd5f50546b1db4560fbc2832c49dc42fa4903541b0137f2f2c10187b6f061gidc3320cc193950b27bf2fcd395d779dd5d73ca1a62d42dc0d4f0eadd8a11a9ac8gid98670ed7ddb1de1b20f5950b763d3c69ed08d78aea501e652893435d46da86b7&tw=0751dcf7364f28626b35c5830d1abb85a55b1c482aded6c1fc901115b4b34251&version=v2";
    document.body.appendChild(analyticsScript);

    return () => {
      inlineScript.remove();
      analyticsScript.remove();
    };
  }, []);

  return (
    <section className="relative bg-[#fff] py-20 px-4">
      <style>{`
        #crmWebToEntityForm.zcwf_lblLeft { width: 100%; }
        #crmWebToEntityForm.zcwf_lblLeft * { box-sizing: border-box; }
        #crmWebToEntityForm .zcwf_row { margin: 0 0 20px 0; }
        #crmWebToEntityForm .zcwf_two_col { display: flex; gap: 16px; }
        #crmWebToEntityForm .zcwf_two_col .zcwf_half { flex: 1; margin: 0 0 20px 0; }
        #crmWebToEntityForm label {
          color: #3f4f42; font-size: 12px; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; display: block; margin-bottom: 7px;
        }
        #crmWebToEntityForm .req { color: #16a34a; }
        #crmWebToEntityForm input[type="text"],
        #crmWebToEntityForm textarea,
        #crmWebToEntityForm .zcwf_col_fld_slt {
          width: 100%;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(22,101,52,0.25);
          color: #1f2937;
          border-radius: 8px;
          padding: 11px 13px;
          font-size: 14px;
          transition: border-color .15s ease;
        }
        #crmWebToEntityForm input[type="text"]::placeholder,
        #crmWebToEntityForm textarea::placeholder { color: #7a8a7d; }
        #crmWebToEntityForm input[type="text"]:focus,
        #crmWebToEntityForm textarea:focus,
        #crmWebToEntityForm .zcwf_col_fld_slt:focus {
          outline: none;
          border-color: #16a34a;
        }
        #crmWebToEntityForm textarea { resize: vertical; min-height: 84px; }
        #crmWebToEntityForm .formsubmit.zcwf_button {
          background: linear-gradient(to right, #16a34a, #15803d);
          color: #ffffff !important;
          border: none;
          padding: 12px 26px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: .03em;
          text-transform: uppercase;
          cursor: pointer;
          margin-right: 12px;
          transition: opacity .15s ease;
        }
        #crmWebToEntityForm .formsubmit.zcwf_button:hover { opacity: .9; }
        #crmWebToEntityForm .zcwf_reset {
          background: transparent;
          border: 1px solid rgba(22,101,52,0.3);
          color: #3f4f42;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
        }
        @media (max-width: 640px) {
          #crmWebToEntityForm .zcwf_two_col { flex-direction: column; gap: 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

          {/* LEFT — image with seed-packet label strip */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[320px] md:min-h-[640px]"
          >
            <img
              src={IMAGE_URL}
              alt="KEC Biofuel plant and fields"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1710] via-[#0b1710]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1710]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[#d4a373] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Kisan Experience &middot; Biofuel
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#f3f1ea] leading-tight tracking-tight">
                Powering farms into
                <br /> energy plants.
              </h3>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-gradient-to-br from-green-50 via-green-100 to-green-400 p-8 md:p-12 border-t md:border-t-0 md:border-l border-green-600/20 relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-500 to-green-600" />

            <p className="text-green-700 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              Get In Touch
            </p>
            <h2 className="font-serif text-3xl text-gray-800 tracking-tight mb-2">
              Start your project
            </h2>
            <p className="text-gray-600 text-sm mb-8 font-semibold">
              Tell us what you're building — franchise, plant setup, EPC — and
              our team gets back within one business day.
            </p>

            <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSplit;