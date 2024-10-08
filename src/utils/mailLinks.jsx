import mail from "@/assets/icons/Mail/mail.svg";
import inbox from "@/assets/icons/Mail/inbox.svg";
import send from "@/assets/icons/Mail/send.svg";
import trash from "@/assets/icons/Mail/trash.svg";
import important from "@/assets/icons/Mail/important.svg";
import star from "@/assets/icons/Mail/star.svg";

const mailLinks = [
  {
    label: 'Hamısı',
    icon: mail,
    type: 'ALL'
  },
  {
    label: 'Gələnlər',
    icon: inbox,
    type: 'INBOX'
  },
  {
    label: 'Göndərilən',
    icon: send,
    type: 'SENT'
  },
  {
    label: 'Zibillər',
    icon: trash,
    type: 'TRASH'
  },
  {
    label: 'Vaciblər',
    icon: important,
    type: 'IMPORTANT'
  },
  {
    label: 'Ulduzlananlar',
    icon: star,
    type: 'STARRED'
  },
];

export default mailLinks;
