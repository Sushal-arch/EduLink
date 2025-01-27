import WidgetContent from "./WidgetContent.jsx";
import Notification from "./Notifications.jsx";
import "../../styles/Widget.css";
import { IoHeart } from "react-icons/io5";
import notification from "../../assets/bell3d.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
import Notes from "./Notes.jsx";

function Widget() {
  const user = useSelector(selectUser);
  return (
    <div className="w-[330px]">
      {(user?.type === "teacher" || user?.role === "Admin") && (
        <div className="widget mb-8 w-full max-h-[400px] overflow-y-auto">
          <div className="widget__header">
            <h5 className="flex flex-row items-center gap-1 font-medium">
              <span className="text-lg">Notifications</span>
              <img src={notification} width={20} />
            </h5>
          </div>
          <div className="widget__contents">
            <Notification />
          </div>
        </div>
      )}

      <div className="widget w-full mt-8">
        <div className="widget__header">
          <h5 className="flex flex-row items-center gap-1">
            Notes and Old Questions
          </h5>
        </div>
        <div className="widget__contents">
          <Notes />
        </div>
      </div>
  
      <div className="widget w-full mt-4">
        <div className="widget__header">
          <h5 className="flex flex-row items-center gap-1">
            Developed by:
          </h5>
        </div>
        <div className="widget__contents">
          <WidgetContent />
        </div>
      </div>
    </div>
  );
}

export default Widget;
