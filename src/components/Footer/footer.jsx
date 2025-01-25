// import Logo from "../../assets/logo-white.png";
// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <div className="w-full text-white text-center bg-[#2c2c2c] max-h-[100px]">
//       <div className="flex flex-row justify-center items-center -mb-6">
//         <p>&copy; {currentYear} EduLink™</p>
//         <img src={Logo} />
//         All Rights Reserved.
//       </div>
//       <span className="text-lg">Ask, Learn, Grow.</span>
//     </div>
//   );
// };

// export default Footer;

import Logo from "../../assets/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-[#2c2c2c] text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="EduLink Logo" className="w-[8rem] h-auto mr-4" />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-300">&copy; {currentYear} EduLink™</p>
          <p className="text-sm text-gray-300">All Rights Reserved.</p>
        </div>

        <div className="text-right">
          <span className="text-lg font-semibold italic text-[#94C4FC]">
            Ask, Learn, Grow.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
