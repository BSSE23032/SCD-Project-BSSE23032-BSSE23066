import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const WHATSAPP_NUMBER = "+923496049566";
const SMS_NUMBER = "+923316864819";

const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Our Contact Us</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We always ready to help by providing the best services for you.
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              {/* CALL */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText">{WHATSAPP_NUMBER}</span>
                  </div>
                </div>

                <a href={`tel:${WHATSAPP_NUMBER}`} className="flexCenter button">
                  Call now
                </a>
              </div>

              {/* CHAT (WHATSAPP) */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Chat</span>
                    <span className="secondaryText">{WHATSAPP_NUMBER}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flexCenter button"
                >
                  Chat now
                </a>
              </div>
            </div>

            {/* second row */}
            <div className="flexStart row">
              {/* VIDEO CALL */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Video Call</span>
                    <span className="secondaryText">{WHATSAPP_NUMBER}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flexCenter button"
                >
                  Video Call now
                </a>
              </div>

              {/* MESSAGE (SMS) */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Message</span>
                    <span className="secondaryText">{SMS_NUMBER}</span>
                  </div>
                </div>

                <a href={`sms:${SMS_NUMBER}`} className="flexCenter button">
                  Message now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="contact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
