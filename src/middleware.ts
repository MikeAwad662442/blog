// Note: this page helps clerk auth to know from wear it will be Begin to watch authorization root link

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/(dashboard)(.*)"],
};
