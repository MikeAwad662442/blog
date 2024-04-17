"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();
  //
  return <LoadingButton {...props} type="submit" loading={pending} />;
  // return (
  //   <Button {...props} type="submit" disabled={props.disabled || pending}>
  //     <span className="flex items-center justify-center gap-1">
  //       {pending && <Loader2 size={16} className="animate-spin" />}
  //       {props.children}
  //     </span>
  //   </Button>
  // );
};

export default FormSubmitButton;
