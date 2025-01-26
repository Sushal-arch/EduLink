import "../../styles/WidgetContent.css";
import fb from "../../assets/fb.gif";
import insta from "../../assets/insta.gif";
import linkedin from "../../assets/linkedin.gif";

function WidgetContent() {
  return (
    <div className="widget__contents">
      <div className="widget__content">
        <div className="ml-2 flex items-center justify-between w-full">
          <h5>Bibisha Baniya</h5>
          <div className="flex">
            {/* <a
              href="https://www.facebook.com/share/1BFa1X7Fop/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" width={40} />
            </a> */}
            {/* <a
              href="https://www.instagram.com/_bibisha_baniya_?igsh=N3FibnUyazRscXEx&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" width={40} />
            </a> */}
            <a
              href="https://www.linkedin.com/in/bibisha-baniya-198279216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" width={40} />
            </a>
          </div>
        </div>
      </div>
      <div className="widget__content">
        <div className="ml-2 flex items-center justify-between w-full">
          <h5>Akriti Adhikari</h5>
          <div className="flex">
            {/* <a
              href="https://www.facebook.com/aakritits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" width={40} />
            </a> */}
            {/* <a
              href="https://www.instagram.com/aakritits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" width={40} />
            </a> */}
            <a
              href="https://www.linkedin.com/in/aakritiadhikari"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" width={40} />
            </a>
          </div>
        </div>
      </div>
      <div className="widget__content">
        <div className="ml-2 flex items-center justify-between w-full">
          <h5>Sushal Pokharel</h5>
          <div className="flex">
            {/* <a
              href="https://www.facebook.com/profile.php?id=100011600835647"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" width={40} />
            </a> */}
            {/* <a
              href="https://www.instagram.com/the_deal_0000/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" width={40} />
            </a> */}
            <a
              href="https://www.linkedin.com/in/sushal-pokharel-74042220a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" width={40} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;
