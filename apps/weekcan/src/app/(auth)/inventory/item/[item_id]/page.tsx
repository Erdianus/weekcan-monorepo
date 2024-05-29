import SingleItem from "./single";

export default function Page({ params }: { params: { item_id: string } }) {
  return (
    <>
      <SingleItem id={params.item_id} />
    </>
  );
}
