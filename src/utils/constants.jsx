import docs from "@/assets/icons/Nav/docs.svg";
import projects from "@/assets/icons/Nav/projects.svg";
import mail from "@/assets/icons/Nav/mail.svg";
import workflow from "@/assets/icons/Nav/workflow.svg";
import fieldManagement from "@/assets/icons/Nav/field-management.svg";
import security from "@/assets/icons/Nav/security.svg";
import cost from "@/assets/icons/Nav/cost.svg";
import insights from "@/assets/icons/Nav/insights.svg";
export const navigationLinks = [
  {
    title : 'Projects',
    icon : projects,
    elements : [
      'AZINTEST',
      'New Project',
      'Users'
    ]
  },
  {
    title : 'Documents',
    icon : docs,
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
    icon : mail,
    elements : [
      {
        path : 'all',
        label : 'All'
      },
      {
        path : 'inbox',
        label : 'Inbox'
      },
      {
        path : 'sent',
        label : 'Sent'
      },
      {
        path : 'drafts',
        label : 'Drafts'
      }
    ]
  },
  {
    title : 'Workflow',
    icon : workflow,
    elements : [
      {
        path : 'workflows',
        label : 'Workflows'
      },
      {
        path : 'templates',
        label : 'Templated'
      },
      {
        label : 'New Template'
      }
    ]
  },
  {
    title : 'Field management',
    icon : fieldManagement,
    elements : [
      {
        path : 'issues',
        label : 'Issues'
      },
      {
        path : 'inspections',
        label : 'Inspections'
      },
      {
        path : 'punchlists',
        label : 'Punchlists'
      },
      {
        path : 'daily-reports',
        label : 'Daily Reports'
      },
      {
        path : 'project-settings',
        label : 'Projects Settings'
      }
    ]
  },
  {
    title : 'Security',
    icon : security,
  },
  {
    title : 'Cost',
    icon : cost,
  },
  {
    title : 'Insights',
    icon : insights,
  }
]