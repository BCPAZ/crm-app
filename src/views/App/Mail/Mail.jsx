import mailLinks from "@/utils/mailLinks";
import { FaPen } from "react-icons/fa";
const Mail = () => {
  return (
    <section className="py-10">
      <div className="siteContainer">
        <h1 className="font-bold text-2xl">Mail All (23)</h1>
        <div className="w-full bg-[#F4F6F8] rounded-lg h-full p-2 mt-10">
          <div className="flex flex-col p-3 w-[18%]">
            <button className="text-md bg-black p-3 rounded-lg text-white font-bold flex items-center justify-center gap-2">
              <FaPen size={22} />
              Compose
            </button>
            <div className="p-3 flex flex-col">
              {mailLinks.map((link, index) => (
                <button className="flex items-center w-full gap-4 p-2" key={index}>
                  <img src={link.icon} alt={link.label} />
                  <span className="text-lg text-gray-500 font-medium">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mail;
