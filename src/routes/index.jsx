import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "@/components/common/LoadingScreen";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import PrivateRoute from "@/components/App/PrivateRoute";
import { useCurrentAccountQuery } from "@/data/services/accountService";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const AppLayout = lazy(() => import("@/layouts/AppLayout"));
const Login = lazy(() => import("@/views/Auth/Login"));
const ResetPassword = lazy(() => import("@/views/Auth/ResetPassword"));
const ForgotPassword = lazy(() => import("@/views/Auth/ForgotPassword"));
const Projects = lazy(() => import("@/views/App/Projects"));
const TaskManagement = lazy(() => import("@/views/App/TaskManagement"));
const Dashboard = lazy(() => import("@/views/App/Dashboard"));
const Profile = lazy(() => import("@/views/App/Profile"));
const WorkflowDetail = lazy(() => import("@/views/App/Workflow/WorkflowDetail"));
const DocumentLayout = lazy(() =>
  import("@/layouts/PageLayouts/DocumentLayouts")
);
const UploadNewDocument = lazy(() =>
  import("@/views/App/Documents/UploadNewDocument")
);
const DocumentRegister = lazy(() =>
  import("@/views/App/Documents/DocumentRegister")
);
const WorkflowLayout = lazy(() =>
  import("@/layouts/PageLayouts/WorkflowLayout")
);
const Workflows = lazy(() => import("@/views/App/Workflow/Workflows"));
const Templates = lazy(() => import("@/views/App/Workflow/Templates"));
const CreateTemplate = lazy(() =>
  import("@/views/App/Workflow/CreateTemplate")
);
const FieldManagementLayout = lazy(() =>
  import("@/layouts/PageLayouts/FieldManagementLayout")
);
const Insights = lazy(() => import("@/views/App/Insights"));
const Cost = lazy(() => import("@/views/App/Cost"));
const InvoiceDetail = lazy(() => import("@/views/App/InvoiceDetail"));
const CreateNewInvoice = lazy(() => import("@/views/App/CreateNewInvoice"));
const Mail = lazy(() => import("@/views/App/Mail/Mail"));
const MailDetail = lazy(() => import("@/views/App/Mail/MailDetail"));
const MailLayout = lazy(() => import("@/layouts/PageLayouts/MailLayout"));
const Issues = lazy(() => import("@/views/App/FieldManagement/Issues"));
const Reports = lazy(() => import("@/views/App/FieldManagement/Reports"));
const IssueDetail = lazy(() =>
  import("@/views/App/FieldManagement/IssueDetail")
);
const SecurityLayout = lazy(() =>
  import("@/layouts/PageLayouts/SecurityLayout")
);
const Users = lazy(() => import("@/views/App/Security/Users"));
const Roles = lazy(() => import("@/views/App/Security/Roles"));
const JobTitle = lazy(() => import("@/views/App/Security/JobTitle"));
const CreateNewUser = lazy(() => import("@/views/App/Security/CreateNewUser"));
const CreateProject = lazy(() => import("@/views/App/CreateProject"));
const ChangePassword = lazy(() => import("@/views/App/ChangePassword"));

const AppRouter = () => {
  useCurrentAccountQuery();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
              <Route path="/projects" element={<Projects />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cost" element={<Cost />} />
              <Route path="/cost/:id" element={<InvoiceDetail />} />
              <Route path="/projects/:id" element={<TaskManagement />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route
                path="/cost/create-new-invoice"
                element={<CreateNewInvoice />}
              />
              <Route element={<DocumentLayout />}>
                <Route
                  path="/document-register"
                  element={<DocumentRegister />}
                />
                <Route
                  path="/upload-new-document"
                  element={<UploadNewDocument />}
                />
              </Route>
              <Route element={<WorkflowLayout />}>
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/create-template" element={<CreateTemplate />} />
                <Route path="/workflows/:id" element={<WorkflowDetail />} />
              </Route>
              <Route element={<FieldManagementLayout />}>
                <Route path="/issues" element={<Issues />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/issues/:id" element={<IssueDetail />} />
              </Route>
            </Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/insights" element={<Insights />} />

            <Route path="/mail/*" element={<MailLayout />}>
              <Route index={true} element={<Mail />} />
              <Route path=":id" element={<MailDetail />} />
            </Route>
            <Route element={<SecurityLayout />}>
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/job-title" element={<JobTitle />} />
              <Route path="/create-new-user" element={<CreateNewUser />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
