const mails = [
  {
    id: 1,
    type: "SEND",
    to: "connect2@flegri.az",
    cc: [
      "connect3@flegri.az"
    ],
    bcc: [
      "connect4@flegri.az"
    ],
    subject: "Salam",
    message: "salam ay qaqa netersen ?",
    attachments: [
      {
        name: "OpVXGq7o7CyD3wNaAWU7hUSBPFWFAJkDgF3Tofza.jpg",
        path: "http://localhost:8000/storage/mail_attachments/OpVXGq7o7CyD3wNaAWU7hUSBPFWFAJkDgF3Tofza.jpg"
      }
    ],
    is_starred: false,
    is_important: false,
    is_read: false,
    deleted_at: null,
    created_at: "2024-08-10T08:32:05.000000Z",
    updated_at: "2024-08-10T08:32:05.000000Z",
    opponent: {
      id: 2,
      name: "Anar BB",
      email: "connect2@flegri.az",
      avatar_url: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
    }
  }
];


export default mails;
