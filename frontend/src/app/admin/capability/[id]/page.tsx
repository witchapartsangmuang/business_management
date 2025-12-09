import CapabilityInformantionPage from "./Capability.client";
export const metadata = {
  title: "Admin | Capability",
  description: "adjust capability.",
};

interface Props {
    params: { id: string };
}
export default function Page({ params }: Props) {
    const { id } = params;
    return <CapabilityInformantionPage id={id} />
}