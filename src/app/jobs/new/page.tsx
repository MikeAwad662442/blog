import { Metadata } from "next";
import NewJobForm from "./NewJobForm";
// Metadata always include in server side page we con`t use in client side page 🚀
export const metadata: Metadata = {
  title: "Post New Job",
};
const page = () => {
  return <NewJobForm />;
};

export default page;
