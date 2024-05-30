import UpdateItem from "./update";

export default function Page({ params }: { params: { item_id: string } }) {
  return (
    <>
      <UpdateItem id={params.item_id} />
    </>
  );
}
