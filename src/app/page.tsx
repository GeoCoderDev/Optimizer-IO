import ClientComponent from "@/components/ClientComponent";
import ProviderStore from "@/store/Provider";

export default function Home() {
  return (
    <main>
      <ProviderStore>
        <ClientComponent />
      </ProviderStore>
    </main>
  );
}
