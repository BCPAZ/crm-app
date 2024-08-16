import { Routes,Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/views/Auth/Login";
import ResetPassword from "@/views/Auth/ResetPassword";
import ForgotPassword from "@/views/Auth/ForgotPassword";
import Projects from "@/views/App/Projects";
import TaskManagement from "@/views/App/TaskManagement";
import Dashboard from "@/views/App/Dashboard";
import Profile from "@/views/App/Profile";
import DocumentLayout from "@/layouts/PageLayouts/DocumentLayouts";
import UploadNewDocument from "@/views/App/Documents/UploadNewDocument";
import DocumentRegister from "@/views/App/Documents/DocumentRegister";
import WorkflowLayout from "@/layouts/PageLayouts/WorkflowLayout";
import Workflows from "@/views/App/Workflow/Workflows";
import Templates from "@/views/App/Workflow/Templates";
import CreateTemplate from "@/views/App/Workflow/CreateTemplate";
import FieldManagementLayout from "@/layouts/PageLayouts/FieldManagementLayout";
import Insights from "@/views/App/Insights";
import Cost from "@/views/App/Cost";
import InvoiceDetail from "@/views/App/InvoiceDetail";
import CreateNewInvoice from "@/views/App/CreateNewInvoice";
import Mail from "@/views/App/Mail/Mail";
import MailDetail from "@/views/App/Mail/MailDetail";
import MailLayout from "@/layouts/PageLayouts/MailLayout";
import Issues from "@/views/App/FieldManagement/Issues";
import Reports from "@/views/App/FieldManagement/Reports";
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<TaskManagement />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/cost" element={<Cost />} />
        <Route path="/cost/:id" element={<InvoiceDetail />} />
        <Route path="/mail/*" element={<MailLayout />}>
          <Route index={true} element={<Mail />} />
          <Route path=":id" element={<MailDetail />} />
        </Route>
        <Route path="/cost/create-new-invoice" element={<CreateNewInvoice />} />
        <Route path="/documents/*" element={<DocumentLayout />}>
          <Route path="document-register" element={<DocumentRegister />} />
          <Route path="upload-new-document" element={<UploadNewDocument />} />
        </Route>
        <Route path="/workflow/*" element={<WorkflowLayout />}>
          <Route path="workflows" element={<Workflows />} />
          <Route path="templates" element={<Templates />} />
          <Route path="create-template" element={<CreateTemplate />} />
        </Route>
        <Route element={<FieldManagementLayout />}>
          <Route path="issues" element={<Issues />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default AppRouter