type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {

  // ================= UI =================
  // Controlled input for search
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items..."
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}