import docs from "@/assets/icons/Nav/docs.svg";
import projects from "@/assets/icons/Nav/projects.svg";
import mail from "@/assets/icons/Nav/mail.svg";

export const navigationLinks = [
  {
    title : 'Projects',
    img : projects,
    elements : [
      'AZINTEST',
      'New Project',
      'Users'
    ]
  },
  {
    title : 'Documents',
    img : docs,
    elements : [
      {
        path : 'document-register',
        label : 'Document Register'
      },
      {
        path : 'drawings',
        label : 'Drawings'
      },
      {
        path : 'temporary-files',
        label : 'Temporary Files'
      },
      {
        path : 'upload-new-document',
        label : 'Upload New Document'
      },
      {
        path : 'multiple-file-upload',
        label : 'Multiple File Upload'
      },
      {
        path : 'bulk-processing',
        label : 'Bulk Processing'
      }
    ]
  },
  {
    title : 'Mail',
    img : mail,
    elements : [
      {
        path : 'document-register',
        label : 'Document Register'
      },
      {
        path : 'drawings',
        label : 'Drawings'
      },
      {
        path : 'temporary-files',
        label : 'Temporary Files'
      },
      {
        path : 'upload-new-document',
        label : 'Upload New Document'
      },
      {
        path : 'multiple-file-upload',
        label : 'Multiple File Upload'
      },
      {
        path : 'bulk-processing',
        label : 'Bulk Processing'
      }
    ]
  }
]