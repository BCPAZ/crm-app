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
    title : 'Sənədlər',
    icon : docs,
    elements : [
      {
        path : '/document-register',
        label : 'Sənəd qeydiyyatı'
      },
      {
        path : '/upload-new-document',
        label : 'Yeni sənəd yükləmək'
      },
    ]
  },
  {
    title : 'E-poçt',
    icon : mail,
    path : '/mail',
  },
  {
    title : 'İş axını',
    icon : workflow,
    elements : [
      {
        path : '/workflows',
        label : 'İş axını'
      },
      {
        path : '/templates',
        label : 'Şablonlar'
      },
      {
        label : 'Şablon yarat',
        path : '/create-template'
      }
    ]
  },
  {
    title : 'Sahə idarəsi',
    icon : fieldManagement,
    elements : [
      {
        path : '/issues',
        label : 'Problemlər'
      },
      {
        path : '/reports',
        label : 'Hesabat'
      },
    ]
  },
  {
    title : 'Təhlükəsizlik',
    icon : security,
    elements : [
      {
        path : '/users',
        label : 'İstifadəçilər'
      },
      {
        path : '/roles',
        label : 'Rollar',
      },
      {
        path : '/job-title',
        label : 'Vəzifə',
      }
    ]
  },
  {
    path : '/cost',
    title : 'Xərclər',
    icon : cost,
  },
  {
    title : 'Statistika',
    icon : insights,
    path : '/insights'
  },
  {
    title : 'Layihələr',
    icon : projects,
    elements : [
      {
        path : '/projects',
        label : 'Bütün layihələr'
      },
      {
        path : 'create-project',
        label : 'Yeni Layihə',
      },
    ]
  },
]



export const BASE_URL = 'http://94.20.88.106';