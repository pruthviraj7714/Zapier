export default function ({
  params,
}: {
  params: {
    zapId: string;
  };
}) {
  return (
    <div className="min-h-screen flex justify-center items-center text-5xl">
      {JSON.stringify(params.zapId)}
    </div>
  );
}
