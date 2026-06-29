import { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";


export default function Menu() {
    const [ingredients, setIngredients] = useState([
  {
    name: "",
    quantity: "",
    unit: "Kg",
  },
]);
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    dishName: "",
    category: "",
    price: "",
  });
  const addIngredient = () => {
  setIngredients([
    ...ingredients,
    {
      name: "",
      quantity: "",
      unit: "Kg",
    },
  ]);
};
const handleIngredientChange = (index, e) => {
  const values = [...ingredients];
  values[index][e.target.name] = e.target.value;
  setIngredients(values);
};

  const fetchMenus = async () => {
    const res = await fetch("http://localhost:5000/api/menu");
    const data = await res.json();
    setMenus(data);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addMenu = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/menu", {
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
    name: "",
    quantity: "",
    unit: "Kg",
  },
]);
      fetchMenus();
    }
  };

  const deleteMenu = async (id) => {
    const confirmDelete = window.confirm("Delete this menu?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/menu/${id}`, {
      method: "DELETE",
    });

    fetchMenus();
  };

  const filteredMenu = menus.filter((item) =>
    item.dishName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-cyan-200">

      <h1 className="text-3xl font-bold mb-6">
        Menu Management
      </h1>

      {/* Add Menu */}

      <form
        onSubmit={addMenu}
        className="bg-amber-200 rounded-xl shadow p-6 mb-8"
      >

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="text"
            name="dishName"
            placeholder="Dish Name"
            value={form.dishName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
          <div className="md:col-span-3 mt-5">

  <h2 className="text-xl font-bold mb-4">
    Ingredients
  </h2>

  {ingredients.map((ingredient, index) => (

    <div
      key={index}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
    >

      <input
        type="text"
        name="name"
        placeholder="Ingredient Name"
        value={ingredient.name}
        onChange={(e) => handleIngredientChange(index, e)}
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={ingredient.quantity}
        onChange={(e) => handleIngredientChange(index, e)}
        className="border rounded-lg p-3"
      />

      <select
        name="unit"
        value={ingredient.unit}
        onChange={(e) => handleIngredientChange(index, e)}
        className="border rounded-lg p-3"
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
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
  >
    + Add Ingredient
  </button>

</div>

        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-5 hover:bg-blue-700"
        >
          Add Menu
        </button>

      </form>

      {/* Search */}

      <div className="flex items-center gap-3 mb-6">

        <Search />

        <input
          type="text"
          placeholder="Search Dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-80"
        />

      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>

              <th className="p-4">Dish</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredMenu.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4">{item.dishName}</td>

                <td>{item.category}</td>

                <td>₹ {item.price}</td>

                <td>

                  <button
                    onClick={() => deleteMenu(item._id)}
                    className="text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
  
}