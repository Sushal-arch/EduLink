import { useState } from "react";
import "./login.css";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { Button } from "@material-tailwind/react";
// import logo from "../../assets/logo-black.png";
import TeacherDrawer from "./Teacher";
function Login() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  document.title = "EduLink";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        // console.log(result);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-teal-300 via-indigo-400 to-purple-300 w-full">
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center flex-col"
          variants={itemVariants}
        >
          <div className="flex">
            <motion.img
              src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
              alt="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              className="object-contain mb-2"
              width={200}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 200 },
              }}
            />
            {/* <img src={logo} className="" width={380} /> */}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            className="flex flex-row gap-6"
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <Button
              onClick={handleSubmit}
              className="btn-login bg-black hover:bg-green-400 capitalize"
              size="lg"
            >
              STUDENT LOGIN
            </Button>
            <Button
              onClick={openDrawer}
              className="btn-login bg-black hover:bg-green-400 capitalize"
              size="lg"
            >
              TEACHER LOGIN/REGISTRATION
            </Button>
          </motion.div>
          <p className="text-xl m-2 font-medium">
            Students can directly login without registration.
          </p>
        </motion.div>
      </motion.div>

      {drawerOpen && <TeacherDrawer open={drawerOpen} onClose={closeDrawer} />}
    </div>
  );
}

export default Login;
