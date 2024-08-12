import { useParams } from "react-router-dom";
import mails from "@/mocks/mails";

const MailDetail = () => {
  const { mailId } = useParams(); // URL'den mail ID'sini al
  const selectedMail = mails.find((mail) => mail.id === mailId); // Seçili maili bul

  if (!selectedMail) {
    return <p>No mail selected. Please select a mail to view details.</p>; // Hiçbir mail seçilmemişse mesaj göster
  }

  return (
    <div>
      <h2 className="text-xl font-bold">{selectedMail.opponent.name}</h2>
      <p>{selectedMail.message}</p>
    </div>
  );
};

export default MailDetail;