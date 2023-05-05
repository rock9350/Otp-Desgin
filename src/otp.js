import { useRef, useState } from "react";
import "./otp.css";

const Otp = () => {
  const [EnterOtp, setEnterOtp] = useState(true);
  const refs = useRef([]);

  let otp = ["", "", "", "", "", ""];

  const [OTP, setOTP] = useState(otp);

  const Verification = () => {
    setEnterOtp(false);
  };

  const CheckOTP = (event, index) => {
    console.log(event.target.id);
    let OTPs = [...OTP];
    let value = event.target.value.replace(/[^0-9]/g, "");
    OTPs[event.target.id] = value;
    setOTP((pre) => (pre = [...OTPs]));

    if (value && index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    } else if (!value && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const VerifyOTP = () => {
    setEnterOtp(true);
    setOTP(otp);
  };

  const PasteOTP = (e) => {
    const paste = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOTP = [...otp];

    for (let i = 0; i < paste.length; i++) {
      newOTP[i] = paste[i];
    }
    console.log(OTP);
    setOTP((pre) => (pre = [...newOTP]));
    console.log(OTP);
  };

  return (
    <>
      {EnterOtp ? (
        <button className="button-28" style={{width:"15%"}} onClick={Verification}>
          {" "}
          Phone Verification
        </button>
      ) : (
        <div id="otpBOX">
            <div >
          {OTP.map((item, index) => {
            return (
              
                <input
                  key={index}
                  value={item}
                  className="OTPinput"
                  maxLength="1"
                  onPaste={PasteOTP}
                  onKeyDown={(e) => {
                    const input = e.target;
                    if (e.key === "Backspace" && !input.value && index > 0) {
                      refs.current[index - 1].focus();
                    } else if (e.key === "ArrowLeft" && index > 0) {
                      refs.current[index - 1].focus();
                    } else if (
                      e.key === "ArrowRight" &&
                      index < refs.current.length - 1
                    ) {
                      refs.current[index + 1].focus();
                    }
                  }}
                  onChange={(event) => CheckOTP(event, index)}
                  id={index}
                  ref={(ref) => (refs.current[index] = ref)}
                />
            
            );
          })}
            </div>
          <button className="button-28" onClick={VerifyOTP}>
            Verify
          </button>
        </div>
      )}
    </>
  );
};

export default Otp;
