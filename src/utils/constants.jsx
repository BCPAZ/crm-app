import cost from "@/assets/icons/Nav/cost.svg";
import docs from "@/assets/icons/Nav/docs.svg";
import fieldManagement from "@/assets/icons/Nav/field-management.svg";
import insights from "@/assets/icons/Nav/insights.svg";
import mail from "@/assets/icons/Nav/mail.svg";
import projects from "@/assets/icons/Nav/projects.svg";
import security from "@/assets/icons/Nav/security.svg";
import work from "@/assets/icons/Nav/work.svg";
import workflow from "@/assets/icons/Nav/workflow.svg";

export const navigationLinks = [
  {
    title: "Sənədlər",
    icon: docs,
    elements: [
      {
        path: "/document-register",
        label: "Sənəd qeydiyyatı",
      },
      {
        path: "/upload-new-document",
        label: "Yeni sənəd yükləmək",
      },
    ],
  },
  {
    title: "İş axını",
    icon: workflow,
    elements: [
      {
        path: "/workflows",
        label: "İş axını",
      },
      {
        path: "/internal-workflows",
        label: "Daxili iş axını",
      },
      {
        path: "/templates",
        label: "Şablonlar",
      },
      {
        path: "/internal-templates",
        label: "Daxili Şablonlar",
      },
      {
        label: "Şablon yarat (Xarici)",
        path: "/create-template",
      },
      {
        label: "Şablon yarat (Daxili)",
        path: "/create-internal-template",
      },
    ],
  },
  {
    title: "Sahə idarəsi",
    icon: fieldManagement,
    elements: [
      {
        path: "/issues",
        label: "Problemlər",
      },
      {
        path: "/reports",
        label: "Hesabat",
      },
    ],
  },
  {
    title: "E-poçt",
    icon: mail,
    path: "/mail",
  },
  {
    title: "Təhlükəsizlik",
    icon: security,
    elements: [
      {
        path: "/users",
        label: "İstifadəçilər",
      },
      {
        path: "/roles",
        label: "Rollar",
      },
      {
        path: "/job-title",
        label: "Vəzifə",
      },
    ],
  },
  {
    path: "/cost",
    title: "Xərclər",
    icon: cost,
  },
  {
    title: "Statistika",
    icon: insights,
    path: "/insights",
  },
  {
    title: "Tapşırıqlar",
    icon: work,
    path: "/works",
  },
  {
    title: "Layihələr",
    icon: projects,
    elements: [
      {
        path: "/projects",
        label: "Bütün layihələr",
      },
      {
        path: "create-project",
        label: "Yeni Layihə",
      },
    ],
  },
];

export const BASE_URL = "https://azincrm.az";
