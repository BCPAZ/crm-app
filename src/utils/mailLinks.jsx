import mail from "@/assets/icons/Mail/mail.svg";
import inbox from "@/assets/icons/Mail/inbox.svg";
import send from "@/assets/icons/Mail/send.svg";
import trash from "@/assets/icons/Mail/trash.svg";
import important from "@/assets/icons/Mail/important.svg";
import star from "@/assets/icons/Mail/star.svg";

const mailLinks = [
  {
    label: 'All',
    icon: mail,
    type: 'ALL'
  },
  {
    label: 'Inbox',
    icon: inbox,
    type: 'INBOX'
  },
  {
    label: 'Sent',
    icon: send,
    type: 'SENT'
  },
  {
    label: 'Trash',
    icon: trash,
    type: 'TRASH'
  },
  {
    label: 'Important',
    icon: important,
    type: 'IMPORTANT'
  },
  {
    label: 'Starred',
    icon: star,
    type: 'STARRED'
  },
];

export default mailLinks;
