import Header from "./Header";
import Form from "./Forms/Form";

export default function SignUp() {
  return (
    <div>
      <Header />
      <Form button="Register" endpoint="register" navigate="" page="signup" />
    </div>
  );
}
