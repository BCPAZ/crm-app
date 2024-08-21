import docs from "@/assets/icons/Nav/docs.svg";
import projects from "@/assets/icons/Nav/projects.svg";
import mail from "@/assets/icons/Nav/mail.svg";
import workflow from "@/assets/icons/Nav/workflow.svg";
import fieldManagement from "@/assets/icons/Nav/field-management.svg";
import security from "@/assets/icons/Nav/security.svg";
import cost from "@/assets/icons/Nav/cost.svg";
import insights from "@/assets/icons/Nav/insights.svg";

import { FaPen, FaEye, } from "react-icons/fa";
import { GiCloudDownload } from "react-icons/gi";
import { BsFillPrinterFill } from "react-icons/bs";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { IoShareSocialSharp } from "react-icons/io5";
export const navigationLinks = [
  {
    title : 'Projects',
    icon : projects,
    path : '/projects',
    elements : [
      {
        path : 'create-project',
        label : 'New Project',
      },
    ]
  },
  {
    title : 'Documents',
    icon : docs,
    elements : [
      {
        path : '/document-register',
        label : 'Document Register'
      },
      // {
      //   path : '/drawings',
      //   label : 'Drawings'
      // },
      // {
      //   path : '/temporary-files',
      //   label : 'Temporary Files'
      // },
      {
        path : '/upload-new-document',
        label : 'Upload New Document'
      },
    ]
  },
  {
    title : 'Mail',
    icon : mail,
    path : '/mail',
    // elements : [
    //   {
    //     label : 'All'
    //   },
    //   {
    //     label : 'Inbox'
    //   },
    //   {
    //     label : 'Sent'
    //   },
    //   {
    //     label : 'Drafts'
    //   }
    // ]
  },
  {
    title : 'Workflow',
    icon : workflow,
    elements : [
      {
        path : 'workflow/workflows',
        label : 'Workflows'
      },
      {
        path : 'workflow/templates',
        label : 'Templates'
      },
      {
        label : 'New Template',
        path : 'workflow/create-template'
      }
    ]
  },
  {
    title : 'Field management',
    icon : fieldManagement,
    elements : [
      {
        path : '/issues',
        label : 'Issues'
      },
      {
        path : '/reports',
        label : 'Daily Reports'
      },
    ]
  },
  {
    title : 'Security',
    icon : security,
    elements : [
      {
        path : '/users',
        label : 'Users'
      },
      {
        path : '/roles',
        label : 'Roles',
      },
      {
        path : '/job-title',
        label : 'Job Title',
      }
    ]
  },
  {
    path : '/cost',
    title : 'Cost',
    icon : cost,
  },
  {
    title : 'Insights',
    icon : insights,
    path : '/insights'
  }
]


export const invoiceIcons = [
  {
    label : 'Write',
    icon : <FaPen />
  },
  {
    label : 'Watch',
    icon : <FaEye />
  },
  {
    label : 'Download',
    icon : <GiCloudDownload />
  },
  {
    label : 'Print',
    icon : <BsFillPrinterFill />
  },
  {
    label : 'Send',
    icon : <HiMiniPaperAirplane />
  },
  {
    label : 'Share',
    icon : <IoShareSocialSharp />
  }
]


export const BASE_URL = 'http://94.20.88.106';