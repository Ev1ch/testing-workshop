import { useCallback } from "react";

import { SignInData } from "../../contracts";
import { useAuth } from "../../hooks";
import { Form } from "../../components/blocks";

export default function SignIn() {
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        console.error(11);
        await signIn(data);
      } catch (error) {
        console.error(error);
      }
    },
    [signIn]
  );

  return (
    <div>
      <section>
        <Form onSubmit={handleSubmit} />
      </section>
    </div>
  );
}
