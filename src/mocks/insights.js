const insightsData = {
  emails: [
    {
      id: 1,
      sender: "company1@example.com",
      receiver: "institution1@example.com",
      date: "2024-08-01",
      subject: "Project Update",
      type: "sent"
    },
    {
      id: 2,
      sender: "institution1@example.com",
      receiver: "company1@example.com",
      date: "2024-08-02",
      subject: "Re: Project Update",
      type: "received"
    },
    {
      id: 3,
      sender: "company2@example.com",
      receiver: "institution2@example.com",
      date: "2024-08-03",
      subject: "New Proposal",
      type: "sent"
    },
    {
      id: 4,
      sender: "institution2@example.com",
      receiver: "company2@example.com",
      date: "2024-08-04",
      subject: "Re: New Proposal",
      type: "received"
    }
  ],
  documents: [
    {
      id: 1,
      sender: "company1",
      receiver: "institution1",
      date: "2024-08-01",
      title: "Contract.pdf",
      type: "sent"
    },
    {
      id: 2,
      sender: "institution1",
      receiver: "company1",
      date: "2024-08-02",
      title: "Invoice.pdf",
      type: "received"
    },
    {
      id: 3,
      sender: "company2",
      receiver: "institution2",
      date: "2024-08-03",
      title: "Proposal.pdf",
      type: "sent"
    },
    {
      id: 4,
      sender: "institution2",
      receiver: "company2",
      date: "2024-08-04",
      title: "Feedback.pdf",
      type: "received"
    }
  ]
};

export default insightsData
