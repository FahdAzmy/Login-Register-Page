import Form from "../components/Forms/Form";

export default function CreateUser() {
  return (
    <div className="fatehr">
      <Form button="Create" endpoint="user/create" navigate="dashboard/users" />
    </div>
  );
}
