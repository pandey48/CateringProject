import { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";
import API_URL from "../config";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    dishName: "",
    category: "",
    price: "",
  });

  const [ingredients, setIngredients] = useState([
    {
      category: "",
      name: "",
      quantity: "",
      unit: "Kg",
    },
  ]);

  // Fetch Menu
  const fetchMenus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/menu`);
      const data = await res.json();
      setMenus(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Dish Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Ingredient Change
  const handleIngredientChange = (index, e) => {
    const values = [...ingredients];
    values[index][e.target.name] = e.target.value;
    setIngredients(values);
  };

  // Add Ingredient Row
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        category: "",
        name: "",
        quantity: "",
        unit: "Kg",
      },
    ]);
  };

  // Save Menu
  const addMenu = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        ingredients,
      }),
    });

    if (res.ok) {
      alert("Menu Added Successfully");

      setForm({
        dishName: "",
        category: "",
        price: "",
      });

      setIngredients([
        {
          category: "",
          name: "",
          quantity: "",
          unit: "Kg",
        },
      ]);

      fetchMenus();
    }
  };

  // Delete Menu
  const deleteMenu = async (id) => {
    if (!window.confirm("Delete this menu?")) return;

    await fetch(`${API_URL}/api/menu/${id}`, {
      method: "DELETE",
    });

    fetchMenus();
  };

  const filteredMenu = menus.filter((item) =>
    item.dishName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Menu Management</h1>
        <p className="mt-1 text-sm text-slate-500">Create, update, and manage your catering menu</p>
      </div>

      <form onSubmit={addMenu} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <input
            type="text"
            name="dishName"
            placeholder="Dish Name"
            value={form.dishName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Dish Category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
            required
          />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Ingredients</h2>

          {ingredients.map((ingredient, index) => (
            <div key={index} className="mb-4 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <select
                name="category"
                value={ingredient.category}
                onChange={(e) => handleIngredientChange(index, e)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="">Select Category</option>
                <option value="Vegetable">🥬 सब्जी</option>
                <option value="Grocery">🛒 किराना</option>
                <option value="Dairy">🥛 डेयरी</option>
                <option value="Spices">🌶️ मसाले</option>
                <option value="Dry Fruits">🥜 ड्राई फ्रूट</option>
                <option value="Other">📦 अन्य</option>
              </select>

              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />

              <select
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option>Kg</option>
                <option>Gram</option>
                <option>Liter</option>
                <option>Piece</option>
              </select>
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            + Add Ingredient
          </button>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Add Menu
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Menu List - Mobile Cards / Desktop Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 font-semibold">Dish</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMenu.map((item) => (
                <tr key={item._id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{item.dishName}</td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4 text-slate-600">₹ {item.price}</td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteMenu(item._id)}
                      className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      aria-label="Delete menu"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {filteredMenu.map((item) => (
            <div key={item._id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.dishName}</h3>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <span className="ml-2 font-bold text-slate-800 whitespace-nowrap">₹ {item.price}</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => deleteMenu(item._id)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  aria-label="Delete menu"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}