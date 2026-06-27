export default function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />

        <div>
          <p className="font-semibold">
            Admin
          </p>
        </div>
      </div>

    </div>
  );
}