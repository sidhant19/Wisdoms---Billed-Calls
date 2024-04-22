import {auth, signOut} from "@/auth";

const SettingsPage = async () => {
    const session = await auth();
  return (
    <div>
      <h1>Settings</h1>
      <p>{JSON.stringify(session)}</p>
        <form action={
            async () => {
                "use server";
                await signOut();
            }
        }>
            <button type="submit">
                Logout
            </button>
        </form>
    </div>
  );
}

export default SettingsPage;