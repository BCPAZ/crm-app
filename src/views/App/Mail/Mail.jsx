import emailSelected from "@/assets/icons/Mail/email-selected.svg";
const Mail = () => {
  return (
    <section className="h-full flex items-center justify-center flex-col gap-2">
      <img src={emailSelected} alt="Email empty" />
      <h1 className="text-gray-400 text-lg font-semibold">Hər hansı bir mesaj yoxdur</h1>
      <p className="text-xs text-gray-400 font-base">Oxumaq üçün mesaj seçin</p>
    </section>
  );
};

export default Mail;
